import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    unique_id: {
      type: String,
      required: true,
      unique: true,
    },
    ip_address: {
      type: String,
    },
    country: {
      type: String,
    },
    country_code: {
      type: String,
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
    org: {
      type: String,
    },
    time_zone: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
    },
    full_name: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const User = mongoose.model("Users", UserSchema);
