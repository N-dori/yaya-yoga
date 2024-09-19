import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer' 



export  async function POST(request) {
  const { to,name } = await request.json()
  let html  =`<h1>  שמחים שהצטרפתם אליינו ${name} היי  </h1>
  <p> גוף המייל
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </p>`
    let transporter = nodemailer.createTransport({

      service: 'Gmail',
      auth: {
        user: process.env.NEXTAUTH_PUBLIC_EMAIL_USER,
        pass: process.env.NEXTAUTH_PUBLIC_EMAIL_PASS,
      },
    })

    try {
      let info = await transporter.sendMail({
        from: '"YAYA YOGA" <dori.nadav@gmail.com>',
        to,
        subject:'ברוכים הבאים לסטודיו קדם',
        html,
      })
      return NextResponse.json({message: "Email sent successfully" }, info, {status: 200 } )
    } catch (error) {
        return NextResponse.json({message: "Error sending email" }, {status: 500 } )
    }
}
