import Joi from "joi";

// Define the schema for a User
export const UserSchema = Joi.object({
  username: Joi.string().allow("").optional(),
  email: Joi.string().email().required(),
  // role: Joi.string().optional(), // Add any other fields relevant to your User
});

export interface IUser {
  username?: string;
  email: string;
  // role?: string;
}
