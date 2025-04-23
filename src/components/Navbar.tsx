
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Contact, LogIn, LogOut } from "lucide-react";
import AnimatedImage3D from "./AnimatedImage3D";

const NAV_LINKS = [
  { name: "Home", to: "/", icon: <Home size={18} /> },
  { name: "About", to: "/about", icon: <Info size={18} /> },
  { name: "Contact", to: "/contact", icon: <Contact size={18} /> },
  { name: "Login", to: "/login", icon: <LogIn size={18} /> },
  { name: "Logout", to: "/logout", icon: <LogOut size={18} /> },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur flex items-center justify-between px-6 py-3 shadow-sm z-50 mb-8">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition-all">
        <div className="h-10 w-auto flex items-center">
          <AnimatedImage3D
            src="/lovable-uploads/1a6d6eaa-847f-4923-93f4-cc899e5f4183.png"
            alt="AIHealth Logo"
            className="h-10 w-32 max-w-xs"
          />
        </div>
        {/* Name is hidden because it's part of the logo image */}
      </Link>
      <div className="flex gap-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-all ${
              location.pathname === link.to ? "bg-accent text-accent-foreground" : "text-gray-700"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
