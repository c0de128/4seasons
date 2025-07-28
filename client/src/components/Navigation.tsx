import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoPath from "@/assets/images/logo_sm.png";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 backdrop-blur-md shadow-sm border-b border-slate-200/30 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
              <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
            <a href="/sell" className="text-slate-600 hover:text-primary transition-colors duration-200">Sell</a>
            <a href="/property-management" className="text-slate-600 hover:text-primary transition-colors duration-200">Property Management</a>
            
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-slate-600 hover:text-primary transition-colors duration-200">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <a href="/home-valuation" className="w-full">Home Valuation</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#city-guides" className="w-full">City Guides</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#school-districts" className="w-full">School Districts</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#property-investment" className="w-full">Property Investment</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a href="#blog" className="w-full">Blog</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#faq" className="w-full">FAQ</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#terms" className="w-full">Terms & Conditions</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/#contact" className="w-full">Contact Us</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a href="/buy" className="block text-slate-600 hover:text-primary">Buy</a>
            <a href="/sell" className="block text-slate-600 hover:text-primary">Sell</a>
            <a href="/property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
            
            {/* Resources - Mobile Expanded */}
            <div className="border-t border-slate-100 pt-3 mt-3">
              <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
              <div className="pl-4 space-y-2">
                <a href="/home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                <a href="#city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                <a href="#school-districts" className="block text-slate-600 hover:text-primary text-sm">School Districts</a>
                <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                <a href="#blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                <a href="#faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                <a href="#terms" className="block text-slate-600 hover:text-primary text-sm">Terms & Conditions</a>
                <a href="/#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}