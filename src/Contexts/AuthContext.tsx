import { createContext, useState, useEffect, ReactNode } from "react";
import { FullUserDetails, LoggedInRes } from "../types";
import { userFetchService } from "../BackendServices/userFetchServices";

// Define AuthContext Type
export interface AuthContextType {
  user: LoggedInRes | null;
  fulluser: FullUserDetails | null;
  isLoggedIn: boolean;
  Login: (data: { email: string; password: string }) => Promise<any>;
  Logout: () => void;
}

// Create Context with Default Value
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userAuths: LoggedInRes | null = JSON.parse(
    localStorage.getItem("user") as string
  );
  const userFullDetails: FullUserDetails | null = JSON.parse(
    localStorage.getItem("fud") as string
  );

  const userfetches = new userFetchService();
  const [user, setUser] = useState<LoggedInRes | null>(userAuths);
  const [fulluser, setFullUser] = useState<FullUserDetails | null>(
    userFullDetails
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!userAuths);

  useEffect(() => {
    // console.log({
    //   userAuths,
    //   user,
    //   userFullDetails,
    //   fulluser,
    // });
    if (!fulluser) {
      onFetchUser();
    }
  }, [user]);

  const onFetchUser = async () => {
    const { status, message } = await userfetches.getUser();
    // console.log({status, message});
    if (status === 200) {
      localStorage.setItem("fud", JSON.stringify(message));
      const { id } = user as LoggedInRes;
      setUser({ ...message, id });
      setFullUser(message);
    }
  };

  const Login = async (data: { email: string; password: string }) => {
    try {
      const createdUser = await userfetches.Login(data);
      if (createdUser.status === 200) {
        const newUser: LoggedInRes = {
          token: createdUser.token || "",
          id: createdUser.id || "",
          user_verified: createdUser.user_verified || false,
          email: data.email || "",
          token2: createdUser.token2 || "",
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        setIsLoggedIn(true);
        await onFetchUser()
        return createdUser;
      } else {
        alert(createdUser.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred while logging in.");
    }
  };

  // Logout function
  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("fud");
    setUser(null);
    setFullUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, fulluser, isLoggedIn, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
