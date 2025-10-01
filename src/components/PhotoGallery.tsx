'use client';

import { useState } from 'react';

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery items - replace with actual photos
  const galleryItems = [
    {
      id: 1,
      title: "Team at Competition",
      description: "Our students competing at the regional TSA conference",
      category: "Competition"
    },
    {
      id: 2,
      title: "Project Presentation",
      description: "Students presenting their engineering design project",
      category: "Projects"
    },
    {
      id: 3,
      title: "Workshop Session",
      description: "Hands-on learning in our technology lab",
      category: "Learning"
    },
    {
      id: 4,
      title: "Award Ceremony",
      description: "Celebrating our chapter's achievements",
      category: "Achievements"
    },
    {
      id: 5,
      title: "Team Building",
      description: "Students collaborating on group projects",
      category: "Teamwork"
    },
    {
      id: 6,
      title: "Innovation Lab",
      description: "Students working with cutting-edge technology",
      category: "Innovation"
    }
  ];

  const categories = ["All", "Competition", "Projects", "Learning", "Achievements", "Teamwork", "Innovation"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-max">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-8">
            Chapter Gallery
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See our students in action - from competitions to collaborative projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-tsa-navy text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="card-compact group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-tsa-navy to-blue-600 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-center text-white spacing-y-sm">
                  <svg className="w-16 h-16 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-tsa-navy transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Modal for selected image */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="aspect-video bg-gradient-to-br from-tsa-navy to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white spacing-y-sm">
                    <svg className="w-24 h-24 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-2xl font-bold">{filteredItems[selectedImage]?.title}</p>
                    <p className="text-lg opacity-75">{filteredItems[selectedImage]?.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  {filteredItems[selectedImage]?.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {filteredItems[selectedImage]?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
