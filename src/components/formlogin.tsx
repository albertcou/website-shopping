"use client";
import Button from "@/components/button";
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

function FormLogin({ submitHandler }: { submitHandler: any }) {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex flex-col w-full px-10 mt-5 text-left text-secondary gap-y-3"
      onSubmit={submitHandler}
    >
      <InputRef ref={email} judul={"Email"} />
      <InputRef ref={password} judul={"Password"} type="password" />
      <div className="flex justify-center">
        <Button text="Log In" primary={true} className="mt-3" type="submit" />
      </div>
    </form>
  );
}

export default FormLogin;
