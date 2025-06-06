import { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HomeIcon from "@mui/icons-material/Home";

const PaymentModal = ({ open, onClose, total }) => {
  if (!open) return null;

  const [formData, setFormData] = useState({
    currency: "INR",
    country: "India",
    amount: total ?? 0,
    email: "",
    phone: "",
    name: "",
    pan: "",
    pincode: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_pHCwWBfSkeI1qg",
      amount: Number(formData.amount) * 100, // Convert to number and to paise
      currency: formData.currency,
      name: "Doggy Don",
      description: "Thank you for your generous donation",
      handler: async function (response) {

        try {
          console.log(response.razorpay_payment_id, response.razorpay_order_id)
          // Prepare the data to be sent
          const donationData = {
            formData: {
              ...formData,
              amount: Number(formData.amount) // Ensure amount is a number
            },
            paymentDetails: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id
            }
          };

          const result = await axios.post(
            "http://localhost:5000/api/saveDonation",
            donationData,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          if (result.data.success) {
            alert("Thank you for your donation!");
            onClose();
          } else {
            alert("Error saving donation details.");
          }
        } catch (err) {
          console.error("Save Error:", err);
          alert("Something went wrong while saving your donation details.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        pan: formData.pan,
        pincode: formData.pincode
      },
      theme: {
        color: "#ff5722",
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Error initializing payment. Please try again.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[70] overflow-y-auto pt-12 sm:pt-16">
        <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4">
          <div className="w-full max-w-[85%] sm:max-w-[90%] lg:max-w-[900px] xl:max-w-[1000px] mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-green-700 text-white px-4 py-3 sm:px-5 sm:py-4 sticky top-0 z-10">
                <div className="flex justify-between items-start max-w-[900px] mx-auto">
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Complete Your Donation</h2>
                    <p className="text-white/90 text-sm lg:text-base">Fill in the details to proceed with your donation</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200 -mt-1"
                  >
                    <CloseIcon className="text-lg sm:text-xl" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-5">
                <div className="max-w-[900px] mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {/* Donation Details Section */}
                    <div className="bg-green-50 rounded-xl p-4 space-y-3 border border-green-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-700 p-2 rounded-lg shadow">
                          <CreditCardIcon className="text-white text-base sm:text-lg" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-green-700">
                          Donation Details
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-1">
                            Currency
                          </label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-green-700 text-sm"
                          >
                            <option value="INR">Indian Rupee (INR)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-1">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                          >
                            <option value="India">India</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-1">
                            Amount
                          </label>
                          <div className="relative">
                            <CurrencyRupeeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/60 text-sm" />
                            <input
                              type="text"
                              name="amount"
                              value={`${formData.amount}`}
                              readOnly
                              className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 font-semibold text-sm text-green-700 shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-green-50 rounded-xl p-4 space-y-3 border border-green-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-700 p-2 rounded-lg shadow">
                          <PersonIcon className="text-white text-base sm:text-lg" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-green-700">
                          Contact Information
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/60 text-sm" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-1">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/60 text-sm" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              pattern="[0-9]{10}"
                              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                              placeholder="Enter 10-digit number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mt-4 bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-700 p-2 rounded-lg shadow">
                        <HomeIcon className="text-white text-base sm:text-lg" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-green-700">
                        Address Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/60 text-sm" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          name="pan"
                          value={formData.pan}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                          placeholder="Enter PAN number (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Pincode *
                        </label>
                        <div className="relative">
                          <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700/60 text-sm" />
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm"
                            placeholder="Enter your pincode"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Complete Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white shadow-sm text-sm"
                        placeholder="Enter your complete address"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-4 max-w-md mx-auto">
                    <button
                      type="submit"
                      className="w-full bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transform transition-all duration-200 hover:shadow-lg hover:opacity-90 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
