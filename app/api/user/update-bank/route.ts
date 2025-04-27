import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { nik, bankName, bankNumber, email } = await req.json();
  console.log("Received data:", { nik, bankName, bankNumber, email });

  try {
    await prisma.profile.upsert({
      where: { nik: nik },
      update: {
        email: email, // jika ada, update bank name
      },
      create: {
        nik: nik,
        email: email,
      },
    });
    // Update bank berdasarkan nik
    await prisma.bank.upsert({
      where: {
        nik: nik, // pastikan nik digunakan di sini
      },
      update: {
        name: bankName, // jika ada, update bank name
        number: bankNumber, // jika ada, update bank name
      },
      create: {
        nik: nik, // jika tidak ada, buat bank baru
        name: bankName, // set nama bank baru
        number: bankNumber, // set nama bank baru
      },
    });

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
