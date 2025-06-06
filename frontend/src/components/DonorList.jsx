import { useEffect, useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const donorsPerPage = 9;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("https://doggie-don.onrender.com/api/getDonors");
        if (res.data.success) {
          setDonors(res.data.donors);
        }
      } catch (error) {
        console.error("Failed to fetch donors", error);
      }
    };

    fetchDonors();
  }, []);

  // Pagination logic
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);
  const totalPages = Math.ceil(donors.length / donorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 md:mb-10">
          <div className="bg-green-700 p-2 sm:p-3 rounded-xl shadow-lg">
            <PersonIcon className="text-white text-xl sm:text-2xl md:text-3xl" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700">
            Recent Donors
          </h2>
        </div>

        {/* Donor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {currentDonors.map((donor) => (
            <div 
              key={donor._id || donor.id} 
              className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-md transform transition-all duration-300 ease-in-out ${
                hoveredCard === (donor._id || donor.id) 
                ? 'scale-[1.02] shadow-xl border-green-200 bg-green-50/30' 
                : 'hover:shadow-lg hover:border-green-100'
              }`}
              onMouseEnter={() => setHoveredCard(donor._id || donor.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="space-y-3">
                <div className={`flex items-center gap-2 transition-transform duration-300 ${
                  hoveredCard === (donor._id || donor.id) ? 'scale-105' : ''
                }`}>
                  <div className={`transition-colors duration-300 ${
                    hoveredCard === (donor._id || donor.id) ? 'text-green-600' : 'text-green-700'
                  }`}>
                    <PersonIcon />
                  </div>
                  <h3 className={`font-semibold text-base sm:text-lg transition-colors duration-300 ${
                    hoveredCard === (donor._id || donor.id) ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {donor.name || 'Anonymous Donor'}
                  </h3>
                </div>

                <div className={`flex items-center gap-2 transition-all duration-300 ${
                  hoveredCard === (donor._id || donor.id) ? 'transform translate-x-1' : ''
                }`}>
                  <div className={`transition-colors duration-300 ${
                    hoveredCard === (donor._id || donor.id) ? 'text-green-600' : 'text-green-700'
                  }`}>
                    <CurrencyRupeeIcon />
                  </div>
                  <p className="text-gray-600 font-medium">₹{donor.amount?.toLocaleString('en-IN') || '0'}</p>
                </div>

                <div className={`flex items-center gap-2 transition-all duration-300 ${
                  hoveredCard === (donor._id || donor.id) ? 'transform translate-x-1' : ''
                }`}>
                  <div className={`transition-colors duration-300 ${
                    hoveredCard === (donor._id || donor.id) ? 'text-green-600' : 'text-green-700'
                  }`}>
                    <CalendarTodayIcon />
                  </div>
                  <p className="text-gray-600 text-sm">
                    {new Date(donor.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm sm:text-base font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-green-700 hover:bg-green-50 border-green-200"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border text-sm sm:text-base font-medium transition-colors duration-200 ${
                page === currentPage
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-green-700 hover:bg-green-50 border-green-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm sm:text-base font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-green-700 hover:bg-green-50 border-green-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorList;