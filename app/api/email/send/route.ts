// app/api/email/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, id, name } = await req.json();

    // Send email logic (using nodemailer or external service)
    // Example below uses a test account

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "sigma.majalengka@gmail.com",
        pass: "dgpu anqp hshl mhpy",
      },
    });

    await transporter.sendMail({
      from: '"Human Resource Sigma" <sigma.majalengka@gmail.com>',
      to: email,
      subject: `PAYROLL SLIP - ${name}`,
      html: `
            <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
            <p>Hai, <strong>${name}</strong>,</p>
            <p>Dengan hormat,</p>
            <p>
                Bersama email ini kami sampaikan slip gaji Anda untuk periode bulan ini.
            </p>
           <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; font-size: 14px;">Nama</td>
                    <td style="padding: 8px; font-size: 14px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-size: 14px;">Nomor Karyawan</td>
                    <td style="padding: 8px; font-size: 14px;">${id}</td>
                </tr>
            </table>
            <p>
                Apabila terdapat ketidaksesuaian data, mohon segera menghubungi
                Divisi Human Resource untuk dilakukan penyesuaian lebih lanjut.
            </p>
            <p>
                Demikian disampaikan, atas perhatian dan kerja samanya kami ucapkan terima kasih.
            </p>
            <br />
            <p>
                Hormat kami,<br />
                Divisi Human Resource<br />
                PT Mitra Sigma Tekindo
            </p>
            </div>
        `,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
