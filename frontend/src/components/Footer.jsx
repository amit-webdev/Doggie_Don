import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from "../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#181d25] text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center gap-4">
        {/* Side-by-side Logo/Description and Contact Us */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-end">
              <img src={img} alt="DoggieDon Logo" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h2 className="text-white text-xl font-bold">DoggieDon</h2>
                <p className="text-sm text-gray-400">Caring for Every Paw</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs mb-4">
              Dedicated to providing love, care, and shelter to dogs in need. Together, we can make a difference in their lives.
            </p>
            <div className="flex gap-3 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><YouTubeIcon /></a>
            </div>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full max-w-xs">
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-1">
                123 Dog Care Street,<br />
                Bistupur District,<br />
                East <span className="font-semibold">Singhbhum</span>, JHARKHAND 831013
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <PhoneIcon className="text-green-500" />
                <span>+91 74889 99999</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <EmailIcon className="text-green-500" />
                <span>help@doggiedon.org</span>
              </div>
            </div>
          </div>
        </div>
        {/* Emergency Helpline - moved below Contact Us */}
        <div className="w-full flex justify-center mb-8">
          <div className="bg-[#232834] rounded-lg p-4 w-full max-w-xs text-center">
            <p className="text-green-400 text-sm font-medium mb-1">Emergency Helpline</p>
            <p className="text-white text-2xl font-bold mb-1 tracking-wide">1800-DOG-HELP</p>
            <p className="text-xs text-gray-400">Available 24/7 for urgent cases</p>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-[#232834] my-8 max-w-6xl mx-auto" />
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto bg-[#232834] rounded-2xl p-8 flex flex-col items-center mb-8 text-center">
        <FavoriteIcon className="text-green-500 text-3xl mb-2" />
        <h3 className="text-white text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-gray-400 mb-4">
          Subscribe to our newsletter to receive updates about our rescued dogs, success stories, and upcoming events.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-[#181d25] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center text-gray-500 text-xs gap-2 px-4">
        <div className="mb-2">© 2025 DoggieDon. All rights reserved. | Registered Charity No: 12345678</div>
        <div className="flex gap-4 justify-center">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Financial Transparency</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 