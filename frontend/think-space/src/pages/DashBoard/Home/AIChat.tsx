import React, { useState } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

type Message = {
  variant: "received" | "sent";
  content: string;
  avatar?: string;
  isLoading?: boolean;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      variant: "sent",
      content: "Hello, how has your day been? I hope you are doing well.",
    },
    {
      variant: "received",
      content:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      avatar: "AI",
    },
    {
      variant: "received",
      content: "",
      isLoading: true,
      avatar: "AI",
    },
  ]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMessage: Message = {
      variant: "sent",
      content: "Your new message here",
    }; // Replace with actual input value
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <ChatMessageList className="flex-grow overflow-auto max-h-max">
        {messages.map((message, index) => (
          <ChatBubble key={index} variant={message.variant}>
            {message.avatar && <ChatBubbleAvatar fallback={message.avatar} />}
            <ChatBubbleMessage
              variant={message.variant}
              isLoading={message.isLoading}
            >
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
      </ChatMessageList>
      <form
        className="relative flex flex-row items-center justify-center gap-2 p-5 "
        onSubmit={handleSendMessage}
      >
        <ChatInput placeholder="Type your message here..." />
        <div className="flex items-center">
          <Button size="sm" className="ml-auto rounded-full" type="submit">
            <span>SEND</span>
            <ArrowUp className="size-4.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
