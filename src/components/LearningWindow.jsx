import React, { useLayoutEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle,
  PenTool,
} from "lucide-react";
import prompt_data from "../utils/prompts";
import axios from "axios";
import { useApiKey } from "../hooks/useApi";
// import { useFetch, usePost } from "../hooks/useApi";

// Sample topics data - in a real app, this would come from a backend
const topics = prompt_data["topics"];

const LearningWindow = () => {
//   const { loading, error, postData } = usePost();
  const [currentTopic, setCurrentTopic] = useState(0);

  const [unlockedTopics, setUnlockedTopics] = useState([0]);
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [apiKey, setApiKey, clearApiKey] = useApiKey();

  const handleNext = () => {
    if (reflection.length >= 10) {
      setUnlockedTopics([...unlockedTopics, currentTopic + 1]);
      setCurrentTopic(currentTopic + 1);
      setReflection("");
      setShowReflection(false);
    }
  };

  const handleTopicClick = async(index) => {
    // const apiKey = import.meta.env.VITE_GEMINI_KEY;
    if (unlockedTopics.includes(index)) {
      setCurrentTopic(index);
      setShowReflection(false);

      try {
        const response = await axios({
          url:
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
            apiKey,
          method: "POST",
          data: {
            contents: [{ parts: [{ text: topics[index].ai_prompt }] }],
          },
        });
  
        const responseText = response?.data?.candidates[0]?.content?.parts[0]?.text.replaceAll("```","").replace("html","");
        topics[index].content = responseText;
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  useLayoutEffect(() => {handleTopicClick(0)}, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-4 min-h-[600px]">
          {/* Topics List - Left Side */}
          <div className=" p-4 border-r">
            <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Learning Topics
            </h2>
            <div className="space-y-2">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicClick(index)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-2 transition-all ${
                    unlockedTopics.includes(index)
                      ? "hover:bg-purple-600 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  } ${
                    currentTopic === index ? "bg-purple-500" : "bg-gray-400"
                  }`}
                >
                  {unlockedTopics.includes(index) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                  <span className="font-bold">{topic.topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="md:col-span-2 p-6">
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold text-blue-400 mb-4">
                {topics[currentTopic].topic}
              </h1>

              {!showReflection ? (
                <div className="flex-grow">
                  <div dangerouslySetInnerHTML={{ __html: topics[currentTopic].content }} className="mb-4 fond-bold" />
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                    <p className="text-yellow-800 font-medium">
                      {topics[currentTopic].fun_fact}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-grow">
                  {topics[currentTopic].quiz.questions.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2 mb-5">
                        <p className="text-xl mb-2 font-bold">
                          {item.question}
                        </p>

                        <p className="flex justify-start items-center gap-3 bg-white text-gray-700 p-2 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name={"question" + index}
                            id=""
                            className="cursor-pointer"
                          />
                          {item.options[0]}
                        </p>

                        <p className="flex justify-start items-center gap-3 bg-white text-gray-700 p-2 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name={"question" + index}
                            className="cursor-pointer"
                            id=""
                          />
                          {item.options[1]}
                        </p>

                        <p className="flex justify-start items-center gap-3 bg-white text-gray-700 p-2 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name={"question" + index}
                            className="cursor-pointer"
                            id=""
                          />
                          {item.options[2]}
                        </p>

                        <p className="flex justify-start items-center gap-3 bg-white text-gray-700 p-2 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name={"question" + index}
                            className="cursor-pointer"
                            id=""
                          />
                          {item.options[3]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-end mt-6 pt-4 border-t">

                {!showReflection && (
                  <button
                    onClick={() => setShowReflection(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <PenTool className="w-5 h-5" />
                    I'm Ready to Reflect!
                  </button>
                )}

                {showReflection && (
                  <button
                    onClick={handleNext}
                    disabled={
                      reflection.length < 10 ||
                      currentTopic === topics.length - 1
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      reflection.length < 10 ||
                      currentTopic === topics.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningWindow;
