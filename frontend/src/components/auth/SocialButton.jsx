function SocialButton({
    children,
    icon,
}) {
    return (
        <button
            type="button"
            className="h-11 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm font-medium text-zinc-800"
        >
            {icon}
            {children}
        </button>
    );
}

export default SocialButton;