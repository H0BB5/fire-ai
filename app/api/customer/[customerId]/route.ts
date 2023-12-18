import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  console.log("customer PATCH", params);
  try {
    const body = await req.json();
    const technician = await currentUser();
    console.log("customer PATCH", body);
    const {
      businessName,
      address,
      contactName,
      contactEmail,
      technicianNotes,
    } = body;

    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !address) {
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

    let customerTags = await prismadb.tag.findMany({
      where: {
        customerId: params.customerId,
      },
    });

    let tagIds = customerTags.map((tag) => ({ id: tag.id }));

    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.customer.update({
      where: {
        id: params.customerId,
      },
      data: {
        technician: {
          connect: {
            id: technicianRecord.id,
          },
        },
        tags: {
          connect: tagIds,
        },
        businessName,
        contactName,
        contactEmail,
        technicianNotes: technicianNotes,
        address,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[CUSTOMER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const technician = await auth();

    // check if technician is logged in
    if (!technician) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if tag exists
    const tag = await prismadb.tag.findUnique({
      where: {
        id: params.customerId,
      },
    });

    if (!tag) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete the tag
    await prismadb.tag.delete({
      where: {
        id: params.customerId,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[CUSTOMER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
