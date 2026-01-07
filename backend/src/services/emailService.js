const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const sendEmail = async ({ to, subject, htmlBody, textBody }) => {
  const params = {
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
        Text: {
          Charset: 'UTF-8',
          // Use provided textBody or a simple fallback
          // For production, consider using html-to-text library for better conversion
          Data: textBody || htmlBody.replace(/<[^>]*>?/gm, ''),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.SES_FROM_EMAIL,
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result.MessageId);
    return {
      success: true,
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, username) => {
  const subject = 'Welcome to Our Platform!';
  const htmlBody = `
    <html>
      <body>
        <h1>Welcome, ${username}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Team</p>
      </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject,
    htmlBody,
  });
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request';
  const htmlBody = `
    <html>
      <body>
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject,
    htmlBody,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
