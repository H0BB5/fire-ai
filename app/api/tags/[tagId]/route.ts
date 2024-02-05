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
  console.log("DELETE!!!!", params);
  try {
    const technician = await auth();

    // Check if technician is logged in
    if (!technician) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the Tag with Customer and its Tags for checking
    const tagWithCustomer = await prismadb.tag.findUnique({
      where: { id: params.tagId },
      include: { customer: { include: { tags: true } } }, // Include Customer and their Tags
    });

    if (!tagWithCustomer) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const customerTagsCount = tagWithCustomer.customer.tags.length;

    // Delete Notifications associated with the Tag
    await prismadb.notification.deleteMany({
      where: { tagId: params.tagId },
    });

    // Delete the Tag
    await prismadb.tag.delete({
      where: { id: params.tagId },
    });

    // If Customer has only this Tag, delete the Customer
    if (customerTagsCount === 1) {
      await prismadb.customer.delete({
        where: { id: tagWithCustomer.customerId },
      });
    }

    // Optionally, after deleting the tag, fetch the updated list of tags
    const updatedTags = await prismadb.tag.findMany({});

    // Return the updated list of tags
    return new NextResponse(JSON.stringify(updatedTags), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[TAG_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
