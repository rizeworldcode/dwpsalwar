const InfiniteGridScroller = () => {
  // Array of slides. Each slide contains a unique grid configuration of images.
  const slides = [
    {
      id: 'slide-a',
      layout: 'grid grid-cols-3 grid-rows-2 gap-3 w-[640px] shrink-0 h-[280px] px-2',
      items: [
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6853.jpg.jpg', alt: 'School Assembly Hall', className: 'col-span-2 row-span-2' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04195.JPG.jpg', alt: 'Smiling Student Boy', className: 'col-span-1 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04201.JPG.jpg', alt: 'Students Reading Together', className: 'col-span-1 row-span-1' }
      ]
    },
    {
      id: 'slide-b',
      layout: 'grid grid-cols-3 grid-rows-2 gap-3 w-[640px] shrink-0 h-[280px] px-2',
      items: [
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC05227.JPG.jpg', alt: 'Graduation Day Celebration', className: 'col-span-2 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6873.jpg.jpg', alt: 'Stage Dance Performance', className: 'col-span-1 row-span-2' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC04209.JPG.jpg', alt: 'Students in Library', className: 'col-span-1 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08114.JPG.jpg', alt: 'Enthusiastic Girl Student', className: 'col-span-1 row-span-1' }
      ]
    },
    {
      id: 'slide-c',
      layout: 'grid grid-cols-3 grid-rows-2 gap-3 w-[640px] shrink-0 h-[280px] px-2',
      items: [
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6875.jpg.jpg', alt: 'Cultural Dance Performance', className: 'col-span-2 row-span-2' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08120.JPG.jpg', alt: 'Primary Student Girl', className: 'col-span-1 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08125.JPG.jpg', alt: 'Waving Student Girl', className: 'col-span-1 row-span-1' }
      ]
    },
    {
      id: 'slide-d',
      layout: 'grid grid-cols-3 grid-rows-2 gap-3 w-[640px] shrink-0 h-[280px] px-2',
      items: [
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08838.JPG.jpg', alt: 'Keyboard Player Student', className: 'col-span-2 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6891.jpg.jpg', alt: 'Girls Dance Performance', className: 'col-span-1 row-span-2' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/DSC08843.JPG.jpg', alt: 'Guided Choir Practice', className: 'col-span-1 row-span-1' },
        { src: 'https://res.cloudinary.com/dltsjw4cp/image/upload/v1/IMG_6908.jpg.jpg', alt: 'School House Ceremony', className: 'col-span-1 row-span-1' }
      ]
    }
  ];

  // We duplicate the list to ensure 100% seamless infinite looping marquee
  const duplicatedSlides = [...slides, ...slides];

  return (
    <section className="py-16 bg-gray-50 border-t border-b border-gray-100 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2 className="text-[#1a4d2e] text-3xl font-bold mb-2">DWPS Alwar in Action</h2>
        <p className="text-gray-600">A continuous panorama of our premium campus life, modern infrastructure, and student achievements. Hover to pause.</p>
      </div>

      {/* Marquee Outer Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Shadow Overlays for premium fade effect on edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* Sliding Flex Track running Left-To-Right */}
        <div className="animate-marquee-ltr flex">
          {duplicatedSlides.map((slide, slideIndex) => (
            <div key={`${slide.id}-${slideIndex}`} className={slide.layout}>
              {slide.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`${item.className} relative bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden group transition duration-300 hover:border-[#1a4d2e]/55 flex items-center justify-center p-1.5`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-semibold tracking-wide drop-shadow-sm">{item.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteGridScroller;
