export interface IGigToEdit {
  index: string;
  title: string;
  description: string;
  by: string;
  mode: "Remote" | "On-site" | "Hybrid";
  pay: "Commission" | "Hourly" | "Fixed";
  amount: string;
  // mode: string;
  // pay: string;
  eligibility: string;
  image: string;
  date: Date;
  location: string;
}

export type apiCalls = {
  status: number;
  message: any;
  errors: [];
  others: any;
  data?: any;
};
export interface IGigToCreate {
  title: string;
  description: string;
  // by: string;
  workmode: "Remote" | "On-site" | "Hybrid";
  remuneration: "Commission" | "Hourly" | "Fixed";
  amount: number;
  eligibility: string;
  image: string;
  date: Date;
  // location: string;
}
export type CreateOTP = {
  email: string;
};

export type VerifyOTP = {
  token2?: string;
  email: string;
  otp: string;
};

export type ChangePassword = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type createUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dOB: string;
  nationality: string;
  state: string;
  city: string;
  password: string;
};

export type LoggedInRes = {
  token?: string;
  token2?: string;
  id?: string;
  // is_verified?: boolean;
  user_verified?: boolean;
  message?: string;
  status?: number;
  email?: string;
};

export type FullUserDetails = {
  KYC_status?: string;
  accountNumber?: string;
  account_status?: string;
  account_tier?: string;
  address?: string;
  city?: string;
  country_of_residence?: string;
  firstName?: string;
  is_verified?: string;
  kyc_verified?: string;
  profile_image?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  id?: string;
};

export type Login = {
  email: string;
  password: string;
};

export enum AdStatus {
  Available = "Available",
  Unavailable = "Unavailable",
}

export enum WorkMode {
  Remote = "Remote",
  Onsite = "On-site",
  Hybrid = "Hybrid",
}

export enum Remuneration {
  Commission = "Commission",
  Hourly = "Hourly",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export enum MilestoneStatus {
  Pending = "Pending",
  Approved = "Approved",
  Completed = "Completed",
}

export interface IMilestone {
  title: string;
  description: string;
  amount: number;
  status: MilestoneStatus;
}

export interface IHireTalentToAds {
  gigId: string;
  talentEmail: string;
}

export interface IMerchantAd {
  id: string;
  userId: string;
  creatorName: string;
  country: string;
  state: string;
  city: string;
  status: AdStatus;
  title: string;
  description: string;
  by: string;
  workmode: WorkMode;
  remuneration: Remuneration;
  amount: number;
  image?: string;
  eligibility: string;
  applied_talent?: string[];
  hired_talent?: string;
  milestones?: IMilestone[];
  created_at: string;
  updated_at: string;
}
