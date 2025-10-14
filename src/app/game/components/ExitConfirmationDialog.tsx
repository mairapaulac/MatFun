"use client";

import { AlertTriangle, HelpCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataItem } from "@/components/ui/data-item";

interface ExitConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  score: number;
  questionsAnswered: number;
}

export default function ExitConfirmationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  score,
  questionsAnswered,
}: ExitConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        variant="hint"
        className="max-w-md sm:max-w-lg md:max-w-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 p-3 rounded-full border-4 border-[#3A55A3]">
          <AlertTriangle className="size-10 text-white" />
        </div>
        <div className="bg-white rounded-3xl p-6 mt-1 border-[#6D93FF] border-4">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-3xl font-normal text-gray-800">
              Tem certeza que deseja sair?
            </DialogTitle>
            <DialogDescription className="text-normal text-lg text-red-700 !mt-0">
              Seu progresso será perdido.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100 p-4 rounded-lg">
              <DataItem
                icon={Trophy}
                label="Pontuação Atual"
                value={`${score} pts`}
              />
              <DataItem
                icon={HelpCircle}
                label="Questões Respondidas"
                value={`${questionsAnswered} ${
                  questionsAnswered === 1 ? "questão" : "questões"
                }`}
              />
            </div>
          </div>

          <DialogFooter className="!justify-center sm:!justify-center flex-col sm:flex-row gap-3 mt-4">
            <Button
              variant="secondary"
              onClick={onConfirm}
              className="w-full sm:w-auto whitespace-normal h-auto active:scale-95 transition-all duration-200"
            >
              Sair da partida
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto whitespace-normal h-auto active:scale-95 transition-all duration-200"
            >
              Continuar jogando
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
