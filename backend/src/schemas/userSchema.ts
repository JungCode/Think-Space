import Joi from "joi";

// Define the schema for a User
export const UserSchema = Joi.object({
  id: Joi.string().optional(), // Optional for existing users fetched from Firestore
  username: Joi.string().required(),
  // email: Joi.string().email().required(),
  // role: Joi.string().optional(), // Add any other fields relevant to your User
});

export interface IUser {
  id?: string;
  username: string;
  // email: string;
  // role?: string;
}
