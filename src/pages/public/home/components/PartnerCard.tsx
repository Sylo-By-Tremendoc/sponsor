
export const PartnerCard = ({
  name,
  description,
  logo,
}: {
  name: string;
  description: string;
  logo: string;
}) => {
  return (
    <div
      className="
        relative h-[240px] rounded-2xl overflow-hidden cursor-pointer
        shadow-sm hover:shadow-md transition-all
      "
    >
      <div
        className="
          absolute inset-0 bg-cover bg-no-repeat bg-center
          transition-transform duration-700
          hover:scale-105
        "
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-white/85 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Subtle shine on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
};
