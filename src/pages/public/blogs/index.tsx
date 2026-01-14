import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BlogComingSoon from "./components/BlogComingSoon";

const Blogs = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar className="bg-white text-black border-0" />

      <BlogComingSoon />

      <Footer />

      {/* <StickyTableOfContents sections={sections} topOffset={72} /> */}
    </div>
  );
};

export default Blogs;
