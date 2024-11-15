import { useEffect, useState } from "react";

import useRequestStore from "../../stores/useRequestStore";
import ChatSkeleton from "../ChatSkeleton";
import MessageInput from "../chat/MessageInput";
import SendAgreement from "../chat/SendAgreement";
import RequestHeader from "./RequestHeader";
import RequestState from "./RequestState";
import RequesterInfoCard from "./RequesterInfoCard";

const InputField = () => {
  return (
    <RequestState blockPending={false}>
      <SendAgreement />
      <MessageInput />
    </RequestState>
  );
};

const PropertyRequests = ({ property }) => {
  const { getRequestsArray, modifiedSwitch } = useRequestStore();

  const [requestsList, setRequests] = useState([]);
  useEffect(() => {
    setRequests(
      getRequestsArray({
        key: "propertyId",
        value: property._id,
      })
    );
  }, [modifiedSwitch[0]]);

  return (
    <div className="relative rounded-lg bg-white shadow-lg">
      <div className="sticky top-0 z-10 block border-b border-gray-200 bg-white p-4">
        <div className="flex items-center justify-start">
          <h2 className="text-xl font-bold">Property Requests</h2>
        </div>
      </div>

      {requestsList.length === 0 ? (
        <h6 className="ml-5 p-4 capitalize">
          You got no requests for this property
        </h6>
      ) : (
        <ChatSkeleton
          allRequests={requestsList}
          userInfoKey={"requesterId"}
          InfoCard={RequesterInfoCard}
          ChatInputField={InputField}
          MessageBoxHeader={RequestHeader}
        />
      )}
    </div>
  );
};

export default PropertyRequests;
