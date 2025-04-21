import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

import { User } from "@prisma/client";

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      Bank: true,
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      {users.map((user: User) => (
        <Card
          key={user.id}
          className="p-6 w-full max-w-md shadow-md"
        >
          <CardContent>
            <h1 className="text-xl font-bold">{user.nama}</h1>
            <h1 className="text-xl font-bold">{user.Bank?.nomor}</h1>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
