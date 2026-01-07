const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

const sendPushNotification = async (message, subject = 'Notification') => {
  const params = {
    Message: message,
    Subject: subject,
    TopicArn: process.env.SNS_TOPIC_ARN,
  };

  try {
    const result = await sns.publish(params).promise();
    console.log('Push notification sent successfully:', result.MessageId);
    return {
      success: true,
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw new Error(`Failed to send push notification: ${error.message}`);
  }
};

const sendUserNotification = async (userId, message, subject) => {
  // In a production app, you would:
  // 1. Look up user's device tokens/endpoints
  // 2. Send to specific endpoints rather than a topic
  // For this example, we'll send to a topic
  
  const notificationMessage = JSON.stringify({
    default: message,
    APNS: JSON.stringify({
      aps: {
        alert: {
          title: subject,
          body: message,
        },
        sound: 'default',
      },
    }),
    GCM: JSON.stringify({
      notification: {
        title: subject,
        body: message,
      },
    }),
  });

  const params = {
    Message: notificationMessage,
    MessageStructure: 'json',
    TopicArn: process.env.SNS_TOPIC_ARN,
  };

  try {
    const result = await sns.publish(params).promise();
    return {
      success: true,
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending user notification:', error);
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};

module.exports = {
  sendPushNotification,
  sendUserNotification,
};
