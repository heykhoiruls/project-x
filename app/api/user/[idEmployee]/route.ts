import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { idEmployee: string } }
) {
  const { idEmployee } = await params;
  console.log("idEmployee parameter:", idEmployee);
  try {
    const user = await prisma.user.findUnique({
      where: { nomor: parseInt(idEmployee) },
      include: { Profile: { select: { email: true } } }, // Include email from Profile
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return both name and email
    return NextResponse.json({
      name: user.nama,
      email: user.Profile?.email || "tidak ada email", // Default if email is missing
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
