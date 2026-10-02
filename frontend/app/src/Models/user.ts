import z from "zod";

const userBaseSchema = z.object({
  email: z.string(),
});

export const userSchema = userBaseSchema.extend({
  first_name: z.string(),
  last_name: z.string(),
});

export type UserType = z.infer<typeof userSchema>;

export const userLoginSchema = userBaseSchema.extend({
  password: z.string(),
});

export type UserLoginType = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = userBaseSchema.extend({
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
});

export type UserRegisterType = z.infer<typeof userRegisterSchema>;
