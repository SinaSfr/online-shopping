import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function AuthInput({
  label,
  type,
  placeholder,
  icon: Icon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-800">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 pr-10 pl-10 text-sm outline-none transition focus:border-black focus:bg-white"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(prev => !prev)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;