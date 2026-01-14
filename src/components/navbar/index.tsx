import { useState } from "react";
import { cn } from "../../utils/class-name";
import RightSection from "./components/RightSection";
import { Link } from "react-router-dom";
import Icons from "../common/Icons";
import Typography from "../common/Typography";

const Navbar = ({ className }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    // { name: "About Us", href: "/about-us" },
    // { name: "How it works", href: "#" },
    // { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 text-white py-4 px-6 md:px-16 flex justify-between items-center",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-1">
        <Icons iconName="logo" />
        <Typography variant={"xSmallText"}>By Tremendoc</Typography>
      </div>

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

      {/* Country selector */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <RightSection />
      </div>

      {/* Mobile Menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col gap-1"
      >
        <span className="w-5 h-0.5 bg-white"></span>
        <span className="w-5 h-0.5 bg-white"></span>
        <span className="w-5 h-0.5 bg-white"></span>
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0D0D0D] border-t border-gray-800 md:hidden">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
