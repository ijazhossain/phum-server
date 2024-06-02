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
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
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
      required: [true, 'Gender Name is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
/* // virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});
 */
// Query Middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  /* const query = this.getQuery();
  const isUserExists = await Student.find({
    id: query.id,
    isDeleted: { $ne: true },
  });

  if (isUserExists.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student does not exists!!!');
  } */
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
studentSchema.pre('findOneAndUpdate', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//creating a custom instance method
/* studentSchema.methods.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
  }; */
//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
