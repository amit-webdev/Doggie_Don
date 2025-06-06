const DonationPreviewModal = ({
  open,
  onClose,
  cart,
  total,
  updateCartItem,
  removeCartItem,
  onPaymentClick,
}) => {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-30 z-40" />

      <div className="fixed top-16 sm:top-20 inset-y-auto right-0 w-full sm:w-[400px] md:w-[450px] xl:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-out max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)]">
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 xl:p-8 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl md:text-2xl xl:text-3xl text-primary">Review Donation</h2>
              <button 
                onClick={onClose} 
                className="text-primary font-bold text-lg p-2 hover:bg-primary/5 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 md:p-6 xl:p-8">
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={item.title} className="bg-primary/5 rounded-xl p-4 relative">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary">{item.title}</h3>
                          <p className="text-sm text-primary/70 mt-1">Amount: ₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeCartItem(index)}
                          className="text-primary hover:bg-primary/10 p-1 rounded-full transition-colors"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-primary/10">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateCartItem(index, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            -
                          </button>
                          <span className="font-medium text-primary min-w-[2ch] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartItem(index, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="font-semibold text-primary">
                          Total: ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <div className="flex justify-between items-center py-4 border-t border-b">
                    <span className="font-semibold text-primary">Total Amount</span>
                    <span className="font-bold text-xl text-primary">₹{total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onClose}
                    className="w-full bg-primary/5 text-primary py-3 rounded-xl font-medium transform transition-all duration-200 hover:bg-primary/10 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Add More Items
                  </button>
                  <button
                    onClick={onPaymentClick}
                    className="w-full bg-green-700 text-white py-3 rounded-xl font-medium transform transition-all duration-200 hover:shadow-lg hover:opacity-90 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-primary/60">Your donation cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-primary/5 text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Browse Donations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPreviewModal;
