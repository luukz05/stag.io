import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("🟢 MongoDB conectado");
  } catch (error) {
    console.error("🔴 Erro ao conectar no MongoDB", error);
  }
}
