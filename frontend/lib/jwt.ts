import jwt from "jsonwebtoken";

// Função para criar o token
export function signToken(payload: object) {
  console.log("🔵 Criando token JWT");
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

// Função para verificar o token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return null;
  }
}
