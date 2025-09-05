//aqui ficarão os schemas do zod que serão utilizados nas validações de formularios
import z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor insira um endereço de email.")
    .email("Insira um endereço de email válido."),
  password: z.string().min(8, "Por favor insira uma senha válida."),
});

export const signUpSchema = z
  .object({
    nome: z.string().min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Por favor, insira um e-mail válido.",
    }),
    dataNascimento: z.string().min(1, {
      message: "A data de nascimento é obrigatória.",
    }),
    serie: z.string().min(1, {
      message: "A série é obrigatória.",
    }),
    turma: z.string().min(1, {
      message: "A turma é obrigatória.",
    }),
    escola: z.string().min(1, {
      message: "O nome da escola deve ter pelo menos 2 caracteres.",
    }),
    senha: z.string().min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
  });

  export type signUpType = z.infer<typeof signUpSchema>