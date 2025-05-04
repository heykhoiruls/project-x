"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { MoreHorizontalIcon } from "lucide-react";

export function UserCard({ user }: { user: any }) {
  const [bankName, setBankName] = useState(user.Bank?.name ?? "");
  const [bankNumber, setBankNumber] = useState(user.Bank?.number ?? "");
  const [email, setEmail] = useState(user.Profile?.email ?? "");

  async function handleSave() {
    await fetch("/api/user/update-bank", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nik: user.nomor.toString(),
        bankName: bankName,
        bankNumber: bankNumber.toString(),
        email: email,
      }),
    });

    window.location.reload();
  }

  return (
    <Card className="p-0">
      <CardHeader className="flex justify-between p-4">
        <div className="px-1">
          <CardTitle className="text-sm">{user.nama}</CardTitle>
          <CardDescription className="text-xs">{user.nomor}</CardDescription>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
            >
              <MoreHorizontalIcon />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Bank</DialogTitle>
              <DialogDescription>Update bank name user ini.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Nama</Label>
                <Input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>No Rekening</Label>
                <Input
                  value={bankNumber}
                  onChange={(e) => setBankNumber(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      {/* <CardContent>
        <div className="flex items-center space-x-4 rounded-md border py-3 px-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-muted-foreground">
              {user.Bank?.name ?? "Gak ada bank nya"}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.Bank?.number ?? "hmm . . "}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {user.Profile?.email ?? "Email tidak ada"}
          </div>
        </div>
      </CardContent> */}
    </Card>
  );
}
