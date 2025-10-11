"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ExitConfirmationDialog() {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsConfirmDialogOpen(true)}
        className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 "
      >
        <Undo2 className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] text-white transition-all group-hover:-translate-x-1" />
      </button>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent variant="hint" className="max-w-md sm:max-w-lg md:max-w-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 p-3 rounded-full border-4 border-[#3A55A3]">
            <AlertTriangle className="size-10 text-white" />
          </div>
          <div className="bg-white rounded-3xl p-6 mt-1 border-[#6D93FF] border-4">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-normal text-gray-800">
                Tem certeza que deseja sair?
              </DialogTitle>
              <DialogDescription className="text-normal text-lg text-red-700">
                Você perderá todos os pontos acumulados nesta partida.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="!justify-center sm:!justify-center flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => router.push("/home")}
                className="w-full sm:w-auto whitespace-normal h-auto active:scale-95 transition-all duration-200"
              >
                Sair da partida
              </Button>
              <Button
                onClick={() => setIsConfirmDialogOpen(false)}
                className="w-full sm:w-auto whitespace-normal h-auto active:scale-95 transition-all duration-200"
              >
                Continuar jogando
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
