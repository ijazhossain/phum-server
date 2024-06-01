import { Types } from 'mongoose';
export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGender = 'male' | 'female';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  designation: string;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};
