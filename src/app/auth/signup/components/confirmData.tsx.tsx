"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { registrationMock } from "@/assets/data"
import { confirmDataProps } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  UserCircle,
  Mail,
  Calendar,
  School,
  BookText,
  Users,
} from "lucide-react"
//eslint-disable-next-line
export function ConfirmData({ open, onOpenChange, data }: confirmDataProps) {
  const dataMock = registrationMock

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-[#3A55A3] border-4 rounded-[28px] bg-[#182a5c] p-8 pb-6   ">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 p-3 rounded-full border-6 border-[#182a5c]">
          <CheckCircle className="size-10 text-white" />
        </div>
        <DialogHeader className="gap-2 text-center pt-4">
          <DialogTitle className="text-white text-3xl font-bold">Confirmação de Dados</DialogTitle>
          <DialogDescription className="text-gray-300 text-md">
            Confira se suas informações estão corretas antes de finalizar o cadastro.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-1 bg-white p-4 rounded-[38px] border-6 border-black">
          <div className="flex items-start gap-3">
            <UserCircle className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Nome</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.nome}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Email</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Data de Nascimento</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.nascimento}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <School className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Escola</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.escola}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BookText className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Ano</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.ano}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="size-5 text-gray-500 mt-0.5" />
            <div>
              <h2 className="text-sm font-medium text-gray-950">Turma</h2>
              <p className="text-lg font-semibold text-gray-700">{dataMock.turma}</p>
            </div>
          </div>
        </div>
        <div className=" flex w-full justify-between gap-10">
          <Button variant="secondary" className="bg-[#182a5c] flex-1 text-white border-white">
            Editar
          </Button>
          <Button className="flex-1">
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}