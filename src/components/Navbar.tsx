import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "ORCAS", href: "/orcas" },
  { label: "Showcase", href: "/showcase" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-white/[0.06] bg-black/70 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/logo.svg"
              alt="Buildcored"
              className="h-14 w-auto opacity-90 hover:opacity-100 transition"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition ${
                  location.pathname === link.href ||
                  (link.href === "/problems" &&
                    location.pathname.startsWith("/problem"))
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/orcas"
              className="ml-4 inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
            >
              Join ORCAS
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5 text-white/60 hover:text-white transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-lg">
          <div className="flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-lg font-medium rounded-lg transition ${
                  location.pathname === link.href
                    ? "text-white bg-white/5"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/orcas"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
              >
                Join ORCAS
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
