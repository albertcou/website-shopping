"use client";
import Button from "@/components/button";
import { Form, InputRef } from "@/components/form";
import axios from "axios";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Register {
  email?: string;
  username?: string;
  password?: string;
}

function Login() {
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<Register>({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      email.current?.value &&
      username.current?.value &&
      password.current?.value
    ) {
      try {
        const register = await axios.post("/api/register", {
          email: email.current?.value,
          username: username.current?.value,
          password: password.current?.value,
        });
        if (register.status === 200) {
          const signin = await signIn("credentials", {
            email: email?.current?.value,
            password: password?.current?.value,
            redirect: false,
          });

          if (!signin?.error) {
            toast.success("🦄 Selamat Kamu Berhasil Login!");
            router.push("/");
            router.refresh();
          }
        }
      } catch (e: any) {
        toast.error(e.response.data)
      }
    } else {
      const errors: Register = {};

      if (!email.current?.value) {
        errors.email = "Required";
      }

      if (!password.current?.value) {
        errors.password = "Required";
      }

      if (!username.current?.value) {
        errors.username = "Required";
      }

      if (Object.keys(errors).length) {
        setError(errors);
      }
    }
    setLoading(false);
  };

  return (
    <Form
      submitHandler={submitHandler}
      judul="Register"
      subjudul="Register your account for free 👌"
      register={true}
    >
      <InputRef ref={username} judul={"Username"} />
      {error.username && <p className="text-red-400">{error.username}*</p>}
      <InputRef ref={email} judul={"Email"} type="email" />
      {error.email && <p className="text-red-400">{error.email}*</p>}
      <InputRef ref={password} judul={"Password"} type="password" />
      {error.password && <p className="text-red-400">{error.password}*</p>}
      <div className="flex justify-center">
        <Button
          text={loading ? "Loading" : "Register"}
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
