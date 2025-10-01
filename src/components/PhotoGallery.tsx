'use client';

const PhotoGallery = () => {
  const photos = [
    { id: 1, src: '/images/gallery/photo1.jpg', alt: 'TSA Competition' },
    { id: 2, src: '/images/gallery/photo2.jpg', alt: 'Team Meeting' },
    { id: 3, src: '/images/gallery/photo3.jpg', alt: 'Awards Ceremony' },
    { id: 4, src: '/images/gallery/photo4.jpg', alt: 'Project Presentation' },
    { id: 5, src: '/images/gallery/photo5.jpg', alt: 'Leadership Workshop' },
    { id: 6, src: '/images/gallery/photo6.jpg', alt: 'Community Service' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See our TSA chapter in action through these memorable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">{photo.alt}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">{photo.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
