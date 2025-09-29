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
  trophy?: boolean | null;
  isUser?:boolean
}

// operações com frações
export interface FractionQuestion {
  id: string;
  module: 'fraction';
  type: 'fraction_operation';
  num1: number;
  den1: number;
  operator: '+'  | '×';
  num2: number;
  den2: number;
  // Note: We don't store the result here; it will be calculated for validation.
}