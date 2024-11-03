import React from "react";

function Login() {
  const [isLogin, setIsLogin] = React.useState(false);
  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="my-5 text-center text-xl ">
        {isLogin ? "Registration" : "Login"}
      </h1>

      <form className="flex w-1/2 flex-col gap-5">
        <input
          type="text"
          className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
          placeholder="Email"
        ></input>
        <input
          type="password"
          className="input focus:outline-none  bg-transparent border-2 border-solid border-slate-500 rounded p-1"
          placeholder="Password"
        ></input>

        <button className="btn bg-green-600 mx-auto py-2 px-6 rounded hover:shadow-3xl">
          Login
        </button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button className="text-slate-300 hover:text-white my-2">
            Already have an account?
          </button>
        ) : (
          <button className="text-slate-300 hover:text-white my-2">
            Don't have an account?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
