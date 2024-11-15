import { format, isSameDay, isToday, isYesterday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

import useGetMessages from "../../hooks/chat/useGetMessages";
import useAuthStore from "../../stores/useAuthStore";
import useRequestStore from "../../stores/useRequestStore";
import useSocketStore from "../../stores/useSocketStore";
import Agreement from "./Agreement";
import Contract from "./Contract";

function formatDate(date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "EEEE, MMMM d, yyyy");
  }
}

const TextMsg = ({ message }) => {
  return <p className="break-words text-sm">{message.message}</p>;
};

const MessageBox = () => {
  const { socket } = useSocketStore();
  const messageEndRef = useRef(null);
  const { fetchMessages } = useGetMessages();
  const { selectedRequest, updateRequests } = useRequestStore();
  const { userData } = useAuthStore();
  const userId = userData.uid;
  const msgCount = selectedRequest?.messages?.length || 0;

  const [seenf, setSeenF] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    fetchMessages();
    setSeenF(selectedRequest.listedBy === userId ? "lseen" : "rseen");
    setReceiverId(
      selectedRequest.listedBy === userId
        ? selectedRequest.requesterId
        : selectedRequest.listedBy
    );
  }, [selectedRequest]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (selectedRequest && !selectedRequest[seenf]) {
      socket.emit("updateSeenStatus", {
        requestId: selectedRequest._id,
        seenf,
        receiverId,
      });
      updateRequests({ _id: selectedRequest._id, [seenf]: true });
    }
  }, [msgCount]);

  const getMessageStyle = (messageUserId) => {
    if (!messageUserId) {
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
    return messageUserId === userId
      ? "bg-blue-500 text-white"
      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {selectedRequest.messages?.map((msg, idx) => {
        const currentMessageDate = new Date(msg.timestamp);
        const previousMessageDate =
          idx > 0
            ? new Date(selectedRequest.messages[idx - 1].timestamp)
            : null;
        const showDateSeparator =
          !previousMessageDate ||
          !isSameDay(currentMessageDate, previousMessageDate);

        return (
          <div key={idx} className="space-y-4">
            {showDateSeparator && (
              <div className="flex items-center space-x-4 py-2">
                <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {formatDate(currentMessageDate)}
                </span>
                <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600" />
              </div>
            )}

            <div
              className={`flex ${
                !msg.user_id
                  ? "justify-center"
                  : msg.user_id === userId
                    ? "justify-end"
                    : "justify-start"
              }`}
            >
              <div
                className={`group relative ${
                  !msg.user_id
                    ? "mx-auto w-full max-w-2xl"
                    : "max-w-[85%] lg:max-w-[70%]"
                }`}
              >
                {!msg.user_id ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-2 rounded-lg bg-gray-300 p-1 px-2">
                      {msg.type === "txt" && <TextMsg message={msg} />}
                      {msg.type === "agg" && (
                        <Agreement message={msg} userId={userId} />
                      )}
                      {msg.type === "con" && <Contract message={msg} />}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-lg p-3 ${getMessageStyle(msg.user_id)}`}
                  >
                    <div className="space-y-1">
                      {msg.type === "txt" && <TextMsg message={msg} />}
                      {msg.type === "agg" && (
                        <Agreement message={msg} userId={userId} />
                      )}
                      {msg.type === "con" && <Contract message={msg} />}
                    </div>
                    <span
                      className={`mt-1 block text-xs ${
                        msg.user_id === userId
                          ? "text-white/75"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {currentMessageDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
