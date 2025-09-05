//guardar interfaces e tipos aqui

//login
export interface ISignInFormValues {
  email: string;
  password: string;
}

//tipagem do modal de cadastro
export interface confirmDataProps  {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: {
    nome: string
    email: string
    nascimento: string
    escola: string
    ano: string
    turma: string
  }
}