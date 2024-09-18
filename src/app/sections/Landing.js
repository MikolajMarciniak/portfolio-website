import React from 'react';
import TypedText from '../components/TypedText';

const LandingSection = () => {
  return (
    <section className="landing-section min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold">Hello, I'm <span className="shadow">Mikołaj Marciniak</span></h1>
        <div className="mt-6">
          <p className="text-4xl mt-4 text-white inline-block leading-none">
            and I'm a &nbsp;<TypedText />
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
