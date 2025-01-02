import { getBaseUrl } from '../../utils/util';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import {} from '../../../../public/logo.png'
const path = require('path');

export async function POST(request) {
  const { to, name, _id, emailType } = await request.json()
  let html: string = ''
  let subject:string =''
  console.log( path.resolve('YAYA-YOGA/public/logo.png'));
  console.log( path.resolve('../../../../public/logo.png'));
  
  
  let reNewMembershipHtml = `
  <h2 style="margin-bottom: 2em; font-size: 28px; direction: rtl;">שלום ${name} היקר/ה</h2>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">שלום רב, מקווים שהכול אצלך טוב! שמנו לב שבכרטיסייה שלך נותרה כניסה אחת. אנו נשמח לראותך ממשיכ/ה במסע שלך עם היוגה יחד איתנו בסטודיו.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">כחבר/ת סטודיו, תוכל/י להנות שוב מכל שיעורי הסטודיו, לווי ותמיכה לאורך כל הדרך בך בתרגול.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">אם יש משהו שנוכל לעזור בו או אם יש לך שאלות כלשהן, אנחנו כאן בשבילך! ניתן לחדש את הכרטיסייה בקלות כאן ${getBaseUrl()}/pricing או בהגעה לסטודיו.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">תודה נשמח מאוד לראותך שוב בקרוב!</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">בברכה חמה,!</p>
  <p>יאיא יוגה</p>
  `
  let welcomeHtml = `
  <h1 style="margin-bottom: 2em; font-size: 28px; direction: rtl;">  היי  ${name}  שמחים שהצטרפת אליינו 🌸  </h1>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">  ברכות על הצטרפותך לסטודיו קדם  </p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">  יוגה היא שיטת אימון המתאימה לכל גיל ולכל רמה של כוח, כושר וגמישות. אולם, קיימים מספר מצבים רפואיים הדורשים אימון מעט שונה ותשומת לב מיוחדת מצד המורה והמתרגל.
  </p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">*מעל גיל 70 יש להמציא אישור רפואי כי אין מניעה לבצע פעילות גופנית
  **נשים בזמן וסת או הריון צריכות להימנע מתרגילים מסוימים. אנא היוועצי עם המורה לפני תחילת השיעור.
  <a style="margin-bottom: 2em; font-size: 20px; direction: rtl;" href="${getBaseUrl()}/healthDecleration/${_id}">למלוי השאלון הרפואי</a> 
<p style="margin-bottom: 2em; display: flex; justify-content: center; width: 100%; position: relative;  direction: rtl;">
  <img 
    alt="yaya-yoga image" 
    src="cid:dori.nadav@gmail.com" 
    style="object-fit: cover; width: 15em; height: auto; background: #bc8e78;" 
  />
  <h4 style=" direction: rtl;">בית פעם- סטודיו קדם</h4>
      <h5 style=" direction: rtl;" >רחוב הדקלים 92, פרדס חנה-כרכור</h5>
      <h6 style=" direction: rtl;">052-437-7820</h6>
</p>
  `
  
  const getEmailType = (emailType: string) => {
    if(emailType === 'welcome'){

      html = welcomeHtml
      subject = 'שאלון רפואי סטודיו קדם'
    }
    if(emailType === 'renew'){
      html = reNewMembershipHtml
      subject = `הזמנה לחידוש המנוי`
    }
  }
  getEmailType(emailType)
  let transporter = nodemailer.createTransport({
    
    service: 'Gmail',
    auth: {
      user: process.env.NEXTAUTH_PUBLIC_EMAIL_USER,
      pass: process.env.NEXTAUTH_PUBLIC_EMAIL_PASS,
    },
  })
  
  try {
    var info = await transporter.sendMail({
      from: '"YAYA YOGA" <dori.nadav@gmail.com>',
      to,
      subject,
      html,
      attachments: [{
        filename: 'logo.png',  // The filename of the image
        path: path.resolve('public/logo.png'), // Use path.resolve for consistent paths        cid: 'dori.nadav@gmail.com', // This should match the cid in the HTML img src
        cid: 'dori.nadav@gmail.com', // Matches the cid in the HTML img src
        contentType:'image/png'
      }]
    })
     return NextResponse.json({ message: "Email sent successfully",info }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error sending email" ,info}, { status: 500 })
  }
}
