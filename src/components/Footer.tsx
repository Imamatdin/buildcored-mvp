import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Links section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/orcas" className="text-sm text-white/50 hover:text-white transition">
                  ORCAS Challenge
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="text-sm text-white/50 hover:text-white transition">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-white/50 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Imamatdin/buildcored-mvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
              Join the Community
            </h4>
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/buildcored"
              method="post"
              target="popupwindow"
              className="flex items-center gap-2"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-white/90 transition shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Dot grid + tagline */}
        <div className="py-12 flex items-center gap-8">
          {/* Dot grid pattern */}
          <div className="flex-1 select-none" aria-hidden="true">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(24px,1fr))] gap-y-5">
              {Array.from({ length: 120 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/[0.08] mx-auto"
                />
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light italic text-white/20 shrink-0">
            Keep building.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.04] py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Buildcored. Open source.
          </p>
          <p className="text-xs text-white/25">
            Built for engineers, by engineers.
          </p>
        </div>
      </div>
    </footer>
  );
}
