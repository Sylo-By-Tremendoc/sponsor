import { useState } from "react";
import { cn } from "../../utils/class-name";
import RightSection from "./components/RightSection";
import { Link } from "react-router-dom";
import Icons from "../common/Icons";
import { motion, AnimatePresence } from "motion/react";

const Navbar = ({ className }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "How it works", href: "/how-it-works" },
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 text-white py-4 px-6 md:px-16 flex justify-between items-center",
        className,
      )}
    >
      <Link
        to="/"
        className="relative z-10 flex items-center gap-2 cursor-pointer"
      >
        <Icons iconName="logo" />
        <span className="text-sm font-semibold">SyloCare</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8 text-xs">
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.href ||
            (link.href !== "/" && location.pathname.startsWith(link.href));

          return (
            <Link
              key={link.name}
              to={link.href}
              className={`transition hover:text-primary ${
                isActive ? "text-primary font-medium" : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-2 text-sm">
        <RightSection />
      </div>

      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden relative w-8 h-8 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <span
          className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "rotate-45" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "-rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-[#0D0D0D] border-t border-gray-800 md:hidden z-50"
          >
            <nav className="flex flex-col items-center py-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
              text-gray-300 text-base font-medium
              hover:text-primary transition-colors
            "
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
