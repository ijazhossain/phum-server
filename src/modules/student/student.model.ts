import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethod,
  // StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxLength: [20, 'Name cannot be more than 20 characters'],
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's Name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
  },
  motherName: { type: String, required: [true, "Mother's Name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local Guardian's Name is required"] },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    unique: true,
    maxLength: [20, 'password can not be more than 20 characters'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Blood group is required A B AB O',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian Information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian Information is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

//pre save middleware hook
studentSchema.pre('save', async function (next) {
  //console.log(this, 'pre hook: we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware
studentSchema.post('save', function () {
  console.log(this, 'pre hook: we will save the data');
});

//creating a custom instance method
/* studentSchema.methods.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
  }; */
//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
