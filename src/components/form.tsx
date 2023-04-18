'use client'
import Link from "next/link";
import React, { forwardRef } from "react";

interface Props {
  judul: string;
  type?: "text" | "email" | "password";
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

function Form({
  children,
  judul,
  subjudul,
  register = false,
  submitHandler,
}: {
  children: React.ReactNode;
  judul: string;
  subjudul: string;
  register?: boolean;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <div className="mx-auto w-[512px] h-[512px] rounded-3xl bg-tertiary flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">{judul}</h1>
      <h2 className="font-semibold text-secondary">{subjudul}</h2>
      <form
        className="flex flex-col w-full px-10 mt-5 text-left text-secondary gap-y-3"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
      >
        {children}
      </form>
      <h1 className="mt-5 font-semibold text-secondary">
        {register ? (
          <div className="inline-flex gap-x-1">
            <p>Already Have Account?</p>
            <Link href="/auth/login" className="text-primary">
              Back To Login
            </Link>
          </div>
        ) : (
          <div className="inline-flex gap-x-1">
            <p>Not Have Account?</p>
            <Link href="/auth/register" className="text-primary">
              Register Now!
            </Link>
          </div>
        )}
      </h1>
    </div>
  );
}

export { InputRef, Form };
