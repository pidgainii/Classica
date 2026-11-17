import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { modifyAccountRequest } from "../../Services/api/service";

export default function GeneralSettingsPage() {
  const { user } = useAuthContext();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordRep, setNewPasswordRep] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      modifyAccountRequest({
        email: email,
        current_password: currentPassword,
        new_password: newPassword,
      }),
    onSuccess: () => setMessage("Success !"),
  });

  if (isPending) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Account Settings</h1>
      <h2>Password</h2>
      <div className="w-full flex flex-col space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
          <input
            type="email"
            className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
          <input
            type="text"
            className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
          <input
            type="text"
            className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-[#a69b90]" />
          <input
            type="password"
            className="w-full bg-[#f7f4ec] border border-[#d6ccb8] px-3 py-2.5 pl-10 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
            placeholder="Repeat New Password"
            value={newPasswordRep}
            onChange={(e) => setNewPasswordRep(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-[#5a4a42] hover:bg-[#4a3b32] text-[#f7f4ec] font-sans text-xs uppercase tracking-widest py-3 rounded-sm transition-colors cursor-pointer shadow-sm mt-2 disabled:opacity-50"
          onClick={() => mutate()}
        >
          Save Changes
        </button>
      </div>

      <div>{message}</div>
    </div>
  );
}
