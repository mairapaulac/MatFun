"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Definindo o tipo diretamente no arquivo
export type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter()
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = () => {
    console.log("fazer função de submit aqui")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-md mx-auto p-4 sm:p-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lg:text-base">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="seu@email.com"
                  className="h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lg:text-base">Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between text-xs mt-1.5 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="text-xs sm:text-sm md:text-base lg:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Lembrar de mim
            </label>
          </div>
          <Link
            href={"#"}
            className="text-xs sm:text-sm md:text-base lg:text-sm text-white hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            type="submit"
            onClick={() => {
              router.push("/home")
            }}
            className="w-full sm:w-[40%] cursor-pointer order-1 h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
          >
            Entrar
          </Button>
          <Link href={"/auth/signup"}></Link>
          <Button
            onClick={() => {
              router.push("/auth/signup")
            }}
            type="submit"
            className="active:scale-95 transition-all duration-200 w-full sm:w-[40%] cursor-pointer order-2 h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
            variant={"secondary"}
          >
            Cadastro
          </Button>
        </div>
      </form>
    </Form>
  )
}
