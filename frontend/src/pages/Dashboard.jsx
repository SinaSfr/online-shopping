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
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-200 h-16 px-4 md:px-6 flex items-center justify-between">

        <h1 className="text-lg md:text-xl font-bold">
          پنل کاربری
        </h1>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-medium">
              علی محمدی
            </p>

            <p className="text-xs text-zinc-500">
              کاربر ویژه
            </p>
          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

      </header>

      <div className="flex">

        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-l border-zinc-200 min-h-[calc(100vh-64px)] p-4">

          <nav className="space-y-2">

            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-black text-white">
              <LayoutDashboard size={18} />
              داشبورد
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100">
              <ShoppingBag size={18} />
              سفارش‌های من
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100">
              <Heart size={18} />
              علاقه‌مندی‌ها
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100">
              <User size={18} />
              اطلاعات حساب
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50"
            >
              <LogOut size={18} />
              خروج از حساب
            </button>

          </nav>

        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 pb-24 lg:pb-6">

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Package size={22} />
              <p className="text-zinc-500 text-sm mt-3">
                سفارش‌ها
              </p>
              <h3 className="text-2xl font-bold">
                12
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Wallet size={22} />
              <p className="text-zinc-500 text-sm mt-3">
                مجموع خرید
              </p>
              <h3 className="text-2xl font-bold">
                18.5M
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Heart size={22} />
              <p className="text-zinc-500 text-sm mt-3">
                علاقه‌مندی‌ها
              </p>
              <h3 className="text-2xl font-bold">
                24
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <Star size={22} />
              <p className="text-zinc-500 text-sm mt-3">
                امتیاز باشگاه
              </p>
              <h3 className="text-2xl font-bold">
                950
              </h3>
            </div>

          </div>

          {/* Orders */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-6">

            <h2 className="text-lg font-bold mb-4">
              آخرین سفارش‌ها
            </h2>

            <div className="space-y-4">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 pb-3">
                <div>
                  <h3 className="font-medium">
                    iPhone 15 Pro
                  </h3>
                  <p className="text-sm text-zinc-500">
                    سفارش #1201
                  </p>
                </div>

                <span className="text-green-600 text-sm mt-2 sm:mt-0">
                  تحویل شده
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 pb-3">
                <div>
                  <h3 className="font-medium">
                    AirPods Pro
                  </h3>
                  <p className="text-sm text-zinc-500">
                    سفارش #1202
                  </p>
                </div>

                <span className="text-yellow-600 text-sm mt-2 sm:mt-0">
                  در حال پردازش
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">
                    MacBook Air M4
                  </h3>
                  <p className="text-sm text-zinc-500">
                    سفارش #1203
                  </p>
                </div>

                <span className="text-blue-600 text-sm mt-2 sm:mt-0">
                  ارسال شده
                </span>
              </div>

            </div>

          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-6">

            <h2 className="text-lg font-bold mb-4">
              علاقه‌مندی‌های اخیر
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="border rounded-xl p-4">
                <p className="font-medium">
                  Samsung S25 Ultra
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  49,900,000 تومان
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-medium">
                  Playstation 5
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  31,500,000 تومان
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-medium">
                  Apple Watch
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  15,900,000 تومان
                </p>
              </div>

            </div>

          </div>

        </main>

      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-zinc-200 h-16 flex items-center justify-around">

        <button>
          <LayoutDashboard size={20} />
        </button>

        <button>
          <ShoppingBag size={20} />
        </button>

        <button>
          <Heart size={20} />
        </button>

        <button>
          <User size={20} />
        </button>

      </div>

    </div>
  );
}

export default Dashboard;