import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'chevannes.kai@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  }
})

async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  try {
    const info = await transporter.sendMail({
      from: '"Portfolio Website" <chevannes.kai@gmail.com>',
      to: 'chevannes.kai@gmail.com',
      subject: `${name} - Portfolio Contact`,
      text: `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`,
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    return NextResponse.json(
      {
        success: true,
        message: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Error while sending mail: ${err}`);
    return NextResponse.json(
      {
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}

export { POST }
