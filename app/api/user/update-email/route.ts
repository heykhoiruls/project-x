import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { idEmployee, email } = await req.json();

    if (!idEmployee || !email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { nomor: idEmployee },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { nik: idEmployee },
      update: { email },
      create: { nik: idEmployee, email },
    });

    return NextResponse.json({
      message: "Email updated",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
