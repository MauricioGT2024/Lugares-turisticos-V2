import React from "react";

const TinogastaHero = ({ badge, title, subtitle }) => {
  return (
    <section
      className="relative rounded-lg p-8 md:p-16
        bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300
        dark:from-yellow-800 dark:via-yellow-900 dark:to-yellow-950
        text-gray-900 dark:text-yellow-100 shadow-lg"
      aria-label="Hero section de Tinogasta"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        {/* Badge */}
        <span
          className="inline-block px-3 py-1 text-sm font-semibold rounded-full
            bg-yellow-400 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100"
        >
          {badge}
        </span>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          {title}
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl max-w-xl leading-relaxed opacity-90">
          {subtitle}
        </p>
      </div>

      {/* Decoración adicional (solo decorativa) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-30
          bg-yellow-400 dark:bg-yellow-700 blur-3xl"
      />
    </section>
  );
};

export default TinogastaHero;
