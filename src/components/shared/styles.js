export const pageStyles = {
  catamarca: {
    hero: {
      badge: "inline-block px-6 py-2 rounded-full text-sm font-medium bg-yellow-400 text-white uppercase tracking-wide shadow-sm",
      title: "text-5xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent",
      subtitle: "text-xl max-w-2xl mx-auto leading-relaxed",
      container: "text-center space-y-6"
    },
    grid: {
      container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
      card: "group relative h-[400px] cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    },
    modal: {
      gradient: "from-yellow-400 via-green-400 to-yellow-400"
    }
  },
  fiambala: {
    hero: {
      badge: "inline-block px-4 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white uppercase tracking-wider transform -rotate-2",
      title: "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 transform hover:scale-105 transition-transform",
      subtitle: "text-lg md:text-xl max-w-3xl mx-auto leading-relaxed italic",
      container: "text-center space-y-8"
    },
    grid: {
      container: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8",
      card: "group relative h-[450px] cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500"
    },
    modal: {
      gradient: "from-orange-500 to-red-500"
    }
  },
  tinogasta: {
    hero: {
      badge: "inline-block px-5 py-2 rounded-xl text-sm font-semibold bg-purple-600 text-white uppercase tracking-wide transform hover:rotate-1 transition-transform",
      title: "text-7xl font-extrabold text-purple-600 dark:text-purple-400 transform hover:scale-105 transition-transform duration-300",
      subtitle: "text-xl max-w-4xl mx-auto leading-relaxed font-light",
      container: "text-center space-y-10"
    },
    grid: {
      container: "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8",
      card: "group relative break-inside-avoid h-[500px] cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20"
    },
    modal: {
      gradient: "from-purple-600 to-indigo-600"
    }
  },
  antofagasta: {
    hero: {
      badge: "inline-block px-6 py-2 rounded-full text-sm font-bold bg-amber-500 text-white uppercase tracking-widest shadow-lg transform hover:-rotate-1",
      title: "text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600",
      subtitle: "text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium",
      container: "text-center space-y-12"
    },
    grid: {
      container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      card: "group relative h-[350px] cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
    },
    modal: {
      gradient: "from-amber-500 to-orange-600"
    }
  }
};
