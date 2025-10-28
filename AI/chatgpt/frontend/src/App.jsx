import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE = "http://localhost:3000/api";

function App() {
  const [conversationId, setConversationId] = useState(() => uuidv4());
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const chatEndRef = useRef(null);

  // load saved conversations on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations") || "[]");
    setConversations(saved);
  }, []);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // persist messages
  useEffect(() => {
    if (!messages.length) return;

    setConversations((prev) => {
      const updated = [
        { conversationId, messages },
        ...prev.filter((c) => c.conversationId !== conversationId),
      ].slice(0, 10); // keep up to 10 recent chats

      localStorage.setItem("conversations", JSON.stringify(updated));
      return updated;
    });
  }, [messages, conversationId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, conversationId }),
      });

      const data = await res.json();
      const reply = data.message || "Error: no response from server";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Server error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => e.key === "Enter" && sendMessage();

  const loadConversation = (id) => {
    const convo = conversations.find((c) => c.conversationId === id);
    if (!convo) return;
    setConversationId(id);
    setMessages(convo.messages);
  };

  const startNewConversation = () => {
    const newId = uuidv4();
    setConversationId(newId);
    setMessages([]);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#6b6b6b7d",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#ffffff9d",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <button
          onClick={startNewConversation}
          style={{
            marginBottom: "0.75rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "1rem",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          + New Chat
        </button>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((c) => (
            <div
              key={c.conversationId}
              onClick={() => loadConversation(c.conversationId)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                marginBottom: "0.25rem",
                cursor: "pointer",
                background:
                  c.conversationId === conversationId
                    ? "#007bff"
                    : "transparent",
                color: c.conversationId === conversationId ? "#fff" : "#333",
                fontSize: "0.9rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
              title={
                c.messages.find((m) => m.role === "user")?.content ||
                "Conversation"
              }
            >
              {c.messages
                .find((m) => m.role === "user")
                ?.content.slice(0, 25) || "Untitled"}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "0.75rem",
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "12px",
                    background:
                      msg.role === "user" ? "#007bff" : "rgba(0, 0, 0, 0.637)",
                    color: msg.role === "user" ? "#fff" : "#ffffff",
                    maxWidth: "90%",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  <ReactMarkdown
                    children={msg.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, children, ...props }) {
                        return !inline ? (
                          <pre
                            style={{
                              background: "#f6f8fa",
                              padding: "0.75rem",
                              borderRadius: "8px",
                              overflowX: "auto",
                            }}
                          >
                            <code>{children}</code>
                          </pre>
                        ) : (
                          <code
                            style={{
                              background: "#f6f8fa",
                              padding: "2px 4px",
                              borderRadius: "4px",
                              fontSize: "0.95em",
                              fontWeight: "bold",
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1,
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "0.5rem",
                outline: "none",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0 1rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
