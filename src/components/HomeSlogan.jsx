function HomeSlogan({ slogans }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mt-6">
        {slogans.map((slogan) => {
          const Icon = slogan.icon;
  
          return (
            <div
              key={slogan.id}
              className="group flex flex-col items-center text-center gap-3 bg-white p-6 rounded-2xl shadow-sm border border-zinc-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 transition">
                <Icon size={26} />
              </div>
  
              {/* Title */}
              <h3 className="text-base font-bold text-zinc-800">
                {slogan.title}
              </h3>
  
              {/* Subtitle */}
              <p className="text-sm text-zinc-500 leading-relaxed">
                {slogan.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default HomeSlogan;