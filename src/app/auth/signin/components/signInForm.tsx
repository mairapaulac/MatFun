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
import { LoadingButton } from "@/components/ui/loading-button"; // Importe o LoadingButton
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/schemas";
import { signInUserAction } from "@/actions/auth";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setLoading(true);
    try {
      const res = await signInUserAction(values);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success("Autenticado com sucesso!");
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

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
                  disabled={loading} // Desabilita input durante loading
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lg:text-base">Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
                  disabled={loading} // Desabilita input durante loading
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between text-xs mt-1.5 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              disabled={loading} // Desabilita checkbox durante loading
            />
            <label
              htmlFor="remember-me"
              className="text-xs sm:text-sm md:text-base lg:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Lembrar de mim
            </label>
          </div>
          <Link
            href="#"
            className={`text-xs sm:text-sm md:text-base lg:text-sm text-white hover:underline ${
              loading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <LoadingButton
            type="submit"
            isLoading={loading}
            loadingText="Entrando..."
            className="w-full sm:w-[40%] cursor-pointer order-1 h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base"
          >
            Entrar
          </LoadingButton>
          
          <Button
            asChild
            variant={"secondary"}
            className={`active:scale-95 transition-all duration-200 w-full sm:w-[40%] cursor-pointer order-2 h-10 sm:h-12 md:h-14 lg:h-10 text-sm sm:text-base md:text-lg lg:text-base ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={loading} // Desabilita botão de cadastro durante loading
          >
            <Link href="/auth/signup">Cadastro</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}