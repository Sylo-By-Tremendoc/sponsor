import Pill from "../../../components/common/Pill";
import Typography from "../../../components/common/Typography";
import { Section, TitleText } from "../home/components";
import { TestimonialCard } from "./components";

const Testimonials = () => {
  return (
    <Section className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 bg-[#F9F9FB]">
      <div className="flex flex-col justify-between md:max-w-2xl">
        <div className="space-y-3">
          <Pill text="TESTIMONIAL" />
          <TitleText className="mb-3">What are They Talking About?</TitleText>
          <Typography variant={"smallText"} className="text-charcoal-gray">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography>
        </div>

        <div>
          <Typography></Typography>
        </div>
      </div>

      <div>
        <TestimonialCard />
      </div>
    </Section>
  );
};

export default Testimonials;

export type Testimonial = {
  id: number;
  name: string;
  quote: string;
  image: string;
  country: string;
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Felicia Ruben",
    quote:
      "This is the first time I've felt truly involved in my mum's healthcare since I moved abroad. I don't just ask if she's okay anymore — I know she is.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    country: "United Kingdom",
  },
  {
    id: 2,
    name: "Michael Adewale",
    quote:
      "SYLO has given me peace of mind knowing my dad receives quality care back home. The transparency is unmatched.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    country: "Canada",
  },
  {
    id: 3,
    name: "Chioma Nwosu",
    quote:
      "I love how easy it is to manage healthcare plans for my family. Everything feels personalized and reliable.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    country: "United States",
  },
];
