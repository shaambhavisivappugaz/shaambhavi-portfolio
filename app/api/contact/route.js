import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'shaambhavishaam@gmail.com',
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#4f8ef7,#3b7ef8);padding:24px 28px;">
            <h2 style="margin:0;font-size:18px;color:#fff;">New Portfolio Message</h2>
          </div>
          <div style="padding:28px;">
            <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;">From</p>
            <p style="margin:0 0 20px;font-size:15px;color:#fff;font-weight:600;">${name} &lt;${email}&gt;</p>
            ${subject ? `<p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;">Subject</p><p style="margin:0 0 20px;font-size:15px;color:#fff;">${subject}</p>` : ''}
            <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;">Message</p>
            <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.8);line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
          <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">Sent via shaambhavi.dev portfolio</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Shaambhavi Sivappugaz <onboarding@resend.dev>',
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;">
          <p style="font-size:16px;">Hi ${name},</p>
          <p style="font-size:15px;line-height:1.7;color:#444;">Thanks for getting in touch! I've received your message and will get back to you within 1–2 business days.</p>
          <p style="font-size:15px;line-height:1.7;color:#444;">In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/shaambhavi-sivappugaz" style="color:#4f8ef7;">LinkedIn</a>.</p>
          <p style="font-size:15px;color:#444;">— Shaambhavi</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
