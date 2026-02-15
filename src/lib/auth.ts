import jwt from "jsonwebtoken";

export const generateToken = (adminId: string) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
