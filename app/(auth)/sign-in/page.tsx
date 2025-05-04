"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const PageSignIn = () => {
  const router = useRouter();
  const [idEmployee, setIdEmployee] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomor: idEmployee }),
    });

    if (res.ok) {
      toast.success("Yeaay, berhasil masuk");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }

    if (!res.ok) {
      toast.error("User tidak ditemukan");
      return;
    }

    localStorage.setItem("idEmployee", idEmployee);
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <form
        className="w-full h-3/4 max-w-sm"
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader className="gap-1 px-8 py-4">
            <CardTitle className="text-xl">Selamat datang</CardTitle>
            <CardDescription className="text-sm">
              silahkan masuk dengan akun anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 mb-8">
              <div>
                <Label className="text-xs font-medium px-2">
                  Nomor Karyawan
                </Label>
                <Input
                  id="idEmployee"
                  type="number"
                  placeholder="Masukan nomor karyawan"
                  value={idEmployee}
                  onChange={(e) => {
                    setIdEmployee(e.target.value);
                  }}
                  required
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex justify-end px-2">
              <Button
                type="submit"
                className="px-4"
              >
                Masuk
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PageSignIn;
