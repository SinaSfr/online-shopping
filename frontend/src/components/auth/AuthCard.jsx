function AuthCard({
    title,
    subtitle,
    children,
  }) {
    return (
      <div className="rounded-3xl bg-white border border-zinc-200 shadow-xl p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold text-zinc-900 lg:text-2xl">
            {title}
          </h1>
  
          <p className="mt-2 text-sm text-zinc-500">
            {subtitle}
          </p>
        </div>
  
        {children}
      </div>
    );
  }
  
  export default AuthCard;