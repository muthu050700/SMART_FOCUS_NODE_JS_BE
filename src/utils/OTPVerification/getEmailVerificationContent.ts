export const getEmailOTPVerificationContent = (
  otp: number,
  firstName: string,
  lastName: string
) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#333;">
  <p>Dear <strong>${firstName ?? ""} ${lastName ?? ""}</strong>,</p>

  <p>Welcome to <strong>Smart Focus Tuition Center</strong>!</p>

  <p>
    Thank you for registering with us. To complete your account verification,
    please use the One-Time Password (OTP) below:
  </p>

  <div style="background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:20px;text-align:center;">
    <p style="margin:0;font-size:18px;">Your Verification Code</p>
    <h1 style="margin:15px 0;color:#0d6efd;letter-spacing:3px;">${otp}</h1>
  </div>

  <p><strong>This OTP is valid for 5 minutes.</strong></p>

  <p>Please enter this code on the verification screen to activate your account.</p>

  <p><strong>For your security:</strong></p>

  <ul>
    <li>Do not share this OTP with anyone.</li>
    <li>We will never ask for your OTP.</li>
    <li>If you didn't request this email, please ignore it.</li>
  </ul>

  <p>
    Thank you,<br>
    <strong>Smart Focus Tuition Center</strong>
  </p>
</div>
`;