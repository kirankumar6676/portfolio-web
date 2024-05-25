import { NextResponse } from "next/server";
import { Resend } from "resend";

// Hardcoded API key and from email
//const resendApiKey = "re_YsNJSCEu_96s8hWd5VX2fotawjUrSabHW";
const fromEmail = "kumarkiran0893@gmail.com";

const resend = new Resend("re_YsNJSCEu_96s8hWd5VX2fotawjUrSabHW");

export async function POST(req) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
