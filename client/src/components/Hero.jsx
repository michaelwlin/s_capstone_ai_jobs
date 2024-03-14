import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { Button } from 'flowbite-react';

const Hero = ({ setKeyword }) => {
  const handleClick = (value) => {
    setKeyword(value);
  };

  return (
    <div className="hero">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Find your best match{' '}
          <FaBriefcase className="inline-block align-bottom" />
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          MatchIQ uses AI to help find the best job for you!
        </p>
      </div>
      <div className="mt-10 text-center">
        <div className="flex flex-wrap gap-6 mb-5 justify-center">
          <Button color="light" pill onClick={() => handleClick('front-end')}>
            front-end
          </Button>
          <Button color="light" pill onClick={() => handleClick('ux designer')}>
            ux designer
          </Button>
          <Button color="light" pill onClick={() => handleClick('product manager')}>
            product manager
          </Button>
          <Button color="light" pill onClick={() => handleClick('marketing')}>
            marketing
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <Button color="light" pill onClick={() => handleClick('back-end')}>
            back-end
          </Button>
          <Button color="light" pill onClick={() => handleClick('cybersecurity')}>
            cybersecurity
          </Button>
          <Button color="light" pill onClick={() => handleClick('consulting')}>
            consulting
          </Button>
          <Button color="light" pill onClick={() => handleClick('banker')}>
            banker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
