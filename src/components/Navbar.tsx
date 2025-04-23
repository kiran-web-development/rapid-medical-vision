
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Contact, LogIn, LogOut } from "lucide-react";

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
        <img src="/placeholder.svg" alt="MedScanAI" className="h-8 w-8" />
        MedScanAI
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
