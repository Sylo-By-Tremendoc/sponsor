import { Button } from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import flagImg from "../../../assets/images/get-started.png";
import planAndPricingImg from "../../../assets/images/plan-and-pricing.png";
import salesImg from "../../../assets/images/sales-questions.png";
import usageGuideImg from "../../../assets/images/usage-guide.png";
import informationImg from "../../../assets/images/information.png";
import LineThrough from "@/components/common/LineThrough";

const Support = () => {
  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: flagImg,
      content:
        "Learn how to get started with our service. From signing up to your first session, we’ll walk you through each step for a smooth experience.",
    },
    {
      id: "pricing-plan",
      title: "Pricing and Plan",
      icon: planAndPricingImg,
      content:
        "Explore our flexible pricing plans and find one that best suits your needs. Whether you’re an individual or business, there’s an option for you.",
    },
    {
      id: "sales-questions",
      title: "Sales Questions",
      icon: salesImg,
      content:
        "Find answers to frequently asked questions about sales, payments, and discounts.",
    },
    {
      id: "usage-guide",
      title: "Usage Guide",
      icon: usageGuideImg,
      content:
        "Discover how to use our platform efficiently with easy-to-follow tutorials and examples.",
    },
    {
      id: "information",
      title: "Information",
      icon: informationImg,
      content:
        "Get general information about our services, policies, and company background.",
    },
  ];

  const [selected, setSelected] = useState(categories[1]);

  return (
    <div className="space-y-5">
      <Typography variant={"largeTextBold"}>Support & Help Center</Typography>

      <div className="w-full p-5 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold">Welcome to Tremendoc Support</h2>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mt-4 w-full md:w-[50%]">
          <div className="flex-1">
            <TextInput
              placeholder="How can we help you?"
              type="search"
              name="search"
              // onChange={(e) => handleSearch(e.target.value)}
              className="bg-white w-full!"
            />
          </div>
          <Button>Search</Button>
        </div>

        <div className="mt-7">
          <p className="font-semibold">Need help? We’ve got your back</p>
          <p className="text-sm">
            Perhaps you can find the answers in our collections
          </p>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat)}
              className={`border rounded-lg p-5 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:border-primary ${
                selected.id === cat.id
                  ? "border-primary bg-green-50"
                  : "border-gray-200 hover:bg-lighter-green"
              }`}
            >
              <img src={cat.icon} className="w-[50px] h-[50px] mb-2" />
              <span className="font-medium text-sm text-center">
                {cat.title}
              </span>
            </button>
          ))}
        </div>

        <LineThrough className="py-10" />

        <div>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <img src={selected.icon} className="w-[30px] h-[30px]" />
            <h2>{selected.title}</h2>
          </div>
          <Typography
            variant={"smallText"}
            className="mt-3 text-gray-600 leading-relaxed"
          >
            {selected.content}
          </Typography>

          <Typography
            variant={"smallText"}
            className="mt-4 text-gray-600 leading-relaxed"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has survived not only five centuries but also the leap
            into electronic typesetting, remaining essentially unchanged.
          </Typography>
        </div>

        <LineThrough className="py-10" />

        <div className="flex items-center justify-end text-sm ">
          <p>Other ways to find help:</p>
          <div className="flex items-center gap-2">
            <Link to="#" className="text-[#16B51B]">
              <FaFacebookF size={18} />
            </Link>
            <Link to="#" className="text-[#16B51B]">
              <FaXTwitter size={18} />
            </Link>
            <Link to="#" className="text-[#16B51B]">
              <FaInstagram size={18} />
            </Link>
            <Link to="#" className="text-[#16B51B]">
              <FaLinkedinIn size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
