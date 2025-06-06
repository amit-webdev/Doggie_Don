import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import img from "../assets/logo.jpeg";
import { auth, provider, signInWithPopup } from "../firebase";
import { Avatar, Menu, MenuItem } from "@mui/material";
// import DogCard from "./Dogcard";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setAnchorEl(null);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50">
        <div className="h-16 sm:h-20 border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-[2000px] mx-auto h-full">
            <div className="flex items-center h-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
              {/* Left Section - Navigation and Brand */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                <button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-primary/5 rounded-full transition-colors duration-200"
                  aria-label="Menu"
                >
                  <MenuIcon className="text-primary text-2xl sm:text-3xl" />
                </button>
                
                {/* logo */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={img}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-700">
                    DoggieDon
                  </span>
                </div>
              </div>

              {/* Right Section - Login/User Menu */}
              <div className="ml-auto flex items-center gap-4">
                {user ? (
                  <div className="relative">
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName}
                      className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem disabled className="text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">{user.displayName}</span>
                          <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                        <span className="font-medium">Logout</span>
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200"
                  >
                    <AccountCircleIcon className="text-green-700" />
                    <span className="text-green-700 font-medium">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] lg:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 lg:p-8 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={img}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-700">
                  DoggieDon
                </span>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-primary/5 rounded-full transition-colors duration-200"
                aria-label="Close menu"
              >
                <CloseIcon className="text-primary text-2xl sm:text-3xl" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 sm:p-6 lg:p-8">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => {
                    window.location.href = '/';
                    closeSidebar();
                  }}
                  className="w-full text-left px-4 py-3 sm:py-4 rounded-lg text-primary hover:bg-primary/5 hover:text-accent transition-all duration-200 font-medium text-base sm:text-lg"
                >
                  Profile
                </button>
              </li>
              <li>
                <a 
                  href="https://doggiedon-landing.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeSidebar}
                  className="block w-full text-left px-4 py-3 sm:py-4 rounded-lg text-primary hover:bg-primary/5 hover:text-accent transition-all duration-200 font-medium text-base sm:text-lg"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="https://iamank-it.github.io/ShopDoggieDon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeSidebar}
                  className="block w-full text-left px-4 py-3 sm:py-4 rounded-lg text-primary hover:bg-primary/5 hover:text-accent transition-all duration-200 font-medium text-base sm:text-lg"
                >
                  Shop
                </a>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const donorList = document.querySelector('#donor-list');
                    if (donorList) {
                      donorList.scrollIntoView({ behavior: 'smooth' });
                      closeSidebar();
                    }
                  }}
                  className="w-full text-left px-4 py-3 sm:py-4 rounded-lg text-primary hover:bg-primary/5 hover:text-accent transition-all duration-200 font-medium text-base sm:text-lg"
                >
                  Recent Donors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const footer = document.querySelector('footer');
                    if (footer) {
                      footer.scrollIntoView({ behavior: 'smooth' });
                      closeSidebar();
                    }
                  }}
                  className="w-full text-left px-4 py-3 sm:py-4 rounded-lg text-primary hover:bg-primary/5 hover:text-accent transition-all duration-200 font-medium text-base sm:text-lg"
                >
                  Address
                </button>
              </li>
              {user && (
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 sm:py-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-base sm:text-lg"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
