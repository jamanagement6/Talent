import HttpGetCallerWhole, { HttpOTHERcaller } from ".";
import { apiCalls, IGigToCreate, IHireTalentToAds, IMerchantAd } from "../types";

export class AdsFetches {
  constructor() {}
  userPerson: {
    token: string;
  } = JSON.parse(localStorage.getItem("user") as string) ?? {
    token: "",
  };

  CreateAds = async (load: IGigToCreate): Promise<apiCalls> => {
    console.log(`verify load`, load);
    const res = await HttpOTHERcaller(
      `ads/create-ad`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "POST",
      load
    );

    return res;
  };

  GetAllAvailableAds = async (): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole("ads/all", {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userPerson.token}`,
    });

    return res;
  };

  getUserAds = async (): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole(`ads/user`, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userPerson.token}`,
    });
    return res;
  };

  getAdsById = async (id: string): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole(`ads/${id}`, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userPerson.token}`,
    });
    return res;
  };

  DeleteAds = async (id: string): Promise<apiCalls> => {
    const res = await HttpOTHERcaller(
      `ads/${id}`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "DELETE",
      {}
    );

    return res;
  };

  UpdateAds = async (load: IMerchantAd): Promise<apiCalls> => {
    const res = await HttpOTHERcaller(
      `ads/update-ad/${load.id}`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "PUT",
      load
    );

    return res;
  };

  ApplyToAds = async (gigId: string): Promise<apiCalls> => {
    const res = await HttpOTHERcaller(
      `ads/apply/${gigId}`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "POST",
      {}
    );

    return res;
  };

  HireTablentToAds = async (load: IHireTalentToAds): Promise<apiCalls> => {
    const res = await HttpOTHERcaller(
      `ads/hire`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userPerson.token}`,
      },
      "PUT",
      load
    );
    return res;
  };
}
