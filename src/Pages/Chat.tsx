import { useEffect, useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  AdStatus,

  IMerchantAd,
  MilestoneStatus,
  Remuneration,
  WorkMode,
} from "../types";
import { JobDetails } from "./JobDetails";
import { FaX } from "react-icons/fa6";
import { AdsFetches } from "../BackendServices/adsFetchServices";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  type?: "text" | "file";
  file?: File | null;
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "Can you tell me about your services?", sender: "user" },
  ]);

  const [currentChat, setCurrentChat] = useState<IMerchantAd>({
    id: "",
    userId: "",
    creatorName: "",
    country: "",
    state: "",
    city: "",
    status: AdStatus.Available,
    title: "",
    description: "",
    by: "",
    workmode: WorkMode.Hybrid,
    remuneration: Remuneration.Commission,
    amount: 0,
    image: "",
    eligibility: "",
    applied_talent: [""],
    hired_talent: "",
    milestones: [
      {
        amount: 0,
        description: "",
        status: MilestoneStatus.Approved,
        title: "",
      },
    ],
    created_at: "",
    updated_at: "",
  });
  const [input, setInput] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isVisisble, setIsVisisble] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("chat-id");

  const getCurrentOrder = async () => {
    const adsfetches = new AdsFetches();
    const order = await adsfetches.getAdsById(id as string);
    // console.log(`current order`, order);
    setCurrentChat(order.data);
  };
  useEffect(() => {
    getCurrentOrder();
  }, [id]);

  const handleSend = () => {
    if (input.trim() || attachedFile) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: "user",
        file: attachedFile,
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setAttachedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  // useEffect(() => {
  //   const newMessage: Message = {
  //     id: Date.now(),
  //     text: input,
  //     sender: "user",
  //     file: attachedFile,
  //   };
  //   console.log(newMessage);
  // }, [input, attachedFile]);

  const [isOpenViewGig, SetIsOpenViewGig] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {isOpenViewGig && (
        <div className="bg-white fixed transform -translate-x-0 top-0 w-full h-screen overflow-auto z-20 justify-center">
          <JobDetails SetIsOpenViewGig={SetIsOpenViewGig} Gig={currentChat} />
        </div>
      )}
      {/* Header */}
      <div
        onClick={() => SetIsOpenViewGig((prev) => !prev)}
        className="bg-gradient-to-r from-blue-400 to-blue-800 text-white text-xl font-semibold p-4 flex items-center justify-between"
      >
        <span className="text-2xl font-extrabold text-white cursor-pointer hover:text-slate-800 transition">
          <PiCaretLeft />
        </span>
        <span>
          <h3 className="font-semibold text-3xl text-white">
            {currentChat.title.slice(0, 15)}...
          </h3>
        </span>
        <span>Chat</span>

        <span>
          <FaX
            onClick={() => navigate("/home")}
            className="text-2xl text-red-600"
          />
        </span>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gradient-to-b from-blue-500 to-blue-300 ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex z-10 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[75%] flex flex-col p-3 rounded-lg text-white ${
                message.sender === "user"
                  ? "bg-blue-900"
                  : "bg-yellow-800 text-white"
              }`}
            >
              {message.file && (
                <a
                  href={URL.createObjectURL(message.file!)}
                  download={message.text}
                  className="text-blue-200"
                >
                  {/* Preview for Images */}
                  {message.file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(message.file!)}
                      alt={message.file.name}
                      className="max-w-[150px] max-h-[150px] object-cover rounded-lg"
                    />
                  )}

                  {/* Preview for PDFs or other Documents */}
                  {message.file.type === "application/pdf" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">📄</span>
                      <span>{message.file.name}</span>
                    </div>
                  )}

                  {/* For Other File Types (e.g., .docx, .txt, etc.) */}
                  {message.file &&
                    !message.file.type.startsWith("image/") &&
                    message.file.type !== "application/pdf" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">📎</span>
                        <span>{message.file.name}</span>
                      </div>
                    )}
                </a>
              )}

              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="z-5">
        {isVisisble && (
          <input type="file" className="" onChange={handleFileChange} />
        )}

        <div className="bg-white p-4 flex items-center">
          <div>
            <label className="cursor-pointer text-gray-500 hover:text-blue-500">
              <FiPaperclip
                size={24}
                onClick={() => setIsVisisble((prev) => !prev)}
              /> 
            </label>
          </div>
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-4"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={() => {
              handleSend();
              setIsVisisble((prev) => !prev);
            }}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
