import { useState } from "react";
import { SendIcon, Loader2 } from "lucide-react";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) return; // Prevent empty queries
    
    setIsLoading(true);
    
    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      
      if (!res.ok) throw new Error("API error");
      
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error fetching response. Make sure the API is running.");
      console.error("Chatbot API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendQuery();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-8">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-3">
          AI
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Medical Assistant</h1>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a medical question..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={sendQuery}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {response && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">AI Response:</p>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
      
      <div className="mt-6 text-xs text-gray-400 text-center">
        This AI assistant provides general information only and should not replace professional medical advice.
      </div>
    </div>
  );
};

export default Chatbot;