import Joi from "joi";

// Define the schema for a User
export const DocSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  content: Joi.string().optional(),
  roomId: Joi.string().optional(),
  owner: Joi.string().required(),
  createdAt: Joi.date().default(() => new Date()), // Auto-populated if not provided
  updatedAt: Joi.date().default(() => new Date()), // Auto-populated for updates
});

export interface IDoc {
  id?: string;
  title: string;
  content?: string;
  roomId?: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
