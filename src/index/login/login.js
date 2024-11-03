import React from "react";

function Login() {
  const [isLogin, setIsLogin] = React.useState(false);
  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>
    </div>
  );
}

export default Login;
