"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserDataCard } from "@/components/ui/user-data-card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserData {
  nome: string
  email: string
  nascimento: string
  escola: string
  ano: string
  turma: string
}

interface ConfirmDataProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: UserData
}

export function ConfirmData({ open, onOpenChange, data }: ConfirmDataProps) {
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-[#3A55A3] border-4 rounded-[28px] bg-[#182a5c] p-8 pb-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 p-3 rounded-full border-6 border-[#182a5c]">
          <CheckCircle className="size-10 text-white" />
        </div>
        <DialogHeader className="gap-2 text-center pt-4">
          <DialogTitle className="text-white text-3xl font-bold">Confirmação de Dados</DialogTitle>
          <DialogDescription className="text-gray-300 text-md">
            Confira se suas informações estão corretas antes de finalizar o cadastro.
          </DialogDescription>
        </DialogHeader>
        <UserDataCard data={data} />
        <div className="flex w-full justify-between gap-10">
          <Button
            variant="secondary"
            className="bg-[#182a5c] flex-1 text-white border-white cursor-pointer active:scale-95 transition-all duration-200"
            onClick={() => onOpenChange(false)}
          >
            Editar
          </Button>
          <Button
            onClick={() => {
              router.push("/home")
            }}
            type="submit"
            className="flex-1 cursor-pointer active:scale-95 transition-all duration-200"
          >
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
