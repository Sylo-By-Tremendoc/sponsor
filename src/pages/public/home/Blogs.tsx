import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Button } from "../../../components/common/Button";
import { Section, TitleText } from "./components";
// import blogImg from "../../../assets/images/blog-image.png";
// import blogImg1 from "../../../assets/images/blog-image-1.png";
// import blogImg2 from "../../../assets/images/blog-image-2.png";
// import { BlogCard } from "./components/BlogCard";
import BlogComingSoon from "../blogs/components/BlogComingSoon";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();

  // const blogPosts = [
  //   {
  //     id: 1,
  //     image: blogImg,
  //     title: "The Importance of Regular Health Check-ups",
  //     description:
  //       "Discover strategies to enhance your marketing return on investment effectively.",
  //     author: "Ryan Thorf",
  //     authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
  //     date: "May 2, 2022",
  //     readTime: "4 min read",
  //   },
  //   {
  //     id: 2,
  //     image: blogImg1,
  //     title: "How Diaspora Families Can Support Healthcare Back Home",
  //     description:
  //       "Practical ways to ensure your loved ones receive quality healthcare coverage.",
  //     author: "Amaka Okoye",
  //     authorAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
  //     date: "June 14, 2022",
  //     readTime: "5 min read",
  //   },
  //   {
  //     id: 3,
  //     image: blogImg2,
  //     title: "Understanding Health Insurance Plans in Africa",
  //     description:
  //       "A simple breakdown of coverage options, benefits, and what to look out for.",
  //     author: "David Mensah",
  //     authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
  //     date: "July 8, 2022",
  //     readTime: "6 min read",
  //   },
  // ];

  return (
    <Section className="bg-[#F9F9FB]">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-5">
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
          <Button onClick={() => navigate("/blogs")}>
            View More Blogs Posts
          </Button>
        </motion.div>
      </div>

      <BlogComingSoon className="p-5"/>

      {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
            authorAvatar={post.authorAvatar}
            date={post.date}
            readTime={post.readTime}
          />
        ))}
      </div> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex md:hidden mt-10"
      >
        <Button onClick={() => navigate("/blogs")} className="mx-auto">
          View More Blogs Posts
        </Button>
      </motion.div>
    </Section>
  );
};

export default Blogs;
