import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addDays, parseISO, startOfDay } from "date-fns";

import prismadb from "@/lib/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const technician = await currentUser();
    const {
      frontTagSrc,
      backTagSrc = null,
      businessName,
      customer,
      type,
      notificationMethods,
      tagExpiration, // current expiration date of the tag
    } = body;

    // Convert the tagExpiration string to a Date object and set it to the start of that day
    const convertDate = parseISO(tagExpiration);
    const expirationDate = startOfDay(convertDate);

    // Calculate the sendDate as 90 days before the tagExpiration
    let scheduledNotification = addDays(parseISO(tagExpiration), -90);
    // If today's todays date is within 90 days of the tagExpiration, schedule the notification for today
    if (scheduledNotification < new Date()) {
      scheduledNotification = new Date();
    }
    // and set it to the start of that day
    const sendDate = startOfDay(scheduledNotification);

    const methods =
      typeof notificationMethods === "string"
        ? [notificationMethods]
        : notificationMethods;

    const { address, technicianNotes } = customer;
    console.log("[TAG_POST]", body);
    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !address || !type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    let technicianRecord = await prismadb.technician.findUnique({
      where: { email: technician.emailAddresses[0].emailAddress },
    });

    // Optionally create a Technician record if it doesn't exist
    if (!technicianRecord) {
      technicianRecord = await prismadb.technician.create({
        data: {
          technicianId: technician.id,
          firstName: technician.firstName || "Account has no name",
          email: technician.emailAddresses[0].emailAddress,
        },
      });
    }

    // Try to find existing customer
    const existingCustomer = await prismadb.customer.findUnique({
      where: {
        customerId: businessName,
      },
    });

    // Get ID of existing customer if found
    let customerId;
    if (existingCustomer) {
      customerId = existingCustomer.customerId;
    } else {
      const newCustomer = await prismadb.customer.create({
        data: {
          customerId: businessName,
          businessName,
          address,
          technicianNotes,
          technician: {
            connect: { id: technicianRecord.id },
          },
        },
      });
      customerId = newCustomer.customerId;
    }

    const tagId = uuidv4();
    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.tag
      .create({
        data: {
          tagId,
          expirationDate,
          businessName,
          type,
          technician: {
            connect: { id: technicianRecord.id },
          },
          customer: {
            connect: {
              customerId: customerId,
            },
          },
          notification: {
            create: {
              customerId: businessName,
              title: "Upcoming Tag Expiration for " + businessName,
              body: "Body",
              status: "Scheduled",
              method: notificationMethods,
              sendDate: sendDate,
            },
          },
          frontTagSrc,
          backTagSrc,
        },
      })
      .catch((error) => {
        console.error("[TAG_POST]", error);
        if (error.code === "P2002") {
          return NextResponse.json({
            status: 400,
            error: "Tag already exists",
          });
        }
      });

    console.log(tag);
    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_POST]", error);
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.error("Unique constraint violation:", error.meta?.target);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
