import {
    FolderOpen,
    Home,
    Images,
    MonitorPlay,
    User,
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const items: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "screens", label: "Screens", icon: MonitorPlay },
  { id: "media", label: "Media", icon: Images },
  { id: "library", label: "Library", icon: FolderOpen },
  { id: "profile", label: "Profile", icon: User },
];

export default function GlassBottomNav() {
  const [active, setActive] = useState<string>("screens");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
    <nav
  className="
    relative
    pointer-events-auto
    flex items-center gap-3
    max-w-[340px] w-full
    rounded-full
    border border-white/40
    bg-white/20
    shadow-[0_20px_40px_rgba(0,0,0,0.25)]
    backdrop-blur-xl
    px-4 py-3
  "
>
  {/* 🔥 Strong glass blur layer */}
  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-2xl"></div>

  {/* 🔥 Fish-eye white left glow */}
  <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-20 h-20 
                  bg-white/40 blur-3xl rounded-full opacity-90"></div>

  {/* 🔥 Fish-eye white right glow */}
  <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-20 h-20
                  bg-white/40 blur-3xl rounded-full opacity-90"></div>

  {/* real nav content */}
  <div className="relative flex items-center gap-3">
    {items.map((item) => {
      const Icon = item.icon;
      const isActive = item.id === active;

      return isActive ? (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className="
            relative flex items-center gap-1.5
            rounded-full
            bg-gradient-to-r from-sky-400 to-sky-500
            text-white
            px-4 h-10
            text-[11px] font-semibold
            shadow-[0_12px_22px_rgba(56,189,248,0.5)]
            transition
          "
        >
          <Icon className="h-4 w-4" />
          {item.label}
        </button>
      ) : (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className="
            flex items-center justify-center
            w-11 h-11
            rounded-full bg-white/70
            border border-white/40
            text-gray-800
            backdrop-blur-lg
            shadow-[0_10px_20px_rgba(0,0,0,0.25)]
            transition hover:bg-white
          "
        >
          <Icon className="h-5 w-5" />
        </button>
      );
    })}
  </div>
</nav>

    </div>
  );
}
