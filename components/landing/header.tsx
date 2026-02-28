"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <CATLogo className="h-6 w-auto" />
            <span className="font-heading font-black text-xl text-cat-black">
              Ready
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/inspect"
              className="btn-primary text-sm px-4 py-2"
            >
              Start Inspection
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/inspect"
                className="btn-primary text-sm px-4 py-2 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Start Inspection
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// CAT Logo Component (minimal version)
function CATLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* C */}
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0H14V6H6V26H14V32H6C2.68629 32 0 29.3137 0 26V6Z"
        fill="#1A1A1A"
      />
      {/* A with yellow triangle */}
      <path
        d="M24 0H40L50 32H42L40 24H24L22 32H14L24 0Z"
        fill="#1A1A1A"
      />
      <path
        d="M32 8L26 20H38L32 8Z"
        fill="#FFCD11"
      />
      {/* T */}
      <path
        d="M52 0H80V6H70V32H62V6H52V0Z"
        fill="#1A1A1A"
      />
    </svg>
  );
}
