import { RegisterForm } from "./components/signUpForm";
import Image from "next/image";
import Link from "next/link";
import TanstackProvider from "@/providers/TanstackProvider";
export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Image
        className="mb-4 w-[220px] sm:w-[280px] md:w-[650px]"
        src="/logomatfun.svg"
        width={350}
        height={87}
        alt="MatFun's logo"
      />
      <TanstackProvider>
        <RegisterForm />
      </TanstackProvider>
      <span className="text-white text-sm md:text-base mt-4 text-center">
        Já possui uma conta?{" "}
        <Link className="text-[#22C55E] underline" href="/auth/signin">
          Autentique-se
        </Link>
      </span>
    </div>
  );
}
