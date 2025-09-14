import { DataItem } from "./data-item"
import { UserCircle, Mail, Calendar, School, BookText, Users } from "lucide-react"

interface UserData {
  nome: string
  email: string
  nascimento: string
  escola: string
  ano: string
  turma: string
}

interface UserDataCardProps {
  data: UserData
}

export function UserDataCard({ data }: UserDataCardProps) {
  return (
    <div className="mt-4 grid gap-1 bg-white p-4 rounded-[38px] border-6 border-black">
      <DataItem icon={UserCircle} label="Nome" value={data.nome} />
      <DataItem icon={Mail} label="Email" value={data.email} />
      <DataItem icon={Calendar} label="Data de Nascimento" value={data.nascimento} />
      <DataItem icon={School} label="Escola" value={data.escola} />
      <DataItem icon={BookText} label="Ano" value={data.ano} />
      <DataItem icon={Users} label="Turma" value={data.turma} />
    </div>
  )
}
