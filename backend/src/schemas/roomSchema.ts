import Joi from "joi";

// Define the schema for a User
export const RoomSchema = Joi.object({
  id: Joi.string().optional(),
  title : Joi.string().required(),
});

export interface IRoom {
  id?: string;
  title: string;
}
