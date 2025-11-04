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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { signUpSchema, /*signUpType*/ } from "@/lib/schemas";
import { ConfirmData } from "./confirmData";

export function RegisterForm() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      dataNascimento: "",
      serie: "",
      turma: "",
      escola: "",
      senha: "",
      confirmarSenha: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = await form.trigger()
    if (isValid) {
      setOpen(true)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md md:max-w-lg mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 m-0">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-white text-sm md:text-base">Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" className="h-10 md:h-12 text-sm md:text-base" {...field} />
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
                  <FormLabel className="text-white text-sm md:text-base">E-mail</FormLabel>
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
              render={({ field }) => (
                <FormItem className="col-span-full flex flex-col">
                  <FormLabel className="text-white text-sm md:text-base">Data de Nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`h-10 md:h-12 text-left font-normal bg-white justify-start pl-3 ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                        }}
                        initialFocus
                        captionLayout="dropdown"
                        fromYear={new Date().getFullYear() - 120}
                        toYear={new Date().getFullYear() - 5}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 m-0">
            <FormField
              control={form.control}
              name="escola"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-white text-sm md:text-base">Escola</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione sua escola" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="escola-a">Escola A</SelectItem>
                      <SelectItem value="escola-b">Escola B</SelectItem>
                      <SelectItem value="escola-c">Escola C</SelectItem>
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
              name="serie"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">Ano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione seu ano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1º Ano</SelectItem>
                      <SelectItem value="2">2º Ano</SelectItem>
                      <SelectItem value="3">3º Ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turma"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel className="text-white text-sm md:text-base">Turma</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Selecione sua turma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">Turma A</SelectItem>
                      <SelectItem value="B">Turma B</SelectItem>
                      <SelectItem value="C">Turma C</SelectItem>
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
                  <FormLabel className="text-white text-sm md:text-base">Senha</FormLabel>
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
                  <FormLabel className="text-white text-sm md:text-base">Confirmar Senha</FormLabel>
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
            <Button type="submit" className="w-[60%] md:w-[50%] h-10 md:h-12 text-sm md:text-base cursor-pointer">
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>

      <ConfirmData
        open={open}
        onOpenChange={setOpen}
        data={{
          nome: form.getValues("nome"),
          email: form.getValues("email"),
          nascimento: form.getValues("dataNascimento"),
          escola: form.getValues("escola"),
          ano: form.getValues("serie"),
          turma: form.getValues("turma"),
        }}
      />
    </>
  )
}