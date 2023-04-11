"use client";
import Button from "@/components/button";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { forwardRef, useRef } from "react";

interface Props {
  judul: string;
  type?: "text" | "password";
}

type Ref = HTMLInputElement;

const InputRef = forwardRef<Ref, Props>(({ judul, type = "text" }, ref) => {
  return (
    <div>
      <p className="font-bold">{judul}:</p>
      <input
        ref={ref}
        type={type}
        className="block w-full py-1 font-semibold text-center rounded-full bg-gray-50 outline outline-1 outline-primary focus:outline-secondary"
      />
    </div>
  );
});
InputRef.displayName = "InputRef";

function Login() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: email?.current?.value,
      password: password?.current?.value,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) router.push("/");
    });
  };

  return (
    <div className="flex items-center min-h-[90vh]">
      <div className="mx-auto w-[512px] h-[512px] rounded-3xl bg-tertiary flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <h2 className="font-semibold text-secondary">Sign to your account!</h2>
        <form
          className="flex flex-col w-full px-10 mt-5 text-left text-secondary gap-y-3"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
        >
          <InputRef ref={email} judul={"Email"} />
          <InputRef ref={password} judul={"Password"} type="password" />
          <div className="flex justify-center">
            <Button
              text="Log In"
              primary={true}
              className="mt-3"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
