"use client";

import { apiClient } from "@/lib/apiClient";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

const page = () => {
  const [messages, setMessages] = useState<string[]>([""]);

  async function sendChatMessage(message: string): Promise<void> {
    try {
      const res = await apiClient.healthcheck.query({ message });
      setMessages((prev) => [...prev, res]);
    } catch (error) {
      if (error instanceof TRPCClientError) {
        console.error(error.data);
      }
    }
  }

  const [input, setInput] = useState("");
  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message}>{message}</div>
        ))}
      </div>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className="rounded-md border-2 border-gray-300 p-2"
      />
      <button
        type="button"
        onClick={() => sendChatMessage(input)}
        disabled={!input}
      >
        送信
      </button>
    </div>
  );
};

export default page;
