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

import { signUpSchema, /*signUpType*/ } from "@/lib/schemas";
import { ConfirmData } from "./confirmData";

export function RegisterForm() {
  const [open, setOpen] = useState(false);
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
  });
 
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (form.formState.isValid) {
              setOpen(true);
            }
          }}
          className="space-y-4 w-full max-w-md mx-auto p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 m-0">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
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
                const minDate = new Date(today.getFullYear() - 120, 0, 1).toISOString().split('T')[0];
                const maxDate = new Date(today.getFullYear() - 5, 11, 31).toISOString().split('T')[0];
                
                return (
                  <FormItem className="col-span-full">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        min={minDate}
                        max={maxDate}
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
              name="escola"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Escola</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                  <FormLabel>Ano</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                  <FormLabel>Turma</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Sua senha" {...field} />
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
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
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
              className=" w-[60%] cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
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
          nome: form.getValues("nome"),
          email: form.getValues("email"),
          nascimento: form.getValues("dataNascimento"),
          escola: form.getValues("escola"),
          ano: form.getValues("serie"),
          turma: form.getValues("turma"),
        }}
      />
    </>
  );
}
