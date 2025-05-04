"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { handleSendEmail } from "@/lib/sendEmail";
import { Label } from "@radix-ui/react-label";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PageDashboard = () => {
  const [userData, setUserData] = useState({
    name: "Loading",
    email: "Loading...",
  });
  const idEmployee = 250310049;

  const [email, setEmail] = useState(userData.email);

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${idEmployee}`);
        const data = await response.json();
        setUserData({ name: data.name, email: data.email });
        setEmail(data.email);
      } catch (error) {
        setUserData({
          name: "Error fetching name",
          email: "Error fetching email",
        });
      }
    };

    if (idEmployee) {
      fetchUserData();
    }
  }, [idEmployee]);

  const updateEmailInPrisma = async () => {
    if (!email) {
      toast.warning("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(`/api/user/update-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idEmployee,
          email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Email updated successfully!");
        setUserData({ ...userData, email });
      } else {
        throw new Error(result.message || "Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email: ", error);
    }

    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-20 gap-3">
      <Card className="w-sm">
        <CardHeader className="flex justify-between px-4">
          <div className="px-1">
            <CardTitle className="text-sm">{userData.name}</CardTitle>
            <div className="flex items-center gap-1.5">
              <CardDescription className="text-xs">
                {idEmployee}
              </CardDescription>
              <CardDescription className="text-xs">-</CardDescription>
              <CardDescription className="text-xs">
                {userData.email}
              </CardDescription>
            </div>
          </div>

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? <XIcon /> : <MoreHorizontalIcon />}
          </Button>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full disabled"
            variant={"secondary"}
            disabled={
              !userData.email ||
              userData.email === "Loading..." ||
              userData.email === "Error fetching email" ||
              userData.email === "tidak ada email"
            }
            onClick={() =>
              handleSendEmail(userData.email, idEmployee, userData.name)
            }
          >
            Kirim Slip Gaji
          </Button>
        </CardFooter>
      </Card>

      {/* Toggleable Form Card */}
      <div
        className={`w-sm transition-all duration-300 ease-in-out transform ${
          formVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <Card>
          <CardHeader>
            <div className="grid gap-3">
              <div>
                <Label className="text-xs font-medium px-2">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Masukan email kamu"
                  className="mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              variant={"default"}
              onClick={updateEmailInPrisma}
            >
              Simpan Email
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PageDashboard;
