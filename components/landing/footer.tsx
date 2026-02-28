import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cat-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <CATLogo className="h-5 w-auto" />
            <span className="font-heading font-black text-lg text-white">
              Ready
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/40">
            Built for Caterpillar Code Jam 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

function CATLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0H14V6H6V26H14V32H6C2.68629 32 0 29.3137 0 26V6Z"
        fill="white"
      />
      <path
        d="M24 0H40L50 32H42L40 24H24L22 32H14L24 0Z"
        fill="white"
      />
      <path
        d="M32 8L26 20H38L32 8Z"
        fill="#FFCD11"
      />
      <path
        d="M52 0H80V6H70V32H62V6H52V0Z"
        fill="white"
      />
    </svg>
  );
}
