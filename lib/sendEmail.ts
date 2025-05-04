import { toast } from "sonner";

// lib/sendEmail.ts
export const handleSendEmail = async (
  email: string,
  id: number,
  name: string
) => {
  try {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, id, name }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    toast.success("Slip berhasil dikirim, check email kamu ya");
  } catch (error) {
    console.error("Error sending email:", error);
    toast.warning("Yah, gagal kirim slip gaji");
  }
};
