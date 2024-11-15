import { Avatar } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { getMediaPath } from "../services/utils";
import useAuthStore from "../stores/useAuthStore";
import useRequestStore from "../stores/useRequestStore";
import MessageBox from "./chat/MessageBox";

const RequestsList = ({ requests, InfoCard, onClick }) => {
  const { selectRequest, selectedRequest } = useRequestStore();
  const { userData } = useAuthStore();

  const getSeenStatus = (request) => {
    if (!request) return false;
    const myKey = request.listedBy === userData.uid ? "lseen" : "rseen";
    return !request[myKey];
  };

  const getLatestMessage = (request) => {
    if (request.messages.length === 0) return null;
    const msg = request.messages[request.messages.length - 1];

    return `${msg.user_id === userData.uid ? "You: " : ""}${msg.message}`;
  };
  return (
    <div className="h-full overflow-y-auto">
      {requests.map((request) => (
        <div
          key={request._id}
          className={`cursor-pointer border-b border-gray-200 p-1 hover:bg-gray-50 ${
            selectedRequest?._id === request._id ? "bg-blue-50" : ""
          }`}
          onClick={() => {
            selectRequest(request._id);
            onClick();
          }}
        >
          <InfoCard
            request={request}
            latestMessage={getLatestMessage(request)}
            notSeen={getSeenStatus(request)}
          />
        </div>
      ))}
    </div>
  );
};

const DefaultPlaceHolder = () => {
  return (
    <div className="mt-10 flex flex-1 items-center justify-center p-5 text-gray-500">
      <p>Select a request to view messages</p>
    </div>
  );
};

const ChatSkeleton = ({
  allRequests,
  userInfoKey,

  InfoCard,
  ChatInputField,
  MessageBoxHeader,
  PlaceHolder = DefaultPlaceHolder,
}) => {
  const { selectedRequest } = useRequestStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { profilePicture, username, name } =
    selectedRequest?.[userInfoKey] || {};

  return (
    <div className="flex h-[85vh] flex-col">
      <div className="border-b border-gray-200 bg-white lg:hidden">
        {selectedRequest && !isSidebarOpen && (
          <div className="sticky flex items-center space-x-4 p-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-1 hover:bg-gray-100 active:bg-gray-200"
              aria-label="Open sidebar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar
                src={getMediaPath(profilePicture)}
                alt={name}
                className="h-8 w-8 shrink-0"
              />
              <NavLink to={`/u/${username}`} className="min-w-0 truncate">
                <h2 className="truncate text-sm font-semibold">{name}</h2>
              </NavLink>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 z-30 w-full bg-white transition-transform duration-300 ease-in-out lg:static lg:w-80 xl:w-96 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        >
          <div className="flex h-full flex-col border-r border-gray-200">
            <RequestsList
              requests={allRequests}
              InfoCard={InfoCard}
              userInfoKey={userInfoKey}
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>

        <div
          className={`flex h-full flex-1 flex-col bg-gray-50 transition-opacity duration-200 ${!isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"} `}
        >
          {selectedRequest ? (
            <div className="flex h-full flex-col">
              <div className="mt-[-1em] border-b border-gray-200 bg-white p-4 lg:block">
                <MessageBoxHeader request={selectedRequest} />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-3xl">
                  <MessageBox />
                </div>
              </div>

              <div className="border-t border-gray-200 bg-white p-4">
                <div className="mx-auto max-w-3xl">
                  <div className="flex items-center gap-3">
                    <ChatInputField />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <PlaceHolder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
