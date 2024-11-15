import { TextField, Tooltip } from "@mui/material";

import PasswordInput from "./frags/PasswordInput";

const AuthForm = ({
  formData,
  setFormData,
  handleSubmit,
  name,
  altMsg,
  altPath,
  loading,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">{name}</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {typeof formData.firstName === "string" && (
          <>
            <TextField
              variant="outlined"
              type="text"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              className="bg-white"
            />

            <TextField
              variant="outlined"
              type="text"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              className="bg-white"
            />
            <Tooltip
              title="I ain't doing email OTP verification for this."
              arrow
            >
              <TextField
                variant="outlined"
                type="password"
                name="passphrase"
                label="Pass Phrase"
                required
                value={formData.passphrase}
                onChange={handleChange}
                fullWidth
                className="bg-white"
              />
            </Tooltip>
          </>
        )}

        <TextField
          variant="outlined"
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          className="bg-white"
        />

        <PasswordInput onChange={handleChange} value={formData.password} />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600"
          disabled={loading}
        >
          {name}
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        {`${altMsg} `}
        <a
          href={`/${altPath}`}
          className="capitalize text-blue-500 hover:underline"
        >
          {altPath}!
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
