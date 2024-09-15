import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin, TAdminName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';

const adminNameSchema = new Schema<TAdminName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Middle name is required'] },
});
const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'Admin id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: adminNameSchema,
      required: [true, 'Admin name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Admin gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Admin date of birth is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Admin email is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Admin contactNo is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Admin emergency Contact No is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Admin presentAddress is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Admin permanentAddress is required'],
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.statics.isAdminExists = async function (id: string) {
  const existingUser = await Admin.findById(id);
  return existingUser;
};
export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
