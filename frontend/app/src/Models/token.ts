import z from "zod";

export const tokenSchema = z.object({
  access_token: z.string(),
});

export type TokenType = z.infer<typeof tokenSchema>;
