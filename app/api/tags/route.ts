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
      location,
      serial,
      rating,
      notificationMethods,
      sendDate,
    } = body;

    const convertDate = parseISO(sendDate);
    const notificationDate = startOfDay(convertDate);

    const { address, technicianNotes } = customer;
    console.log("[TAG_POST]", body);
    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !address || !type || !location || !serial || !rating) {
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

    const tagId = uuidv4();
    const notificationId = uuidv4();
    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.tag.create({
      data: {
        tagId,
        technician: {
          connect: { id: technicianRecord.id },
        },
        customer: {
          create: {
            customerId: businessName,
            businessName: businessName,
            address,
            technicianNotes: technicianNotes,
            technician: {
              connect: { id: technicianRecord.id },
            },
          },
        },
        businessName,
        type,
        location,
        serial,
        rating,
        frontTagSrc,
        backTagSrc,
      },
    });

    await prismadb.notification.create({
      data: {
        id: notificationId,
        title: "Upcoming Tag Expiration for " + businessName,
        body: "Body",
        status: "Scheduled",
        method: notificationMethods,
        tag: {
          connect: { id: tag.id },
        },
        customer: {
          connect: { id: tag.customerId },
        },
        sendDate: notificationDate,
      },
    });

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
