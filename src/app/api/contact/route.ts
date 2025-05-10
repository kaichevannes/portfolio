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
  console.log('Waiting for request.text()');
  const bodyText = await request.text();
  console.log(`Received: ${bodyText}`);
  const { name, email, message } = JSON.parse(bodyText);

  console.log('Message contents');
  const messageContents = `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`;

  try {
    console.log('Waiting for transporter.sendMail');
    const info = await transporter.sendMail({
      from: '"Portfolio Website" <chevannes.kai@gmail.com>',
      to: 'chevannes.kai@gmail.com',
      subject: `${name} - Portfolio Contact`,
      text: messageContents,
    });

    console.log(`Message sent: ${info.messageId}`);
    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        messageContents: messageContents,
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
