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
import { ISignInFormValues } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router= useRouter()
  const form = useForm<ISignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log("fazer função de submit aqui");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto p-4 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="seu@email.com" />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="••••••••" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between text-xs mt-1.5">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Lembrar de mim
            </label>
          </div>
        </div>
        <div className="pt-10 flex-row flex justify-center">
          <Button type="submit" className="w-[40%]">
            Entrar
          </Button>
          <Link href={'/auth/signup'}></Link>
          <Button onClick={()=>{router.push('http://localhost:3000/auth/signup')}} type="submit" className="w-[40%] " variant={"secondary"}>
            Cadastro
          </Button>
        </div>
      </form>
    </Form>
  );
}
