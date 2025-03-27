
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, Wallet, LogIn, Vote } from 'lucide-react';
import { useMetaMask } from '@/hooks/use-metamask';

const Navbar = () => {
  const { isConnected, account } = useMetaMask();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const formatWalletAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/90 backdrop-blur-md shadow-subtle'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 font-medium text-lg"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-semibold">TS</span>
          </div>
          <span>TransacShield</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`link-underline ${location.pathname === '/' ? 'font-medium' : 'text-muted-foreground hover:text-foreground transition-colors'}`}
          >
            Home
          </Link>
          <Link 
            to="/transactions" 
            className={`link-underline ${location.pathname === '/transactions' ? 'font-medium' : 'text-muted-foreground hover:text-foreground transition-colors'}`}
          >
            Transactions
          </Link>
          <Link 
            to="/how-it-works" 
            className={`link-underline ${location.pathname === '/how-it-works' ? 'font-medium' : 'text-muted-foreground hover:text-foreground transition-colors'}`}
          >
            How It Works
          </Link>
          <Link 
            to="/disputes" 
            className={`link-underline ${location.pathname === '/disputes' ? 'font-medium' : 'text-muted-foreground hover:text-foreground transition-colors'}`}
          >
            Disputes
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isConnected && account ? (
            <Link to="/transactions">
              <Button variant="outline" className="font-medium flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                {formatWalletAddress(account)}
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="font-medium">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
          <Link to="/transactions">
            <Button className="font-medium">
              <Shield className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container py-20">
          <nav className="flex flex-col space-y-8 text-lg">
            <Link
              to="/"
              className="py-2 border-b border-border"
            >
              Home
            </Link>
            <Link
              to="/transactions"
              className="py-2 border-b border-border"
            >
              Transactions
            </Link>
            <Link
              to="/how-it-works"
              className="py-2 border-b border-border"
            >
              How It Works
            </Link>
            <Link
              to="/disputes"
              className="py-2 border-b border-border"
            >
              Disputes
            </Link>
            <Link
              to="/pricing"
              className="py-2 border-b border-border"
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-4 pt-4">
              {isConnected && account ? (
                <Link to="/transactions">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {formatWalletAddress(account)}
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
              <Link to="/transactions">
                <Button
                  className="w-full"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  New Transaction
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
