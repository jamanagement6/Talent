import { useState } from "react";

import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userFetchService } from "../BackendServices/userFetchServices";
import Loader from "../Components/Loader";

export default function ForgotPassword() {
  const userfetches = new userFetchService();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [inputType, setInputType] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getOTP = async () => {
    setLoading(true);
    if (!formData.email) {
      alert("Please enter your email address");
      setLoading(false);
      return;
    }
    const otpres = await userfetches.CreateOTP(formData);
    alert(otpres.message);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setMessage("");
    if (formData.confirmPassword != formData.newPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!formData.otp) {
      alert("Please provide the otp sent to your mailbox");
      return;
    }

    try {
      setLoading(true);
      const response = await userfetches.ChangePassword(formData);
      setMessage(response.message || "Password reset successful.");
      setFormData({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
      if (response.status == 200) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {message && <p className="text-center text-red-500 mb-2">{message}</p>}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type={inputType ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type={inputType ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex flex-row gap-8">
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-row items-center">
              {loading ? (
                "..."
              ) : (
                <IoReload
                  onClick={getOTP}
                  className={`${loading ? "hidden" : "text-blue-700"}`}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 w-1/2">
            <input
              type="checkbox"
              checked={inputType}
              className="text-blue-300 text-3xl"
              onChange={() => setInputType((prev) => !prev)}
            />
            <h3>Show password</h3>
          </div>
          <button
            // type="submit"
            onClick={handleSubmit}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
        <Loader isLoading={loading} />
      </div>
    </div>
  );
}
