import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const PROBLEMS = [
  { id: 1, title: "Backend / Full-Stack Engineer", short: "Backend" },
  { id: 2, title: "Frontend Engineer", short: "Frontend" },
  { id: 3, title: "SRE / Platform / DevOps Engineer", short: "SRE/DevOps" },
  { id: 4, title: "Mobile Engineer (iOS / Android)", short: "Mobile" },
  { id: 5, title: "Data / ML Engineer", short: "Data/ML" },
  { id: 6, title: "Security Engineer", short: "Security" },
  { id: 7, title: "QA / Test Engineer", short: "QA/Test" },
  { id: 8, title: "Engineering Manager", short: "EM" },
  { id: 9, title: "Junior / Entry-Level Engineer", short: "Junior" },
  { id: 10, title: "Product Engineer / Generalist", short: "Product" },
];

const NAV_ITEMS = [
  { label: "Problems", href: "/problems", hasDropdown: true },
  { label: "Engineers", href: "/engineers" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
      {/* Glassy container with brand + nav */}
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
        {/* Logo only - enlarged for visual impact */}
        <Link
          to="/"
          className="flex items-center pr-4 border-r border-white/10"
        >
          <Logo className="h-14 w-auto" src="/logo.svg" alt="Buildcored logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setProblemsOpen(true)}
                  onMouseLeave={() => setProblemsOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition ${
                      location.pathname.startsWith("/problem")
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {/* Dropdown */}
                  {problemsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-lg border border-white/10 bg-black/90 backdrop-blur-md shadow-xl py-2">
                      <Link
                        to="/problems"
                        className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                      >
                        View All Problems
                      </Link>
                      <div className="border-t border-white/10 my-2" />
                      {PROBLEMS.map((problem) => (
                        <Link
                          key={problem.id}
                          to={`/problem/${problem.id}`}
                          className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                        >
                          <span className="text-primary font-mono">#{problem.id}</span>{" "}
                          {problem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`px-3 py-1.5 text-sm font-medium transition ${
                    location.pathname === item.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Apply Button */}
          <Link
            to="/problems"
            className="ml-2 rounded-full px-4 py-1.5 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
          >
            Apply
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-lg border border-white/10 bg-black/90 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setProblemsOpen(!problemsOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-white"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          problemsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {problemsOpen && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to="/problems"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-white/60"
                        >
                          View All Problems
                        </Link>
                        {PROBLEMS.map((problem) => (
                          <Link
                            key={problem.id}
                            to={`/problem/${problem.id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-white/60"
                          >
                            #{problem.id} {problem.short}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/problems"
              onClick={() => setMobileMenuOpen(false)}
              className="block mx-3 mt-4 text-center rounded-full px-4 py-2 text-sm font-medium text-black bg-white"
            >
              Apply
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
