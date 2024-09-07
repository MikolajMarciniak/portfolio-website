import React from 'react';

const ProjectsSection = () => {
  return (
    <section className="projects-section py-16 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project Card */}
          <div className="project-card p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Project Title</h3>
            <p className="text-sm">
              Brief description of the project. Highlight key features and technologies used.
            </p>
          </div>
          {/* Add more project cards as needed */}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
