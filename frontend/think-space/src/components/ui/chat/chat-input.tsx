import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ChatInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = "auto"; // Reset the height
    target.style.height = `${target.scrollHeight}px`; // Set the height to the scroll height
  };

  return (
    <Textarea
      autoComplete="off"
      ref={ref}
      name="message"
      className={cn(
        "px-4 py-3 bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-sm flex items-center resize-none transition-height duration-200 ease-in-out",
        className
      )}
      style={{ minHeight: "3rem", maxHeight: "10rem", overflowY: "auto" }}
      onInput={handleInput}
      {...props}
    />
  );
});
ChatInput.displayName = "ChatInput";

export { ChatInput };
