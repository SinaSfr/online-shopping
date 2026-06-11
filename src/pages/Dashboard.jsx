import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Package,
  Wallet,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* Header */}
      <header className="bg-white border-b border-zinc-200 h-16 flex items-center justify-between px-6">

        <h1 className="text-xl font-bold">
          داشبورد کاربری
        </h1>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-medium">علی محمدی</p>
            <p className="text-xs text-zinc-500">
              کاربر ویژه
            </p>
          </div>
        </div>

      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white border-l border-zinc-200 min-h-[calc(100vh-64px)] p-4">

          <nav className="space-y-2">

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl bg-black text-white"
            >
              <LayoutDashboard size={18} />
              داشبورد
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100"
            >
              <ShoppingBag size={18} />
              سفارش‌ها
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100"
            >
              <Heart size={18} />
              علاقه‌مندی‌ها
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100"
            >
              <User size={18} />
              حساب کاربری
            </a>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50"
            >
              <LogOut size={18} />
              خروج از حساب
            </button>

          </nav>

        </aside>

        {/* Content */}
        <main className="flex-1 p-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Package className="mb-3" />
              <p className="text-zinc-500 text-sm">
                سفارش‌ها
              </p>
              <h3 className="text-2xl font-bold">
                12
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Wallet className="mb-3" />
              <p className="text-zinc-500 text-sm">
                کیف پول
              </p>
              <h3 className="text-2xl font-bold">
                3,450,000
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Heart className="mb-3" />
              <p className="text-zinc-500 text-sm">
                علاقه‌مندی‌ها
              </p>
              <h3 className="text-2xl font-bold">
                18
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Star className="mb-3" />
              <p className="text-zinc-500 text-sm">
                امتیاز باشگاه مشتریان
              </p>
              <h3 className="text-2xl font-bold">
                950
              </h3>
            </div>

          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm mt-6 p-6">

            <h2 className="text-lg font-bold mb-4">
              آخرین سفارش‌ها
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-3">
                <span>تور استانبول</span>
                <span className="text-green-600">
                  تکمیل شده
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>تور دبی</span>
                <span className="text-yellow-600">
                  در انتظار پرداخت
                </span>
              </div>

              <div className="flex justify-between">
                <span>تور آنتالیا</span>
                <span className="text-blue-600">
                  در حال بررسی
                </span>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;