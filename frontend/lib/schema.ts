import { z } from "zod";
import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// 🧪 Schema de validação (Zod)
export const registerSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
});

export const User = models.User || model("User", UserSchema);
