import { useAuthContext } from "../../Contexts/AuthContext";
import { User, Mail, Shield } from "lucide-react";

export default function MyProfilePage() {
  const { user } = useAuthContext();

  return (
    <div className="w-full flex flex-col items-center py-8">
      {/* Avatar Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#f0ece1] border border-[#d6ccb8] rounded-full flex items-center justify-center mx-auto mb-3 text-[#5a4a42]">
          <User className="w-10 h-10" />
        </div>
        <h2
          className="font-serif text-2xl text-[#3e322c]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-xs text-[#7a6b63] font-sans mt-1 uppercase tracking-widest">
          Account Information
        </p>
      </div>

      {/* Clean Border-Divided List */}
      <div className="w-full max-w-lg space-y-4">
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[#e6decb]">
          <div className="flex items-center space-x-3 text-[#7a6b63] uppercase tracking-wider text-xs">
            <Mail className="w-4 h-4 text-[#5a4a42]" />
            <span>Email</span>
          </div>
          <span className="font-serif text-sm text-[#3e322c]">
            {user?.email}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[#e6decb]">
          <div className="flex items-center space-x-3 text-[#7a6b63] uppercase tracking-wider text-xs">
            <User className="w-4 h-4 text-[#5a4a42]" />
            <span>First Name</span>
          </div>
          <span className="font-serif text-sm text-[#3e322c]">
            {user?.first_name}
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[#e6decb]">
          <div className="flex items-center space-x-3 text-[#7a6b63] uppercase tracking-wider text-xs">
            <Shield className="w-4 h-4 text-[#5a4a42]" />
            <span>Last Name</span>
          </div>
          <span className="font-serif text-sm text-[#3e322c]">
            {user?.last_name}
          </span>
        </div>
      </div>
    </div>
  );
}
