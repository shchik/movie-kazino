import React from "react";
import "./login.css";

function Login({ onLoginClick, isLoginned }) {
  const [isLogin, setIsLogin] = React.useState(isLoginned);

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white w-1/4 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl content-form">
      <button
        className="absolute top-2 right-5 bg-red-500 px-1.5 hover:shadow-3xl"
        onClick={onLoginClick}
      >
        X
      </button>
      <h1 className="my-5 text-center text-xl ">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form className="flex w-2/3 flex-col gap-5">
        <input
          type={isLogin ? "text" : "email"}
          className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
          placeholder={isLogin ? "Username" : "Email"}
        ></input>
        {isLogin ? (
          ""
        ) : (
          <input
            type="text"
            className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
            placeholder="Username"
          ></input>
        )}
        <input
          type="password"
          className="input focus:outline-none  bg-transparent border-2 border-solid border-slate-500 rounded p-1"
          placeholder="Password"
        ></input>

        {isLogin ? (
          ""
        ) : (
          <input
            type="password"
            className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
            placeholder="Confirm Password"
          ></input>
        )}

        <button className="btn bg-green-600 mx-auto py-2 px-6 rounded hover:shadow-3xl">
          {isLogin ? "Login" : "Registration"}
        </button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white my-2"
          >
            Don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white my-2"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
