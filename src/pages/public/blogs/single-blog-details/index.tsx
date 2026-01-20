import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StickyTableOfContents from "@/utils/sticky-table-of-content";
import Hero from "./Hero";
import RelatedArticles from "./RelatedArticles";
import BlogContent from "./BlogContent";

const SingleBlogDetails = () => {
  const sections = [
    { id: "hero", label: "Main Section" },
    { id: "blog-content", label: "Blog Content" },
    { id: "related-articles", label: "Related Articles" },
  ];

  return (
    <div className="flex flex-col justify-between">
      <Navbar className="absolute top-0 left-0 right-0" />

      <div>
        <section id="hero">
          <Hero />
        </section>
        <section id="blog-content">
          <BlogContent />
        </section>
        <section id="related-articles">
          <RelatedArticles />
        </section>
      </div>

      <Footer />

      <StickyTableOfContents sections={sections} topOffset={72} />
    </div>
  );
};

export default SingleBlogDetails;
