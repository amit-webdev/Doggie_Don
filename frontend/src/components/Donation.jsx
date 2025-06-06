import { useState } from "react";

const DogCard = ({ handleDonate }) => {
  const donationOptions = [
    {
      id: 1,
      amount: 300,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60",
      title: "Feed dogs",
      desc: "Your donation will help us provide nutritious meals to our furry friends. Each meal ensures they stay healthy and happy.",
    },
    {
      id: 2,
      amount: 500,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60",
      title: "Monthly care",
      desc: "Support our monthly care program covering vaccinations, grooming, and regular health check-ups for our rescued dogs.",
    },
    {
      id: 3,
      amount: 700,
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&auto=format&fit=crop&q=60",
      title: "Medicines",
      desc: "Help us purchase essential medicines and medical supplies for treating injured and sick dogs in need of immediate care.",
    },
    {
      id: 4,
      amount: 500,
      image: "https://images.unsplash.com/photo-1601758177266-bc599de87707?w=500&auto=format&fit=crop&q=60",
      title: "Shelter expansion",
      desc: "Contribute to expanding our shelter facilities to accommodate more rescued dogs and provide them with a safe haven.",
    },
    {
      id: 5,
      amount: 700,
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format&fit=crop&q=60",
      title: "Emergency Rescue",
      desc: "Support our emergency rescue operations to save injured and abandoned dogs from dangerous situations 24/7.",
    },
  ];
  
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleReadMore = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleCustomDonation = () => {
    if (customAmount && !isNaN(customAmount) && Number(customAmount) >= 100) {
      handleDonate(Number(customAmount), "Custom Donation");
      setCustomAmount(""); // Reset the input after donation
    }
  };
  
  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        {donationOptions.map((option) => {
          const isExpanded = expandedCardId === option.id;
          const isHovered = hoveredCard === option.id;
          const shortDesc = option.desc.slice(0, 75) + "...";

          return (
            <div
              key={option.id}
              className={`group bg-white rounded-2xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out flex flex-col ${
                isHovered ? 'scale-[1.02] -translate-y-1' : ''
              } w-full mx-auto min-h-[420px] border border-gray-100`}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-t-2xl h-[200px]">
                <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-300 group-hover:bg-black/70"/>
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl sm:text-2xl z-20 drop-shadow-lg group-hover:translate-y-[-2px] transition-transform duration-300">
                  {option.title}
                </h3>
              </div>

              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <p className="text-gray-700 text-base leading-relaxed mb-2">
                    {isExpanded ? option.desc : shortDesc}
                  </p>
                  <button
                    className="text-green-600 text-sm hover:text-green-700 focus:outline-none transition-colors duration-200 hover:underline"
                    onClick={() => toggleReadMore(option.id)}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl">
                    <span className="text-gray-700 text-base font-medium">Donation Amount</span>
                    <span className="text-2xl font-bold text-green-700">₹{option.amount}</span>
                  </div>
                  
                  <button
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 shadow-sm hover:shadow active:scale-[0.98]"
                    onClick={() => handleDonate(option.amount, option.title)}
                  >
                    Add to Donation
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Custom Amount Donation Card */}
        <div
          className={`group bg-white rounded-2xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out flex flex-col ${
            hoveredCard === 'custom' ? 'scale-[1.02] -translate-y-1' : ''
          } w-full mx-auto min-h-[420px] border border-gray-100`}
          onMouseEnter={() => setHoveredCard('custom')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative overflow-hidden rounded-t-2xl h-[200px]">
            <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-300 group-hover:bg-black/70"/>
            <img
              src="https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&auto=format&fit=crop&q=60"
              alt="Donation Box"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl sm:text-2xl z-20 drop-shadow-lg group-hover:translate-y-[-2px] transition-transform duration-300">
              Custom Amount
            </h3>
          </div>

          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <p className="text-gray-700 text-base leading-relaxed">
                You can donate any amount of your choice (minimum ₹100) which will be used for fodder to feed dogs.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">₹</span>
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount (min ₹100)"
                  className="w-full pl-10 pr-4 py-3 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm hover:border-green-500/50"
                  min="100"
                />
              </div>
              
              <button
                className={`w-full py-3 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 shadow-sm hover:shadow active:scale-[0.98] ${
                  !customAmount || isNaN(customAmount) || Number(customAmount) < 100
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800 text-white'
                }`}
                onClick={handleCustomDonation}
                disabled={!customAmount || isNaN(customAmount) || Number(customAmount) < 100}
              >
                Add Custom Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
