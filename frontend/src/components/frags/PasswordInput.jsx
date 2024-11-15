import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "",
  label = "",
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      required
      label={label}
      placeholder={placeholder}
      fullWidth
      className="bg-white"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-600" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
