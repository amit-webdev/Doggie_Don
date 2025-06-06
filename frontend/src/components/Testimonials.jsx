import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef();

  const testimonials = [
    {
      id: 1,
      quote: "DoggieDon has been instrumental in helping us provide emergency medical care to stray dogs. Their quick response and generous donors have saved countless lives.",
      author: "Dr. Sarah Johnson",
      role: "Veterinarian",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      quote: "I adopted my dog Bruno through DoggieDon two years ago. The care and rehabilitation he received was exceptional. Now he's a healthy, happy member of our family.",
      author: "Ravi Mehta",
      role: "Dog Adopter",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      quote: "I've been donating to DoggieDon for over a year now. What I love most is how they keep me updated on the impact of my donations.",
      author: "Kavya Nair",
      role: "Regular Donor",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 4,
      quote: "Working with DoggieDon has been a game-changer for our rescue operations. Their systematic approach has set a new standard in animal welfare.",
      author: "Animal Welfare Society",
      role: "Partner Organization",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
    },
    {
      id: 5,
      quote: "The dedication and love shown by DoggieDon's team is truly inspiring. They go above and beyond to ensure every dog gets the care they need.",
      author: "Michael Chen",
      role: "Volunteer",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 6,
      quote: "Thanks to DoggieDon, I found my perfect companion. Their matching process and support throughout the adoption journey was exceptional.",
      author: "Priya Sharma",
      role: "Dog Parent",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 7,
      quote: "As a vet clinic, we've seen firsthand the impact of DoggieDon's work. Their commitment to animal welfare is unmatched.",
      author: "Dr. James Wilson",
      role: "Partner Veterinarian",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 8,
      quote: "The transparency and regular updates from DoggieDon give me confidence that my donations are making a real difference.",
      author: "Lisa Thompson",
      role: "Monthly Donor",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  const totalSlides = Math.ceil(testimonials.length / 4);

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stories of Hope & Love
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Hear from our community of donors, adopters, volunteers, and partners who
            have experienced the joy of making a difference in a dog's life.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {testimonials.slice(slideIndex * 4, (slideIndex + 1) * 4).map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col h-full"
                    >
                      <div className="text-green-500 mb-4">
                        <FormatQuoteIcon sx={{ fontSize: 40 }} />
                      </div>

                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, index) => (
                          <StarIcon key={index} className="text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-600 flex-grow mb-6 text-sm sm:text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center mt-auto">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="text-gray-600" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-green-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Want to Share Your Story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            If DoggieDon has touched your life or if you've witnessed our impact, we'd love to hear from you. Your story could inspire others to join our mission.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium">
              Share Your Story
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-colors duration-200 font-medium">
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 