import {
    Mail,
    Lock,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import SocialButton from "../components/auth/SocialButton";

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-50 to-white p-6">

            <div className="w-full max-w-md">

                <AuthCard
                    title="خوش برگشتی"
                    subtitle="برای ادامه مسیر وارد حساب کاربری خود شوید"
                >

                    <form className="space-y-5">

                        <AuthInput
                            label="ایمیل"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                        />

                        <AuthInput
                            label="رمز عبور"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                        />

                        {/* Remember me */}
                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-xs text-zinc-500">
                                <input type="checkbox" />
                                مرا به خاطر بسپار
                            </label>

                            <a
                                href="#"
                                className="text-xs font-medium text-black hover:opacity-70"
                            >
                                رمز عبور را فراموش کرده‌اید؟
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
                        >
                            ورود
                        </button>

                        {/* Divider */}
                        <div className="relative py-2">

                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200"></div>
                            </div>

                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-xs uppercase tracking-wider text-zinc-400">
                                    یا ادامه با
                                </span>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="grid grid-cols-2 gap-3">

                            <SocialButton icon={<FcGoogle size={18} />}>
                                گوگل
                            </SocialButton>

                            <SocialButton icon={<FaApple size={18} />}>
                                اپل
                            </SocialButton>

                        </div>

                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-zinc-500">
                        حساب کاربری ندارید؟
                        <a
                            href="#"
                            className="font-medium text-black ml-1"
                        >
                            ایجاد حساب
                        </a>
                    </p>

                </AuthCard>

            </div>
        </div>
    );
}

export default LoginPage;