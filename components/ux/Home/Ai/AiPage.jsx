import { Bot } from "lucide-react";

export default function AiPage() {
  return (
    <div className="fixed bottom-20 right-6 z-50">
      <button
        className="relative w-20 h-20 rounded-full shadow-lg flex items-center justify-center"
      >
        <Bot size={50} />

        <span className="absolute top-2 right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
      </button>
    </div>
  );
}
