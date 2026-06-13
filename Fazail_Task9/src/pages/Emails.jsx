import { useState } from "react";

import EmailComposer from "../components/EmailComposer";
import EmailTemplates from "../components/EmailTemplates";
import EmailHistory from "../components/EmailHistory";

export default function Emails() {
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Emails
        </h1>

        <p className="text-gray-500 mt-1">
          Manage email templates,
          compose emails, and view
          email history.
        </p>
      </div>

      {/* Templates + Composer */}

      <div
        className="
          grid
          lg:grid-cols-2
          gap-6
        "
      >
        {/* Email Templates */}

        <EmailTemplates
          onSelectTemplate={
            setSelectedTemplate
          }
        />

        {/* Email Composer */}

        <EmailComposer
          selectedTemplate={
            selectedTemplate
          }
        />
      </div>

      {/* Email History */}

      <EmailHistory />
    </div>
  );
}