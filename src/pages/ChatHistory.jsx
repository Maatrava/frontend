import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, History } from "lucide-react";
import apiClient from "../api/client";

export default function ChatHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await apiClient("/chat/history");
        setHistory(data || []);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chat History</h1>
              <p className="text-xs text-gray-500">View your past conversations</p>
            </div>
          </div>
          <History className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 font-medium">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No history found</h3>
            <p className="text-sm text-gray-500 max-w-[250px] mt-1">
              Your conversations with our AI assistant will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            {history.map((msg, idx) => (
              <div 
                key={msg._id || idx} 
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {msg.sender === "ai" ? "Assistant" : "You"}
                  </span>
                  <span className="text-[10px] text-gray-300">
                    {new Date(msg.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            
            <div className="pt-10 text-center">
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                    End of History
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
