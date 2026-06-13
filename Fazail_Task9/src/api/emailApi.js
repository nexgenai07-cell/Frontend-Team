import emailjs from "@emailjs/browser";

/*
|--------------------------------------------------------------------------
| EmailJS Configuration
|--------------------------------------------------------------------------
*/
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/*
|--------------------------------------------------------------------------
| Send Email
|--------------------------------------------------------------------------
*/

export const sendEmail = async ({
  to,
  subject,
  message,
}) => {
  try {
    const templateParams = {
      to_email: to,
      subject,
      message,
    };

    const response =
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(
      "Email Send Error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
};

/*
|--------------------------------------------------------------------------
| Email Templates
|--------------------------------------------------------------------------
*/

export const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Our Platform",
    message:
      "Thank you for joining us. We're excited to have you onboard.",
  },

  {
    id: 2,
    name: "Reminder Email",
    subject: "Friendly Reminder",
    message:
      "This is a reminder regarding your pending task.",
  },

  {
    id: 3,
    name: "Promotion Email",
    subject: "Special Offer Just For You",
    message:
      "Enjoy our exclusive promotion available for a limited time.",
  },

  {
    id: 4,
    name: "Thank You Email",
    subject: "Thank You",
    message:
      "We appreciate your support and trust in our services.",
  },
];

/*
|--------------------------------------------------------------------------
| Email History Storage
|--------------------------------------------------------------------------
*/

const EMAIL_HISTORY_KEY =
  "email_history";

/*
|--------------------------------------------------------------------------
| Get Email History
|--------------------------------------------------------------------------
*/

export const getEmailHistory = () => {
  const emails =
    localStorage.getItem(
      EMAIL_HISTORY_KEY
    );

  return emails
    ? JSON.parse(emails)
    : [];
};

/*
|--------------------------------------------------------------------------
| Save Email To History
|--------------------------------------------------------------------------
*/

export const saveEmailHistory = (
  email
) => {
  const history =
    getEmailHistory();

  const newEmail = {
    id: Date.now(),

    recipient: email.to,

    subject: email.subject,

    message: email.message,

    status: "Sent",

    createdAt:
      new Date().toISOString(),
  };

  history.unshift(newEmail);

  localStorage.setItem(
    EMAIL_HISTORY_KEY,
    JSON.stringify(history)
  );

  return newEmail;
};

/*
|--------------------------------------------------------------------------
| Delete Email
|--------------------------------------------------------------------------
*/

export const deleteEmailHistory = (
  id
) => {
  const history =
    getEmailHistory();

  const updatedHistory =
    history.filter(
      (email) => email.id !== id
    );

  localStorage.setItem(
    EMAIL_HISTORY_KEY,
    JSON.stringify(updatedHistory)
  );

  return updatedHistory;
};

/*
|--------------------------------------------------------------------------
| Clear Email History
|--------------------------------------------------------------------------
*/

export const clearEmailHistory = () => {
  localStorage.removeItem(
    EMAIL_HISTORY_KEY
  );
};