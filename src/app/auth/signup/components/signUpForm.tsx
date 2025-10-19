"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ISchool } from "@/types/types";
import { signUpSchema /*signUpType*/ } from "@/lib/schemas";
import { ConfirmData } from "./confirmData";
import { useFetchSchools } from "@/hooks/use-fetch-schools";
import { useFetchGrades } from "@/hooks/use-fetch-grades";
import { useFetchClasses } from "@/hooks/use-fetch-classes";
import { useEffect } from "react";
export function RegisterForm() {
  const [open, setOpen] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  console.log(selectedClassId, selectedGradeId, selectedSchoolId);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      dataNascimento: "",
      grade: "",
      class: "",
      school: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const { data: schools, isLoading: isLoadingSchools } = useFetchSchools();
  const { data: grades, isLoading: isLoadingGrades } =
    useFetchGrades(selectedSchoolId);
  const { data: classes, isLoading: isLoadingClasses } =
    useFetchClasses(selectedGradeId);
    // useEffect(() => {
    //   console.log("Valores atuais:", form.watch());
    // }, [form.watch()]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    if (isValid) {
      setOpen(true);
    }
  };

  const selectedSchoolName =
    schools?.find((s) => s.schoolId === selectedSchoolId)?.school_name || "";
  const selectedClassName =
    classes?.find((c) => c.classId === selectedClassId)?.classLetter || "";
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-md md:max-w-lg mx-auto p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 m-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-white text-sm md:text-base">
                    Nome Completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome"
                      className="h-10 md:h-12 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-white text-sm md:text-base">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      className="h-10 md:h-12 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataNascimento"
              render={({ field }) => {
                const today = new Date();
                const minDate = new Date(today.getFullYear() - 120, 0, 1)
                  .toISOString()
                  .split("T")[0];
                const maxDate = new Date(today.getFullYear() - 5, 11, 31)
                  .toISOString()
                  .split("T")[0];

                return (
                  <FormItem className="col-span-full">
                    <FormLabel className="text-white text-sm md:text-base">
                      Data de Nascimento
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        className="h-10 md:h-12 text-sm md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-1 m-0">
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-white text-sm md:text-base">
                    Escola
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSchoolId(Number(value));
                      form.setValue("grade", "");
                      form.setValue("class", "");
                      setSelectedGradeId(null);
                      setSelectedClassId(null);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione sua escola" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingSchools ? (
                        <SelectItem value="loading" disabled>
                          Carregando escolas...
                        </SelectItem>
                      ) : (
                        schools?.map((school: ISchool) => {
                          return (
                            <SelectItem
                              key={school.schoolId}
                              value={String(school.schoolId)}
                            >
                              {school.school_name}
                            </SelectItem>
                          );
                        })
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-0">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">
                    Ano
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedGradeId(Number(value));
                      form.setValue("class", "");
                      setSelectedClassId(null);
                    }}
                    defaultValue={field.value}
                    disabled={!selectedSchoolId || isLoadingGrades}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione seu ano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingGrades ? (
                        <SelectItem value="loading_grades" disabled>
                          Carregando anos...
                        </SelectItem>
                      ) : (
                        grades?.map((grade) => (
                          <SelectItem
                            key={grade.gradeId}
                            value={String(grade.gradeId)}
                          >
                            {grade.gradeName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">
                    Turma
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedClassId(Number(value));
                    }}
                    defaultValue={field.value}
                    disabled={!selectedGradeId || isLoadingClasses}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione sua turma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingClasses ? (
                        <SelectItem value="loading_classes" disabled>
                          Carregando turmas...
                        </SelectItem>
                      ) : (
                        classes?.map((clss) => (
                          <SelectItem
                            key={clss.classId}
                            value={String(clss.classId)}
                          >
                            {clss.classLetter}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      className="h-10 md:h-12 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">
                    Confirmar Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      className="h-10 md:h-12 text-sm md:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="w-[60%] md:w-[50%] h-10 md:h-12 text-sm md:text-base cursor-pointer"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>

      <ConfirmData
        open={open}
        onOpenChange={setOpen}
        data={{
          ...form.getValues(),
          gradeName: grades?.find((g) => g.gradeId === selectedGradeId)?.gradeName || "",
          classLetter: classes?.find((c) => c.classId === selectedClassId)?.classLetter || "",
        }}
      />
    </>
  );
}
