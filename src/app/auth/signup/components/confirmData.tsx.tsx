"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type confirmDataProps = {
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
//eslint-disable-next-line
export function ConfirmData({ open, onOpenChange, data }: confirmDataProps) {
  const dataMock = {
    nome: "Joaozinho",
    email: "joazinho@email.com",
    nascimento: "11/09/2001",
    escola: "Rui Barbosa",
    ano: "5º ano",
    turma: "Turma C"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Confirmação de Dados</DialogTitle>
          <DialogDescription>
            Confira se suas informações estão corretas antes de finalizar o cadastro.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Nome</p>
            <p className="text-base">{dataMock.nome}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-base">{dataMock.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Data de Nascimento</p>
            <p className="text-base">{dataMock.nascimento}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Escola</p>
            <p className="text-base">{dataMock.escola}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Ano</p>
            <p className="text-base">{dataMock.ano}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Turma</p>
            <p className="text-base">{dataMock.turma}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}