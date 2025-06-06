import { useState, useEffect } from "react";
import Header from "../components/Header";
import DogCard from "../components/Donation";
import DonationPreviewModal from "../components/DonationPreview";
import DonationSummary from "../components/DonationSummary";
import PaymentModal from "../components/PaymentModal";
import DonorList from "../components/DonorList";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { auth } from "../firebase";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleDonate = (price, title) => {
    const index = cart.findIndex((item) => item.title === title);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { title, price, quantity: 1 }]);
    }
  };

  const updateCartItem = (index, quantity) => {
    if (quantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = quantity;
    setCart(updated);
  };

  const removeCartItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const handlePaymentClick = () => {
    setIsPreviewOpen(false);
    setTimeout(() => {
      setIsPaymentOpen(true);
    }, 300);
  };

  const resetCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-primary/5">
      <Header />

      <main className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 2xl:gap-12 relative">
          {/* Main Content */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div id="donation-items" className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
              <div className="max-w-[1600px] mx-auto">
                <DogCard handleDonate={handleDonate} />
              </div>
            </div>
          </div>

          {/* Donation Summary - Fixed on desktop, normal flow on mobile */}
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <div className="lg:sticky lg:top-24">
              <DonationSummary
                cart={cart}
                total={total}
                onReset={resetCart}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
                onDonateNow={() => setIsPreviewOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <DonationPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        cart={cart}
        total={total}
        updateCartItem={updateCartItem}
        removeCartItem={removeCartItem}
        onPaymentClick={handlePaymentClick}
      />

      <PaymentModal 
        open={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        total={total}
      />

      <DonorList/>
      <Testimonials />
      <Footer/>
    </div>
  );
};

export default Home;
