import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const technician = await currentUser();
    const {
      // frontTagSrc,
      // backTagSrc,
      customer: businessName,
      address,
      type,
      location,
      serial,
      rating,
      notes,
      // expiration
    } = body;

    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !address || !type || !location || !serial || !rating) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    console.log("Technician ID:", technician.id); // Debugging log

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

    console.log("Technician Record: ", technicianRecord);

    // TODO: Check if customer already exists
    // Check if customer already exists
    let customerData = await prismadb.customer.findUnique({
      where: { customerId: businessName },
    });
    console.log("Customer Data:", customerData); // Debugging log

    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.tag.create({
      data: {
        technician: {
          connect: {
            id: technicianRecord.id,
          },
        },
        customer: customerData
          ? { connect: { id: customerData.id } }
          : {
              create: {
                customerId: businessName,
                businessName: businessName,
                address,
                technician: {
                  connect: { id: technicianRecord.id },
                },
              },
            },
        name: businessName,
        type,
        location,
        serial,
        rating,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[CUSTOMER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
