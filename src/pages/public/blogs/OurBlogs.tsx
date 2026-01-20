import Pill from "@/components/common/Pill";
import { Section, TitleText } from "../home/components";
import blogImg from "../../../assets/images/blog-image.png";
import blogImg1 from "../../../assets/images/blog-image-1.png";
import blogImg2 from "../../../assets/images/blog-image-2.png";
import { BlogCard } from "../home/components/BlogCard";
import { useNavigate } from "react-router-dom";

const OurBlogs = () => {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: "1",
      image: blogImg,
      title: "The Importance of Regular Health Check-ups",
      description:
        "Discover strategies to enhance your marketing return on investment effectively.",
      author: "Ryan Thorf",
      authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "May 2, 2022",
      readTime: "4 min read",
    },
    {
      id: "2",
      image: blogImg1,
      title: "How Diaspora Families Can Support Healthcare Back Home",
      description:
        "Practical ways to ensure your loved ones receive quality healthcare coverage.",
      author: "Amaka Okoye",
      authorAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      date: "June 14, 2022",
      readTime: "5 min read",
    },
    {
      id: "3",
      image: blogImg2,
      title: "Understanding Health Insurance Plans in Africa",
      description:
        "A simple breakdown of coverage options, benefits, and what to look out for.",
      author: "David Mensah",
      authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "July 8, 2022",
      readTime: "6 min read",
    },
    {
      id: "4",
      image: blogImg,
      title: "The Importance of Regular Health Check-ups",
      description:
        "Discover strategies to enhance your marketing return on investment effectively.",
      author: "Ryan Thorf",
      authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "May 2, 2022",
      readTime: "4 min read",
    },
    {
      id: "5",
      image: blogImg1,
      title: "How Diaspora Families Can Support Healthcare Back Home",
      description:
        "Practical ways to ensure your loved ones receive quality healthcare coverage.",
      author: "Amaka Okoye",
      authorAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      date: "June 14, 2022",
      readTime: "5 min read",
    },
    {
      id: "6",
      image: blogImg2,
      title: "Understanding Health Insurance Plans in Africa",
      description:
        "A simple breakdown of coverage options, benefits, and what to look out for.",
      author: "David Mensah",
      authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "July 8, 2022",
      readTime: "6 min read",
    },
  ];

  return (
    <Section className="space-y-4">
      <Pill text="OUR BLOG" />
      <TitleText className="m-0">Explore Our Latest News & Insights</TitleText>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
            authorAvatar={post.authorAvatar}
            date={post.date}
            readTime={post.readTime}
            onClick={(id) => navigate(`/blogs/${id}`)}
          />
        ))}
      </div>
    </Section>
  );
};

export default OurBlogs;
