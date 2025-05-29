import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { GoEyeClosed } from "react-icons/go";
import { carouselsImages } from "../../constants/constants";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { Login } = useContext(AuthContext) as unknown as AuthContextType;
  const [currentIndex, _] = useState(0);

  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onLogin = async () => {
    setLoading(true);
    const loginAction = await Login(formData);
    if (loginAction.user_verified) {
      navigate("/home");
    } else {
      navigate(`/verify/${loginAction.token2}`);
    }
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col  justify-center h-screen text-center bg-gray-100 overflow-hidden">
      <div className="inset-0 w-full h-full">
        {carouselsImages.map(({ img }, index) => (
          <img
            src={img}
            key={index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute p-5 w-screen">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <div className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-2 border rounded"
            onChange={onHandleChange}
          />
          <div className="flex flex-row justify-between items-center">
            <input
              name="password"
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="p-2 border rounded w-[90%]"
              onChange={onHandleChange}
            />
            <GoEyeClosed onClick={() => setViewPassword((prev) => !prev)} />
          </div>
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <p className="mt-4 text-sm text-white ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-200">
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-sm ">
            <Link to="/forgot-password" className="text-blue-200">
              forgot password?
            </Link>
          </p>
        </div>
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default LoginPage;

// const userService = new userFetchService();
// const createdUser = await userService.Login({
//   ...formData,
// });
// console.log(`Loggin in user==>`, createdUser);
// if (createdUser.status === 200) {
//   let user: LoggedInRes;
//   alert(createdUser.message);
//   if (createdUser.user_verified) {
//     user = {
//       token: createdUser?.token || "",
//       id: createdUser?.id || "",
//       user_verified: createdUser?.user_verified || false,
//       email: formData.email || "",
//       token2: createdUser?.token2 || "",
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate("/home");
//   } else if (!createdUser.user_verified) {
//     user = {
//       token: createdUser?.token || "",
//       id: createdUser?.id || "",
//       user_verified: createdUser?.user_verified || false,
//       email: formData.email || "",
//       token2: createdUser?.token2 || "",
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate(`/verify/${createdUser.token2}`);
//   } else {
//     setLoading(false);
//     return;
//   }
// } else {
//   alert(createdUser.message);
//   setLoading(false);
//   return;
// }
