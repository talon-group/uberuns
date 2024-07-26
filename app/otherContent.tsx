import React from 'react';

interface NewSectionProps {
  title: string;
  imageSrc: string;
  content: React.ReactNode;
}

const NewSection: React.FC<NewSectionProps> = ({ title, imageSrc, content }) => {
  return (
    <div className="bg-white text-black py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <img
              src={imageSrc}
              alt={title}
              className="rounded-lg w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className="text-lg text-gray-700">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSection;