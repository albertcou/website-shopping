import Button from "@/components/button";

function Form({ judul, type = "text" }: { judul: string; type?: string }) {
  return (
    <div>
      <p className="font-bold">{judul}:</p>
      <input
        type={type}
        className="block w-full py-1 font-semibold text-center rounded-full bg-gray-50 outline outline-1 outline-primary focus:outline-secondary"
      />
    </div>
  );
}

function Login() {
  return (
    <div className="flex items-center min-h-[90vh]">
      <div className="mx-auto w-[512px] h-[512px] rounded-3xl bg-tertiary flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <h2 className="font-semibold text-secondary">Sign to your account!</h2>
        <form className="flex flex-col w-full px-10 mt-5 text-left text-secondary gap-y-3">
          <Form judul="Username / Email" />
          <Form judul="Password" type="password" />
          <div className="flex justify-center">
            <Button text="Log In" primary={true} className="mt-3" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
