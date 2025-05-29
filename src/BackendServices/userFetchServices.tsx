import HttpGetCallerWhole, { HttpOTHERcaller } from ".";
import { apiCalls, ChangePassword, CreateOTP, createUser, LoggedInRes, Login, VerifyOTP } from "../types";

export class userFetchService{
    userPerson: {
        token: string;
      } = JSON.parse(localStorage.getItem("user") as string) ?? {
        token: "",
      };


    getAllusers = async (): Promise<apiCalls> => {
        const res = await HttpGetCallerWhole("users", {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userPerson.token}`,
        });
    
        return res;
      };
    
      getUser = async (): Promise<apiCalls> => {
        const res = await HttpGetCallerWhole(`user`, {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userPerson.token}`,
        });
    
        return res;
      };

      signUp = async (load: createUser): Promise<apiCalls> => {
        // console.log(`create user load`, load);
        const res = await HttpOTHERcaller(
          `signup`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          "POST",
          load
        );
    
        return res;
      };

      Login = async (load: Login): Promise<LoggedInRes> => {
        // console.log(`login`, load);
        const res = await HttpOTHERcaller(
          `login`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          "POST",
          load
        );
    
        return res;
      };
      CreateOTP = async (load: CreateOTP): Promise<apiCalls> => {
        // console.log(`create user load`, load);
        const res = await HttpOTHERcaller(
          `otp/create`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };

      VerifyOTP = async (load: VerifyOTP): Promise<apiCalls> => {
        console.log(`verify load`, load);
        const res = await HttpOTHERcaller(
          `otp/verify-otp`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };

      ChangePassword = async (load: ChangePassword): Promise<apiCalls> => {
        const res = await HttpOTHERcaller(
          `change-password`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.userPerson.token}`,
          },
          "POST",
          load
        );
    
        return res;
      };
}