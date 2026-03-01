"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Settings, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="bg-[#0f0f0f] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/cat-logo.jpg"
                alt="CAT"
                width={40}
                height={40}
                className="invert"
              />
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">CAT</span>
                <span className="text-cat-yellow font-bold text-lg ml-1">Ready</span>
              </div>
            </Link>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <span className="text-white/60 text-sm hidden sm:block">Field Manager Dashboard</span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5 text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cat-red rounded-full" />
            </button>

            {/* Settings */}
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Settings className="h-5 w-5 text-white/70" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-cat-yellow flex items-center justify-center">
                <User className="h-4 w-4 text-cat-black" />
              </div>
              <span className="text-white text-sm hidden md:block">Field Manager</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
