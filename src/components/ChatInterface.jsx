import React, { useState, useEffect, useRef } from "react";
import { Send, Key, Loader2, Settings, LogOut } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useApiKey } from "../hooks/useApi";


const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey, clearApiKey] = useApiKey();
  const [tempApiKey, setTempApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    setApiKey(tempApiKey);
    setTempApiKey("");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulated API response - replace with actual API call
      const apiResponse = await axios({
        url:
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
          apiKey,
        method: "POST",
        data: {
          contents: [{ parts: [{ text: userMessage.content+" give response in html format inside div" }] }],
        },
      });

      const responseText = apiResponse?.data?.candidates[0]?.content?.parts[0]?.text.replaceAll("```","").replace("html","");

      console.log(responseText);
      const response = {
        role: "assistant",
        content: responseText,
        timestamp: new Date().toISOString(),
      }

      // const response = await new Promise((resolve) =>
      //   setTimeout(
      //     () =>
      //       resolve({
      //         role: "assistant",
      //         content: `This is a simulated response. In a real implementation, you would make an API call using the stored API key: ${apiKey.substring(
      //           0,
      //           4
      //         )}...`,
      //         timestamp: new Date().toISOString(),
      //       }),
      //     1000
      //   )
      // );



      setMessages((prev) => [...prev, response]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, there was an error processing your message.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-purple-500 border-b">
        <div className="min-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Chat</h1>
          {apiKey && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings className="w-6 h-6 text-gray-300" />
            </button>
          )}
        </div>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg border p-4 w-64">
            <div className="flex justify-end">
              <FaTimes size={20} className="text-gray-500" onClick={() => setShowSettings(!showSettings)}/>
            </div>
            <button
              onClick={() => {
                clearApiKey();
                setShowSettings(false);
              }}
              className="flex items-center space-x-2 text-red-600 hover:bg-red-50 w-full p-2 rounded"
            >
              <LogOut className="w-4 h-4" />
              <span>Remove API Key</span>
            </button>
          </div>
        )}
      </header>

      <div className="md:w-[600px] h-[400px] mx-auto flex flex-col">
        {/* API Key Input */}
        {!apiKey && (
          <div className="m-4 p-6">
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="apiKey"
                  className="text-sm font-medium text-gray-700"
                >
                  Enter your Gemini API Key to start chatting
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="password"
                    id="apiKey"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    className="text-gray-900 flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your API key"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2 sm:w-auto w-full"
                  >
                    <Key className="w-4 h-4" />
                    <span>Save Key</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Chat Messages */}
        {apiKey && (
          <div
            ref={chatContainerRef}
            className="flex-1 mx-4 bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-rose-300 text-white"
                          : message.role === "system"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="text-sm sm:text-base" dangerouslySetInnerHTML={{ __html:message.content}}></div>
                      <span className="text-xs opacity-75 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t bg-gray-50 sticky bottom-0"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 sm:w-auto w-full"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
