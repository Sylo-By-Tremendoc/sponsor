import { motion } from "motion/react";

export const PartnerCard = ({
  name,
  description,
  index = 0,
}: {
  name: string;
  description: string;
  index?: number;
}) => {
  return (
    <motion.div
      className="bg-white hover:bg-[#0000001A] rounded-2xl p-6 shadow-sm
        hover:shadow-md border border-gray-100 transition-all duration-300
        hover:-translate-y-1 relative"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15 }}
      viewport={{ once: true }}
    >
      <h3 className="font-semibold text-gray-900 text-base mb-3">{name}</h3>

      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

      {/* subtle gradient hover */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-400/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none" />
    </motion.div>
  );
};
