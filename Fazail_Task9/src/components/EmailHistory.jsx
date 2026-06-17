import { useMemo, useState } from "react";
import { Trash2, Search, Mail } from "lucide-react";
import {
  getEmailHistory,
  deleteEmailHistory,
  clearEmailHistory,
} from "../api/emailApi";

export default function EmailHistory() {
  const [emails, setEmails] = useState(() => getEmailHistory());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const loadHistory = () => {
    setEmails(getEmailHistory());
  };

  const handleDelete = (id) => {
    deleteEmailHistory(id);
    loadHistory();
  };

  const handleClearAll = () => {
    const confirmed = window.confirm("Clear all email history?");
    if (!confirmed) return;

    clearEmailHistory();
    setEmails([]);
  };

  const filteredEmails = useMemo(() => {
    let data = [...emails];

    // Search Filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(
        (email) =>
          email.recipient?.toLowerCase().includes(searchLower) ||
          email.subject?.toLowerCase().includes(searchLower)
      );
    }

    // Status Filter
    if (statusFilter !== "all") {
      data = data.filter((email) => email.status === statusFilter);
    }

    // Sorting Engine
    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "recipient":
        data.sort((a, b) => a.recipient.localeCompare(b.recipient));
        break;
      case "subject":
        data.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [emails, search, statusFilter, sortBy]);

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-4
        sm:p-6
      "
    >
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Mail size={24} className="text-blue-600 shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Email History
            </h2>
            <p className="text-sm text-gray-500">
              {emails.length} Emails
            </p>
          </div>
        </div>

        <button
          onClick={handleClearAll}
          className="
            w-full
            sm:w-auto
            px-4
            py-2.5
            bg-red-500
            text-white
            text-sm
            font-medium
            rounded-xl
            hover:bg-red-600
            transition-colors
          "
        >
          Clear History
        </button>
      </div>

      {/* Control Filters Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Input Text Box search */}
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />
          <input
            type="text"
            placeholder="Search emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-10
              pr-4
              py-2.5
              text-sm
              border
              border-gray-200
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/20
              focus:border-blue-500
            "
          />
        </div>

        {/* Dropdown status selection */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            px-3
            py-2.5
            text-sm
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            focus:border-blue-500
          "
        >
          <option value="all">All Statuses</option>
          <option value="Sent">Sent</option>
          <option value="Failed">Failed</option>
        </select>

        {/* Sorting Dropdown parameters */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            px-3
            py-2.5
            text-sm
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            focus:border-blue-500
          "
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="recipient">Recipient</option>
          <option value="subject">Subject</option>
        </select>
      </div>

      {/* Main Grid View List Results */}
      {filteredEmails.length === 0 ? (
        <div className="text-center py-12">
          <Mail size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No emails found</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="py-3 pr-4 font-semibold">Recipient</th>
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 pl-4 font-semibold text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-gray-700 whitespace-nowrap">
                {filteredEmails.map((email) => (
                  <tr key={email.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pr-4 font-medium text-gray-900 max-w-40 truncate">
                      {email.recipient}
                    </td>
                    <td className="py-3.5 px-4 max-w-55 truncate text-gray-600">
                      {email.subject}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-2.5
                          py-0.5
                          rounded-full
                          text-xs
                          font-medium
                          ${
                            email.status === "Sent"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : "bg-red-50 text-red-700 border border-red-100"
                          }
                        `}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">
                      {new Date(email.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <button
                        onClick={() => handleDelete(email.id)}
                        className="
                          p-2
                          rounded-lg
                          text-red-500
                          hover:bg-red-50
                          transition-colors
                          inline-flex
                          items-center
                          justify-center
                        "
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}