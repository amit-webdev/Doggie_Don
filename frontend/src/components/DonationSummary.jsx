import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import DonationPreviewModal from "./DonationPreview";
import PaymentModal from "./PaymentModal";

const DonationSummary = ({ cart, total, onReset, updateCartItem, removeCartItem }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    setShowHelp(cart.length === 0);
  }, [cart]);

  const handlePaymentClick = () => {
    setOpenPreview(false);
    setTimeout(() => {
      setIsPaymentOpen(true);
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 space-y-4 border border-gray-100">
      {/* Tax and info text */}
      <div className="text-center space-y-2 pb-4 border-b border-gray-100">
        <p className="text-xs text-primary/70">
          Tax exempted under section 80G(5)(iii)
        </p>
        <p className="text-xs text-primary/70">
          Video for contribution above Rs 2000
        </p>
      </div>

      {/* Top section: Help or Cart summary */}
      <div className="pt-2">
        {showHelp ? (
          <button 
            className="w-full bg-green-700 text-white py-3 rounded-xl font-medium transform transition-all duration-200 hover:shadow-lg hover:opacity-90 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              const el = document.getElementById("donation-items");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            HELP DOGGY DON
          </button>
        ) : (
          <div className="bg-green-700 text-white rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{cart.length} item(s)</span>
              <span className="text-white/60">|</span>
              <span className="font-bold">₹ {total}</span>
            </div>
            <button
              onClick={onReset}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Reset Cart"
            >
              <RefreshIcon fontSize="small" className="text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Donate button */}
      {cart.length > 0 && (
        <button
          className="w-full bg-white text-primary border border-primary/20 py-3 rounded-xl font-medium hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          onClick={() => setOpenPreview(true)}
        >
          Review Donation
        </button>
      )}

      {/* Payment options 
      <div className="text-center space-y-4">
        <p className="text-sm text-primary/70">All Cards & Net banking Accepted</p>
        <div className="flex justify-center gap-2">
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="/rupay.png" alt="RuPay" className="h-6" />
        </div>
      </div>*/}

      {/* Modals */}
      <DonationPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
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
    </div>
  );
};

export default DonationSummary;
