import { useEffect, useState } from "react";

import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  sendEmail,
  saveEmailHistory,
} from "../api/emailApi";

import {
  useNotifications,
} from "../context/NotificationContext";

export default function EmailComposer({
  selectedTemplate,
  onActivity,
}) {
  const {
    addNotification,
  } = useNotifications();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  /*
  |--------------------------------------------------------------------------
  | Load Selected Template
  |--------------------------------------------------------------------------
  */

 useEffect(() => {
  if (!selectedTemplate) return;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setForm({
    to: "",
    subject: selectedTemplate.subject,
    message: selectedTemplate.message,
  });
}, [selectedTemplate]);

  /*
  |--------------------------------------------------------------------------
  | Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validateForm = () => {
    if (!form.to.trim()) {
      toast.error(
        "Recipient email is required"
      );
      return false;
    }

    if (!form.subject.trim()) {
      toast.error(
        "Subject is required"
      );
      return false;
    }

    if (!form.message.trim()) {
      toast.error(
        "Message is required"
      );
      return false;
    }

    return true;
  };

  /*
  |--------------------------------------------------------------------------
  | Send Email
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const result =
        await sendEmail(form);

      if (!result.success) {
        throw new Error(
          "Email sending failed"
        );
      }

      /*
      --------------------------------------------------------------
      Save History
      --------------------------------------------------------------
      */

      saveEmailHistory(form);

      /*
      --------------------------------------------------------------
      Toast
      --------------------------------------------------------------
      */

      toast.success(
        "Email sent successfully"
      );

      /*
      --------------------------------------------------------------
      Notification Context
      --------------------------------------------------------------
      */

      addNotification({
        title: "Email Sent",
        message: `Email sent to ${form.to}`,
        type: "success",
      });

      /*
      --------------------------------------------------------------
      Activity Feed
      --------------------------------------------------------------
      */

      if (onActivity) {
        onActivity({
          id: Date.now(),
          type: "email",
          message: `Email sent to ${form.to}`,
          createdAt:
            new Date().toISOString(),
        });
      }

      /*
      --------------------------------------------------------------
      Reset Form
      --------------------------------------------------------------
      */

      setForm({
        to: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to send email"
      );

      addNotification({
        title: "Email Error",
        message:
          "Failed to send email",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-6
      "
    >
      {/* Header */}

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Email Composer
      </h2>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Recipient */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Recipient Email
          </label>

          <input
            type="email"
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder="john@example.com"
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Subject */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Email Subject"
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Message */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Message
          </label>

          <textarea
            rows={8}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
            transition
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}