import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      Bank: true,
      Profile: true,
    },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {users.map((user) => (
        <Card
          key={user.id}
          className="p-6 w-full max-w-md shadow-md"
        >
          <CardContent>
            <h1 className="text-xl font-bold">{user.nama}</h1>
            <h1 className="text-lg">{user.nomor}</h1>
            <h1>{user.Profile?.gender}</h1>

            <div className="mt-4">
              {user.Bank.length > 0 ? (
                user.Bank.map((bank) => (
                  <p
                    key={bank.id}
                    className="text-gray-600"
                  >
                    {bank.nomor?.toNumber()}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">Tidak ada bank</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
