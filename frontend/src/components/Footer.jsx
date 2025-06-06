import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from "../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#1a1f2b] text-gray-300 py-16">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden">
                <img src={img} alt="DoggieDon Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">DoggieDon</h2>
                <p className="text-sm text-gray-400">Caring for Every Paw</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dedicated to providing love, care, and shelter to dogs in need. Together, we can make a difference in their lives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate Now</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/adopt" className="text-gray-400 hover:text-white transition-colors">Adopt a Dog</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Ways to Help */}
          <div className="lg:pl-8">
            <h3 className="text-white text-lg font-semibold mb-6">Ways to Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/food-nutrition" className="text-gray-400 hover:text-white transition-colors">Food & Nutrition</Link>
              </li>
              <li>
                <Link to="/medical-care" className="text-gray-400 hover:text-white transition-colors">Medical Care</Link>
              </li>
              <li>
                <Link to="/shelter" className="text-gray-400 hover:text-white transition-colors">Shelter & Housing</Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-400 hover:text-white transition-colors">Emergency Fund</Link>
              </li>
              <li>
                <Link to="/sponsor" className="text-gray-400 hover:text-white transition-colors">Sponsor a Dog</Link>
              </li>
              <li>
                <Link to="/monthly-giving" className="text-gray-400 hover:text-white transition-colors">Monthly Giving</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:pl-8">
            <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <LocationOnIcon className="text-green-500 mt-1" />
                <p className="text-sm">
                  123 Dog Care Street,<br />
                  Animal Welfare District,<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="text-green-500" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <EmailIcon className="text-green-500" />
                <p>help@doggiedon.org</p>
              </div>
              
              {/* Emergency Helpline */}
              <div className="bg-[#1e2432] rounded-lg p-4 mt-6">
                <p className="text-green-500 text-sm mb-2">Emergency Helpline</p>
                <p className="text-white text-xl font-bold mb-1">1800-DOG-HELP</p>
                <p className="text-xs text-gray-400">Available 24/7 for urgent cases</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-[#1e2432] rounded-2xl p-8 sm:p-10">
          <div className="max-w-3xl mx-auto">
            <FavoriteIcon className="text-green-500 text-3xl mb-4" />
            <h3 className="text-white text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter to receive updates about our rescued dogs, success stories, and upcoming events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#272d3b] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              />
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 