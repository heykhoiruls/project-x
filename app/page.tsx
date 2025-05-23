import { UserCard } from "@/components/maker/user-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import { unstable_noStore } from "next/cache"; // Tambahkan ini

export default async function Home() {
  unstable_noStore(); // Tambahkan ini, untuk force no-cache!!

  const users = await prisma.user.findMany({
    include: {
      Bank: true,
      Profile: true,
    },
  });

  return (
    <div className="p-4">
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
