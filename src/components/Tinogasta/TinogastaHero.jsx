import React from "react";

const TinogastaHero = ({ title, subtitle, imageUrl }) => (
  <section
    className={"relative bg-cover bg-center h-96 flex items-center justify-center text-center text-gray-600 dark:bg-gray-700 dark:text-white bg-gray-200"}
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <div className="absolute inset-0 bg-black opacity-10"></div>
    <div className="relative z-10">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="mt-4 text-xl">{subtitle}</p>
    </div>
  </section>
);

export default TinogastaHero;
