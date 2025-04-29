import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fungsi replacer untuk mengonversi BigInt ke string
function replacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function POST(req: Request) {
  const { nomor } = await req.json();

  const user = await prisma.user.findUnique({
    where: { nomor: BigInt(nomor) }, // pastikan nomor diubah ke BigInt jika diperlukan
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  } else {
    // Menggunakan JSON.stringify dengan replacer untuk mengubah BigInt ke string
    const userJson = JSON.stringify(user, replacer);

    return NextResponse.json(JSON.parse(userJson)); // parsing kembali agar bisa mengembalikan sebagai JSON yang valid
  }
}
