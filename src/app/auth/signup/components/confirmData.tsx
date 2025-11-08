"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserDataCard } from "@/components/ui/user-data-card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerUserAction } from "@/actions/auth"
import { z } from "zod"
import { signUpSchema } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"

type UserData = z.infer<typeof signUpSchema>& {
  gradeName?: string;
  classLetter?: string;
  schoolName?: string;
}

interface ConfirmDataProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: UserData
}

export function ConfirmData({ open, onOpenChange, data }: ConfirmDataProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await registerUserAction(data);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success("Cadastro realizado com sucesso!");
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao realizar o cadastro.");
    } finally {
      setLoading(false);
    }
  };

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
        <UserDataCard data={{
          name: data.name,
          email: data.email,
          nascimento: data.dataNascimento,
          escola: data.schoolName || data.school,
          ano: data.gradeName || data.grade,
          turma: data.classLetter || data.class,
        }} />
        <div className="flex w-full justify-between gap-10">
          <Button
            variant="secondary"
            className="bg-[#182a5c] flex-1 text-white border-white cursor-pointer active:scale-95 transition-all duration-200"
            onClick={() => onOpenChange(false)}
          >
            Editar
          </Button>
          <Button
            onClick={handleRegister}
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer active:scale-95 transition-all duration-200"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
