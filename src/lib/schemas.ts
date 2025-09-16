//aqui ficarão os schemas do zod que serão utilizados nas validações de formularios
//schemas de forms são basicamente o "molde" do formato que aquele formulário deve capturar
import z from "zod";
//TODO:ajustar .email() deprecado
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
    dataNascimento: z
      .string()
      .min(1, {
        message: "A data de nascimento é obrigatória.",
      })
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 120, 0, 1); // 120 anos atrás
        const maxDate = new Date(today.getFullYear() - 5, 11, 31); // 5 anos atrás
        
        return birthDate >= minDate && birthDate <= maxDate;
      }, {
        message: "A data de nascimento deve ser entre 5 e 120 anos atrás.",
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