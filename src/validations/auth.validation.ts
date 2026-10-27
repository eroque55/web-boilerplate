import z from './zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type TLoginForm = z.infer<typeof LoginSchema>;
