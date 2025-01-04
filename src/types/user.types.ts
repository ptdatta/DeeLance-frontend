export type UserAccountType = "FREELANCER" | "CLIENT";

export interface IUser {
  _id?: string;
  UserName: string;
  email: string;
  password: string;
  wallet?: string;
  avatar?: string;
  verified?: boolean;
  verificationToken?: string;
  registrationDate?: Date;
  isPrivate?: boolean;
  bonuses?: string[];
  points?: number;
  title?: string;
  description?: string;
  is_profileCompleted?: boolean;
  Mode?: UserAccountType;
  accountType: UserAccountType;
  country?: string;
  token?: string;
  kind?: number;
  referrer?: string;
  tasks?: string[];
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  skills?: { code: string; label: string }[];
  education?: IEducation[];
  experience?: IExperience[];
  otherDetails?: IOtherDetails;
  external_profiles?: IExternalProfile[];
  certificate?: ICertificate[];
  role?: "user" | "admin";
}

export interface IExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface IOtherDetails {
  hobbies?: string[];
  languages?: { name: string; proficiency: string }[];
  website?: string;
}

export interface IExternalProfile {
  platform: string;
  username: string;
  url: string;
}

export interface ICertificate {
  title: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
}

export interface IEducation {
  school: string;
  degree: string;
  graduation_year: number;
}
