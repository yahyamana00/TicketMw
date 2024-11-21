import { Client, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('673d46e50025bec66444');

const functions = new Functions(client);

interface EmailTemplate {
  subject: string;
  body: string;
}

function getLoginEmailTemplate(name: string): EmailTemplate {
  return {
    subject: 'New Login to Your TicketMe Account',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Login Detected</h2>
        <p>Hi ${name},</p>
        <p>We detected a new login to your TicketMe account. If this was you, no action is needed.</p>
        <p>Login Details:</p>
        <ul>
          <li>Date: ${new Date().toLocaleString()}</li>
          <li>Location: [Location will be added in production]</li>
        </ul>
        <p>If you didn't login recently, please secure your account by:</p>
        <ol>
          <li>Changing your password immediately</li>
          <li>Enabling two-factor authentication</li>
          <li>Contacting our support team</li>
        </ol>
        <p>Best regards,<br>The TicketMe Team</p>
      </div>
    `
  };
}

function getRegistrationEmailTemplate(name: string): EmailTemplate {
  return {
    subject: 'Welcome to TicketMe!',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to TicketMe!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for creating a TicketMe account. We're excited to have you on board!</p>
        <p>You can now:</p>
        <ul>
          <li>Submit and track support tickets</li>
          <li>Communicate with our support team</li>
          <li>Access your personalized dashboard</li>
        </ul>
        <p>Please verify your email address to get started.</p>
        <p>Best regards,<br>The TicketMe Team</p>
      </div>
    `
  };
}

export async function sendLoginNotification(email: string, name: string) {
  try {
    const template = getLoginEmailTemplate(name);
    
    // Execute the email function
    await functions.createExecution(
      'send_email',
      JSON.stringify({
        to: email,
        subject: template.subject,
        body: template.body,
      })
    );

    return { success: true };
  } catch (error) {
    console.error('Failed to send login notification:', error);
    // Don't throw the error, just return false to prevent login interruption
    return { success: false, error };
  }
}

export async function sendRegistrationConfirmation(email: string, name: string) {
  try {
    const template = getRegistrationEmailTemplate(name);
    
    await functions.createExecution(
      'send_email',
      JSON.stringify({
        to: email,
        subject: template.subject,
        body: template.body,
      })
    );

    return { success: true };
  } catch (error) {
    console.error('Failed to send registration confirmation:', error);
    // Don't throw the error, just return false to prevent registration interruption
    return { success: false, error };
  }
}