import { BsArrowRight } from "react-icons/bs";
import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Button } from "../../../components/common/Button";
import { Section, TitleText } from "./components";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Importance of Health Coverage for Families Abroad",
      description:
        "Explore why comprehensive healthcare coverage matters for loved ones back home and how to make the best decision.",
      image:
        "https://randomuser.me/api/portraits/men/3.jpg",
      date: "October 20, 2025",
      author: "Sylo Team",
    },
    {
      id: 2,
      title: "7 Countries, One Goal: Better Global Health Access",
      description:
        "Discover how Sylo is bridging healthcare access for families across 7 countries, providing reliable medical support.",
      image:
        "https://randomuser.me/api/portraits/women/1.jpg",
      date: "October 15, 2025",
      author: "Tremendoc Insights",
    },
    {
      id: 3,
      title: "How to Get Started with Family Health Plans in Minutes",
      description:
        "A simple 3-step guide to setting up your family’s coverage and ensuring quality care at home from abroad.",
      image:
        "https://randomuser.me/api/portraits/men/2.jpg",
      date: "October 10, 2025",
      author: "Health Desk",
    },
  ];
  return (
    <Section className="bg-[#F9F9FB]">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10">
        <div className="space-y-4">
          <Pill text="OUR BLOGS" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TitleText className="mb-0">Latest insights and trends</TitleText>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <Button>View More Blogs Posts</Button>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="h-52 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6 text-left">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {post.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">{post.author}</span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  Read More <BsArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex md:hidden mt-10"
      >
        <Button className="mx-auto">View More Blogs Posts</Button>
      </motion.div>
    </Section>
  );
};

export default Blogs;
