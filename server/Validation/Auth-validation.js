const { z } = require("zod");
const Loginchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "At least 6 char" })
    .max(20, { message: "At most 20 char" }),
});
const Userchema = z.object({
  username: z
    .string({ required_error: "Name will be require" })
    .trim()
    .min(3, { message: "At least 3 char" })
    .max(20, { message: "At most 20 char" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" })
    .max(50, { message: "At most 50 char" })
    .trim(),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "At least 10 char" })
    .max(10, { message: "At most 10 char" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "At least 6 char" })
    .max(20, { message: "At most 20 char" }),
});
module.exports = { Userchema, Loginchema };