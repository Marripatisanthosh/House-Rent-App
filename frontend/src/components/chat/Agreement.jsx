import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import {
  Ban,
  CheckCircle,
  Handshake,
  CreditCard as Payment,
} from "lucide-react";
import { useState } from "react";

import useRespondToAgreement from "../../hooks/chat/useRespondToAgreement";
import PasswordInput from "../frags/PasswordInput";

const Agreement = ({ message, userId }) => {
  const { loading, respondToAgreement } = useRespondToAgreement();
  const { agreement } = message;
  const disableInput = userId === message.user_id;
  const [upiId, setUpiId] = useState("");
  const [pin, setUpiPin] = useState("");

  const handlePinInput = (e) => {
    const { value } = e.target;
    if (/^\d{0,12}$/.test(value)) {
      setUpiPin(value);
    }
  };

  const handleChange = async (click) => {
    if (disableInput) return;
    await respondToAgreement({
      aggId: agreement._id,
      upiId,
      pin,
      click,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-[40vw]">
      <CardHeader
        title={
          <Typography variant="h6" className="flex items-center gap-2">
            <Handshake className="h-6 w-6" />
            Agreement
          </Typography>
        }
      ></CardHeader>
      <div className="ml-4 space-y-2">
        <p className="text-muted-foreground text-sm">
          ₹500 upfront to finalize the contract, with ₹500 off your first month.
        </p>
      </div>

      <CardContent className="space-y-6">
        <div className="space-y-4 border border-black p-3">
          <h4 className="text-sm font-medium leading-none">Contract Details</h4>

          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <span className="text-muted-foreground">Start Date:</span>
              <span>{new Date(agreement.startd).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <span className="text-muted-foreground">End Date:</span>
              <span>{new Date(agreement.endd).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <span className="text-muted-foreground">Monthly Rent:</span>
              <span>₹{agreement.rent}</span>
            </div>
          </div>

          {message.message && (
            <>
              <p>Note: </p>
              <div className="bg-muted ml-2 rounded-lg border border-black p-3">
                <p className="text-sm italic">{message.message}</p>
              </div>
            </>
          )}
        </div>

        {agreement.status === "open" && userId !== message.user_id && (
          <div className="space-y-4">
            <TextField
              placeholder="Enter UPI ID"
              value={upiId}
              label="UPI ID"
              onChange={(e) => setUpiId(e.target.value)}
              disabled={disableInput}
              required
              fullWidth
            />
            <PasswordInput
              type="password"
              label="UPI PIN"
              placeholder="Enter UPI PIN"
              value={pin}
              onChange={handlePinInput}
            />
          </div>
        )}
      </CardContent>

      {agreement.status === "open" && userId !== message.user_id && (
        <div className="grid grid-cols-1 justify-end gap-2 p-3 md:grid-cols-2">
          <Button
            variant="outline"
            onClick={() => handleChange("reject")}
            disabled={disableInput || loading}
          >
            <Ban className="mr-2 h-4 w-4" />
            Decline
          </Button>
          <Button
            onClick={() => handleChange("accept")}
            disabled={disableInput || loading}
          >
            <Payment className="mr-2 h-4 w-4" />
            Pay Now
          </Button>
        </div>
      )}

      {agreement.status === "rejected" && (
        <div className="gap-3 p-5">
          <p className="text-destructive flex items-center text-sm">
            <Ban className="mr-2 h-4 w-4" />
            This agreement was rejected by the user.
          </p>
        </div>
      )}

      {agreement.status === "accepted" && (
        <div className="gap-3 p-5">
          <p className="flex items-center text-sm text-primary">
            <CheckCircle className="mr-2 h-4 w-4" />
            Agreement accepted. Payment completed.
          </p>
        </div>
      )}
    </Card>
  );
};

export default Agreement;
