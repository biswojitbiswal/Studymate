"use client";

import LoadingScreen from "@/components/common/LoadingScreen";
import { useConversations } from "@/hooks/public/useChat";


function formatTime(date) {
  if (!date) return "";

  const d = new Date(date);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  if (isToday) {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("en-IN");
}

export default function ConversationList({ onSelect, selectedId }) {
  const { data, isLoading } = useConversations();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="overflow-y-auto h-full">

      {data?.data?.map((conv) => {
        const user = conv.participants?.[0]?.user;

        return (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`flex gap-3 p-3 border-b cursor-pointer hover:bg-blue-50 ${selectedId === conv.id ? "bg-blue-100" : ""
              }`}
          >
            {/* Avatar */}
            <img
              src={
                conv.type === "GROUP"
                  ? conv.groupImage
                  : user?.avatar || "/avatar.png"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">

              {/* Top Row */}
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800 truncate">
                  {conv.type === "GROUP" ? conv.classTitle : user?.name}
                </p>

                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatTime(conv.lastMessage?.createdAt)}
                </span>
              </div>

              {/* Bottom Row */}
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage?.content || "Start conversation 👋"}
              </p>
            </div>
          </div>
        );
      })}

    </div>
  );
}