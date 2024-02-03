import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const body = await req.json();
    const technician = await currentUser();
    const {
      frontTagSrc,
      // backTagSrc,
      businessName,
      customer,
      type,
      // expiration
    } = body;

    const { address, technicianNotes } = customer;
    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !type) {
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

    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.tag.update({
      where: {
        id: params.tagId,
      },
      data: {
        technician: {
          connect: {
            id: technicianRecord.id,
          },
        },
        customer: {
          upsert: {
            create: {
              customerId: businessName,
              businessName: businessName,
              address: address,
              technicianNotes: technicianNotes,
              technician: {
                connect: { id: technicianRecord.id },
              },
            },
            update: {
              businessName: businessName,
              address: address,
              technicianNotes: technicianNotes,
            },
          },
        },
        businessName: businessName,
        type,
        frontTagSrc,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string } }
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
        id: params.tagId,
      },
    });

    if (!tag) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete the tag
    await prismadb.tag.delete({
      where: {
        id: params.tagId,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
