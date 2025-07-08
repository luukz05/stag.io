import { z } from "zod";
import mongoose, { Schema, model, models } from "mongoose";

// Zod schemas
export const registerSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const kanbanZodSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
});

// Mongoose schemas
const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  kanbans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kanban" }],
});

const KanbanSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    columns: [
      {
        colTitle: { type: String, required: true },
        cards: [
          {
            id: Number,
            cardTitle: { type: String, required: true },
            description: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Models exportados
export const User = models.User || model("User", UserSchema);
export const Kanban = models.Kanban || model("Kanban", KanbanSchema);
