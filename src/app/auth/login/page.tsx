"use client";
import Button from "@/components/button";
import { Form, InputRef } from "@/components/form";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

function Login() {
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const signin = await signIn("credentials", {
      email: email?.current?.value,
      password: password?.current?.value,
      redirect: false,
    });

    setLoading(false);

    if (signin?.error) {
      toast.error("Email / Password Kamu Salah 😥!");
    }

    if (!signin?.error) {
      toast.success("Selamat Kamu Berhasil Login! 🦄");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <Form
      submitHandler={submitHandler}
      judul="Sign In"
      subjudul="Sign to your account!"
    >
      <InputRef ref={email} judul={"Username / Email"} />
      <InputRef ref={password} judul={"Password"} type="password" />
      <div className="flex justify-center">
        <Button
          text={loading ? "Loading" : "Log In"}
          primary={true}
          className={clsx("mt-3", loading && "btn loading")}
          type="submit"
          disable={loading}
        />
      </div>
    </Form>
  );
}

export default Login;
