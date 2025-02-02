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
import { useFetch, usePost } from "../hooks/useApi";

// Sample topics data - in a real app, this would come from a backend
const topics = prompt_data["topics"];

const LearningWindow = () => {
  const { loading, error, postData } = usePost();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [unlockedTopics, setUnlockedTopics] = useState([0]);
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);

  const handleNext = () => {
    if (reflection.length >= 10) {
      setUnlockedTopics([...unlockedTopics, currentTopic + 1]);
      setCurrentTopic(currentTopic + 1);
      setReflection("");
      setShowReflection(false);
    }
  };

  const handlePrevious = () => {
    if (currentTopic > 0) {
      setCurrentTopic(currentTopic - 1);
      setReflection("");
      setShowReflection(false);
    }
  };

  const handleTopicClick = (index) => {
    if (unlockedTopics.includes(index)) {
      setCurrentTopic(index);
      setShowReflection(false);
      let url ="";
      let data = {
        contents: [{ parts: [{ text: topics.ai_prompt }] }],
      };
      const response = postData(url, data);

      console.log(response);
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
                  key={topic.id}
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
                  <p className="text-lg mb-6">
                    {loading && "Generating Data"}

                    {error &&
                      "Something went wrong! error while generating response"}
                    {topics[currentTopic].content &&
                      topics[currentTopic].content}
                  </p>
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

                  {/* <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Write your thoughts here... (at least 10 characters)"
                    className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {reflection.length < 10 && (
                    <p className="text-orange-500 mt-2">
                      Write a bit more to unlock the next topic!
                    </p>
                  )} */}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t">
                {/* <button
                  onClick={handlePrevious}
                  disabled={currentTopic === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    currentTopic === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button> */}
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
                        : "bg-blue-500 text-white hover:bg-blue-600"
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
