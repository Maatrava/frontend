import React, { useMemo, useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm here to help. What would you like to know?" },
  ]);

  const [botAnim, setBotAnim] = useState(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);
  const scrollRef = useRef(null);

  // Load Lottie JSON from public/
  useEffect(() => {
    fetch("/bot.json")
      .then((res) => res.json())
      .then(setBotAnim)
      .catch(console.error);

    // Fetch History
    const fetchHistory = async () => {
      try {
        const history = await apiClient("/chat/history");
        if (history && history.length > 0) {
          const formatted = history.map(h => ({
            from: h.sender === "ai" ? "bot" : "user",
            text: h.message
          }));
          setMessages(formatted);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");

    // Add a temporary "thinking" message
    setMessages((prev) => [...prev, { from: "bot", text: "..." }]);

    try {
      const response = await apiClient("/chat", {
        method: "POST",
        body: { message: trimmed },
      });

      setMessages((prev) => {
        const newMsgs = [...prev];
        // Replace the "..." message with actual response
        newMsgs[newMsgs.length - 1] = { from: "bot", text: response.reply };
        return newMsgs;
      });
    } catch (err) {
      console.error("AI request failed:", err);
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { from: "bot", text: "I'm having trouble connecting to the AI. Please try again later." };
        return newMsgs;
      });
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg"
      >
        Chat
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-start justify-between border-b p-4">
              <div>
                <div className="font-bold">Chat Support</div>
                <div className="text-xs text-slate-500">
                  Ask anything about mom & baby care
                </div>
              </div>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Lottie */}
            <div className="flex items-center gap-4 border-b bg-slate-50 p-4">
              <div className="h-[150px] w-[150px] rounded-2xl border bg-white grid place-items-center">
                {botAnim ? (
                  <Lottie
                    animationData={botAnim}
                    loop
                    autoplay
                    className="h-[140px] w-[140px]"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Loading…</span>
                )}
              </div>

              <div className="text-sm font-semibold text-slate-700">
                I’m thinking… tell me what you need help with.
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-80 space-y-2 overflow-y-auto p-4"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                    (m.from === "user"
                      ? "ml-auto bg-slate-900 text-white rounded-br-md"
                      : "mr-auto bg-slate-100 rounded-bl-md")
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
                placeholder="Type your message…"
              />
              <button
                onClick={onSend}
                disabled={!canSend}
                className={`rounded-xl px-4 py-2 text-sm font-bold text-white ${canSend ? "bg-blue-600" : "bg-blue-600/50"
                  }`}
              >
                Send
              </button>
            </div>

            {/* Footer */}
            <div className="border-t bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
              This chatbot is for informational purposes only.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

