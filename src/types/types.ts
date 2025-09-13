//guardar interfaces e tipos aqui

//login
export interface ISignInFormValues {
  email: string;
  password: string;
}

// modal de confirmação cadastro
export interface confirmDataProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    nome: string;
    email: string;
    nascimento: string;
    escola: string;
    ano: string;
    turma: string;
  };
}
// card de jogador na pagina de ranking
export interface IPlayerCard {
  rank: number;
  name: string;
  points: number;
  trophy?: string | null;
  isUser?:boolean
}
