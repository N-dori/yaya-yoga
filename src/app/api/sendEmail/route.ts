import { getBaseUrl } from '../../utils/util';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'



export async function POST(request) {
  const { to, name, _id, emailType } = await request.json()
  let html: string = ''
  let subject:string =''
  
  
  let reNewMembershipHtml = `
  <h2 style="margin-bottom: 2em; font-size: 40px; direction: rtl;">שלום ${name} היקר/ה</h2>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">שלום רב, מקווים שהכול אצלך טוב! שמנו לב שבכרטיסייה שלך נותרה כניסה אחת. אנו נשמח לראותך ממשיכ/ה במסע שלך עם היוגה יחד איתנו בסטודיו.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">כחבר/ת סטודיו, תוכל/י להנות שוב מכל שיעורי הסטודיו, לווי ותמיכה לאורך כל הדרך בך בתרגול.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">אם יש משהו שנוכל לעזור בו או אם יש לך שאלות כלשהן, אנחנו כאן בשבילך! ניתן לחדש את הכרטיסייה בקלות כאן ${getBaseUrl()}/pricing או בהגעה לסטודיו.</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">תודה נשמח מאוד לראותך שוב בקרוב!</p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">בברכה חמה,!</p>
  <p>יאיא יוגה</p>
  `
  let welcomeHtml = `
  <h1 style="margin-bottom: 2em; font-size: 40px; direction: rtl;">  היי  ${name}  שמחים שהצטרפתם אליינו  </h1>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">  ברכות על הצטרפותך לסטודיו קדם  </p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">  יוגה היא שיטת אימון המתאימה לכל גיל ולכל רמה של כוח, כושר וגמישות. אולם, קיימים מספר מצבים רפואיים הדורשים אימון מעט שונה ותשומת לב מיוחדת מצד המורה והמתרגל.
  </p>
  <p style="margin-bottom: 2em; font-size: 20px; direction: rtl;">*מעל גיל 70 יש להמציא אישור רפואי כי אין מניעה לבצע פעילות גופנית
  **נשים בזמן וסת או הריון צריכות להימנע מתרגילים מסוימים. אנא היוועצי עם המורה לפני תחילת השיעור.
  </p>
  <a style="margin-bottom: 2em; font-size: 20px; direction: rtl;" href="${getBaseUrl()}/healthDecleration/${_id}">למלוי השאלון הרפואי</a> 
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
    let info = await transporter.sendMail({
      from: '"YAYA YOGA" <dori.nadav@gmail.com>',
      to,
      subject,
      html,
    })
     return NextResponse.json({ message: "Email sent successfully",info }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error sending email" }, { status: 500 })
  }
}
