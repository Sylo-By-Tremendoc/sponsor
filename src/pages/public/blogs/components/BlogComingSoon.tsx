import { cn } from "@/utils/class-name";
import { motion } from "framer-motion";
import { HiOutlineColorSwatch } from "react-icons/hi";

const BlogComingSoon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center p-10", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary/10"
        >
          <HiOutlineColorSwatch className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-2xl font-semibold mb-3">Blogs Coming Soon</h1>

        <p className="text-gray-500 mb-6 leading-relaxed">
          We’re working on insightful articles, healthcare updates, and expert
          stories just for you.
        </p>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "70%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>

        <span className="text-sm text-gray-400">
          Stay tuned — exciting content is on the way
        </span>
      </motion.div>
    </div>
  );
};

export default BlogComingSoon;
