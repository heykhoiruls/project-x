// app/page.tsx (Home)

import { UserCard } from "@/components/maker/user-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
// ini komponen baru

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      Bank: true,
      Profile: true,
    },
  });

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-8 px-6">
        <Input
          placeholder="Masukan nama kamu"
          className="px-4"
        />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
