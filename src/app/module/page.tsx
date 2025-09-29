"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModuleNavbar from "./components/ModuleNavbar";
import ModuleCard from "./components/ModuleCard";
import { Button } from "@/components/ui/button";
import { useModuleStore } from "@/stores/moduleStore";
import {
  Gamepad2,
  BookOpen,
  Calculator,
  Square,
  Divide,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  //eslint-disable-next-line
  icon: any;
  iconColor: string;
}

const modules: Module[] = [
  {
    id: "geral",
    title: "Geral",
    subtitle: "Seleciona todos os módulos",
    icon: BookOpen,
    iconColor: "#3B82F6", 
  },
  {
    id: "algebraic_multiplication",
    title: "Operações Algébricas",
    subtitle: "Multiplicação e operações básicas",
    icon: Calculator,
    iconColor: "#10B981", 
  },
  {
    id: "area_geometry",
    title: "Áreas Geométricas",
    subtitle: "Cálculo de áreas de figuras geométricas",
    icon: Square,
    iconColor: "#8B5CF6", 
  },
  {
    id: "fraction",
    title: "Operações com Frações",
    subtitle: "Soma, subtração e multiplicação de frações",
    icon: Divide,
    iconColor: "#F59E0B", 
  },
];

export default function ModulePage() {
  const router = useRouter();
  const { setSelectedModules } = useModuleStore();
  const [selectedModules, setLocalSelectedModules] = useState<string[]>([]);

  const handleModuleToggle = (moduleId: string) => {
    if (moduleId === "geral") {
      if (selectedModules.includes("geral")) {
        setLocalSelectedModules([]);
      } else {
        setLocalSelectedModules(modules.map((m) => m.id));
      }
    } else {
      setLocalSelectedModules((prev) => {
        const newSelection = prev.includes(moduleId)
          ? prev.filter((id: string) => id !== moduleId)
          : [...prev, moduleId];

        const specificModules = modules.filter((m) => m.id !== "geral");
        const allSpecificSelected = specificModules.every((m) =>
          newSelection.includes(m.id)
        );
        
        if (allSpecificSelected && newSelection.length === specificModules.length) {
          return [...newSelection, "geral"];
        } else {
          return newSelection.filter((id: string) => id !== "geral");
        }
      });
    }
  };

  const isModuleSelected = (moduleId: string) => {
    return selectedModules.includes(moduleId);
  };

  const isModuleDisabled = (moduleId: string) => {
    if (moduleId === "geral") return false;
    return selectedModules.includes("geral");
  };

  const handleStartGame = () => {
    // Save selected modules to the store before navigating
    setSelectedModules(selectedModules);
    router.push("/game");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#24366b] bg-pattern overflow-x-hidden overflow-y-hidden">
      <ModuleNavbar />

      <main className="flex-1 px-4 py-6 max-w-[780px] mx-auto w-full flex flex-col  overflow-x-hidden overflow-y-hidden">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
            Selecionar Módulos
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Escolha os tópicos que deseja praticar
          </p>
        </div>

        <div className="flex-1 space-y-4 sm:space-y-5 mb-6 items-center flex-col flex">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              icon={module.icon}
              title={module.title}
              subtitle={module.subtitle}
              isSelected={isModuleSelected(module.id)}
              isDisabled={isModuleDisabled(module.id)}
              onToggle={() => handleModuleToggle(module.id)}
              iconColor={module.iconColor}
            />
          ))}
        </div>

        <div className="flex justify-center mt-auto ">
          <Button
            onClick={handleStartGame}
            disabled={selectedModules.length === 0}
            className="w-full max-w-[690px] h-[50px] sm:h-[70px] md:h-[70px] rounded-full cursor-pointer"
          >
            <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xl sm:text-3xl">Iniciar Jogo</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
