import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey =
    "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";
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...messages,
            userMessage,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.choices?.length > 0) {
        const botMessage = {
          role: "assistant",
          content: response.data.choices[0].message.content,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error" },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);

      if (error.response) {
        console.log("Error Response:", error.response);
        setError(
          error.response.data?.error?.message || "An unknown error occurred."
        );
      } else if (error.request) {
        console.log("Error Request:", error.request);
        setError("The request was made but no response was received.");
      } else {
        setError("Error setting up request: " + error.message);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hi, I'm there to help you" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="message bot">Typing...</div>}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="chatbot-send-btn"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

//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
