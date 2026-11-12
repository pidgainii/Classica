import { useState } from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import type { UserLoginType } from "../../Models/user";
import { Link, useNavigate } from "react-router";
import { BookOpen, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuthContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const onClickLogin = async () => {
    const user: UserLoginType = {
      email: email,
      password: password,
    };
    const result = await login(user);
    if (result.success) navigate("/");
    else setErrorMessage("Incorrect username or password");
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f4ec] flex items-center justify-center py-12 px-4">
      <div className="bg-white border border-[#d6ccb8] shadow-xl rounded-sm flex flex-col w-full max-w-md p-8 md:p-10 items-center">
        {/* Logo / Brand Header */}
        <div className="w-12 h-12 bg-[#f0ece1] border border-[#d6ccb8] rounded-full flex items-center justify-center mb-3 text-[#5a4a42]">
          <BookOpen className="w-6 h-6" />
        </div>

        <h2
          className="text-3xl font-serif text-[#3e322c] tracking-widest uppercase font-normal mb-1"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Classica
        </h2>
        <div className="w-12 h-[1px] bg-[#d6ccb8] my-3"></div>
        <h3 className="text-xs font-sans uppercase tracking-widest text-[#7a6b63] mb-6">
          Sign In to Your Account
        </h3>

        {/* Error Message */}
        {errorMessage && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2.5 rounded-sm mb-4 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Inputs Form */}
        <div className="w-full flex flex-col space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
            <input
              type="email"
              className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
            <input
              type="password"
              className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={onClickLogin}
            className="w-full bg-[#5a4a42] hover:bg-[#4a3b32] text-[#f7f4ec] font-sans text-xs uppercase tracking-widest py-3 rounded-sm transition-colors cursor-pointer shadow-sm mt-2"
          >
            Sign In
          </button>
        </div>

        <div className="w-12 h-[1px] bg-[#e6decb] my-6"></div>

        {/* Register Redirect */}
        <div className="text-center space-y-1">
          <p className="text-xs font-sans text-[#7a6b63]">
            Don't have an account?
          </p>
          <Link to="/register">
            <span className="text-xs font-sans font-medium uppercase tracking-wider text-[#3e322c] hover:underline cursor-pointer">
              Create a New Account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
