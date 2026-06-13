import { FileText } from "lucide-react";

import {
  emailTemplates,
} from "../api/emailApi";

export default function EmailTemplates({
  onSelectTemplate,
}) {
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
      <div className="flex items-center gap-3 mb-6">
        <FileText
          size={22}
          className="text-blue-600"
        />

        <h2 className="text-xl font-bold text-gray-800">
          Email Templates
        </h2>
      </div>

      {/* Templates List */}
      <div className="grid gap-4">
        {emailTemplates.map(
          (template) => (
            <div
              key={template.id}
              className="
                border
                border-gray-200
                rounded-xl
                p-4
                hover:border-blue-500
                hover:shadow-md
                transition-all
              "
            >
              <h3 className="font-semibold text-gray-800">
                {template.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {template.subject}
              </p>

              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {template.message}
              </p>

              <button
                onClick={() =>
                  onSelectTemplate(
                    template
                  )
                }
                className="
                  mt-4
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded-lg
                  hover:bg-blue-700
                  transition
                "
              >
                Use Template
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}