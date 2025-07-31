import Lottie from "lottie-react";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import chatbotIcon from "../../../assets/animations/chatBot.json";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

interface Chat {
  message: string;
  isOutgoing: boolean;
  isError?: boolean;
}

export default function Chatbot() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [excelData, setExcelData] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const loadExcelData = async () => {
      try {
        const response = await fetch("/data/data.xlsx");
        console.log("response tin nhắn: ", response);
        const arrayBuffer = await response.arrayBuffer();
        console.log("response tin nhắn 1: ", arrayBuffer);
        const data = new Uint8Array(arrayBuffer);
        console.log("response tin nhắn 2: ", data);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        });

        const stringifiedRows = rows
          .filter((row) => row.length > 0)
          .map((row) => row.join(" | ")); // Ví dụ: ["Tên | Giá", "Gối | 450k", ...]

        setExcelData(stringifiedRows);
      } catch (error) {
        console.error("Lỗi đọc file Excel:", error);
      }
    };

    loadExcelData();
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isChatbotOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatbotOpen]);

  // 1. Load lại chat từ localStorage (gộp lại duy nhất)
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setChatMessages(parsed);
      } else {
        setChatMessages([
          {
            message: t("chatbot.messenger"),

            isOutgoing: false,
          },
        ]);
      }
    } else {
      // Nếu chưa từng lưu gì
      const welcomeMessage = [
        {
          message: t("chatbot.messenger"),
          isOutgoing: false,
        },
      ];
      setChatMessages(welcomeMessage);
      localStorage.setItem("chat_history", JSON.stringify(welcomeMessage));
    }
  }, [t]);

  // 2. Lưu lại khi chatMessages thay đổi
  useEffect(() => {
    const trimmed = chatMessages.slice(-50);
    localStorage.setItem("chat_history", JSON.stringify(trimmed));
  }, [chatMessages]);

  const showWelcomeMessage = () => {
    const welcomeMessage = [
      {
        message: t("chatbot.messenger"),
        isOutgoing: false,
      },
    ];
    setChatMessages(welcomeMessage);
    localStorage.setItem("chat_history", JSON.stringify(welcomeMessage));
  };

  const handleChat = async () => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Chat = { message: userMessage, isOutgoing: true };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserMessage("");
    setIsLoading(true);

    try {
      // 🔍 Tìm dòng Excel liên quan
      const keyword = userMessage.toLowerCase();
      const matched = excelData.filter((line) =>
        line.toLowerCase().includes(keyword)
      );

      const MAX_ROWS = 200;
      const context = matched.length
        ? `Dưới đây là ${Math.min(
            matched.length,
            MAX_ROWS
          )} dòng dữ liệu phù hợp từ bảng tính Excel:\n${matched
            .slice(0, MAX_ROWS)
            .join("\n")}`
        : `Không tìm thấy dữ liệu khớp trực tiếp, bạn có thể tham khảo ${Math.min(
            excelData.length,
            MAX_ROWS
          )} dòng dữ liệu đầu tiên:\n${excelData
            .slice(0, MAX_ROWS)
            .join("\n")}`;
      console.log("Check text: ", context);

      // const promptToSend = `You are an AI assistant responding to user questions based on the data from the Excel spreadsheet below.
      // ${context}

      // Please provide the most appropriate answer to the question: "${userMessage}".
      // If a direct answer cannot be found in the matching rows, use general information from the provided Excel data to generate a helpful response.
      // Only reply with "No relevant data found in the spreadsheet." if there is absolutely no related information in the entire dataset.
      // Do not mention access or the Excel spreadsheet in your response.`;
      const promptToSend = `Bạn là một trợ lý AI trả lời các câu hỏi của người dùng dựa trên dữ liệu từ bảng tính Excel dưới đây.
      ${context}

      Vui lòng cung cấp câu trả lời phù hợp nhất cho câu hỏi: "${userMessage}".
      Nếu không tìm thấy câu trả lời trực tiếp trong các hàng phù hợp, hãy sử dụng thông tin chung từ dữ liệu Excel được cung cấp để đưa ra phản hồi hữu ích.
      Chỉ trả lời "Không tìm thấy dữ liệu liên quan trong bảng tính." nếu hoàn toàn không có thông tin liên quan trong toàn bộ tập dữ liệu.
      Không được đề cập đến quyền truy cập hoặc bảng tính Excel trong câu trả lời.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptToSend }] }],
          }),
        }
      );

      const data = await response.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Không có phản hồi từ Gemini.";

      setChatMessages((prev) => [
        ...prev,
        { message: botResponse, isOutgoing: false },
      ]);
    } catch (error) {
      console.log(error);
      setChatMessages((prev) => [
        ...prev,
        {
          message: "Lỗi khi kết nối đến Gemini API.",
          isOutgoing: false,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setIsChatbotOpen((prev) => !prev)}
        className="fixed bottom-20 md:bottom-20 right-3 z-50 w-18 h-18 rounded-full  bg-rose-400 shadow-xl hover:scale-105 transition-all duration-200 p-2"
        aria-label="Mở trợ lý ảo"
      >
        <Lottie
          animationData={chatbotIcon}
          loop={true}
          className="w-full h-full "
        />
      </button>

      {/* Chatbox */}
      <div
        className={`fixed bottom-40 md:bottom-40 right-5 w-[90vw] max-w-md h-[55vh] flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden z-40 transition-all duration-300 ${
          isChatbotOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
          <h2 className="md:text-xl font-semibold">
            <i className="fa-brands fa-reddit"></i> Trợ lý ảo Gemini
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="relative group inline-block">
              <button
                onClick={showWelcomeMessage}
                className="hover:text-gray-200 hover:bg-rose-500 text-xl font-boldx-1  rounded-[5px] hover:shadow py-2 px-3"
              >
                <i className="fa-solid fa-broom"></i>
              </button>

              <div className="mt-1 absolute top-full mb-2 w-max -right-19 -translate-x-1/2 bg-rose-500 text-white text-sm px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Xóa lịch sử chat
              </div>
            </div>
            <div className="relative group inline-block">
              <button
                onClick={() => setIsChatbotOpen(false)}
                className="hover:text-gray-200 hover:bg-rose-500 text-xl font-bold rounded-[5px] hover:shadow py-2 px-3"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="mt-1 absolute top-full mb-2 w-max -right-19 -translate-x-1/2 bg-rose-500 text-white text-sm px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Đóng khung chat
              </div>
            </div>
          </div>
        </div>

        {/* Chat content */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
        >
          {chatMessages.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.isOutgoing ? "justify-end" : "justify-start"
              }`}
            >
              {!chat.isOutgoing && (
                <div className="mr-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">
                    G
                  </div>
                </div>
              )}
              <div
                className={`text-sm px-4 py-2 whitespace-pre-line break-words leading-relaxed rounded-xl shadow max-w-[75%] ${
                  chat.isOutgoing
                    ? "bg-rose-500 text-white rounded-br-none"
                    : chat.isError
                    ? "bg-rose-100 text-red-700 rounded-bl-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
                dangerouslySetInnerHTML={{ __html: chat.message }}
              />
            </div>
          ))}

          {/* Typing animation */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 animate-pulse">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t p-3 bg-white">
          <textarea
            ref={inputRef}
            rows={1}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 resize-none border rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            onClick={handleChat}
            disabled={!userMessage.trim() || isLoading}
            className={`p-2 rounded-full text-white bg-rose-400 hover:bg-red-700 transition ${
              (!userMessage.trim() || isLoading) &&
              "opacity-80 cursor-not-allowed"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
