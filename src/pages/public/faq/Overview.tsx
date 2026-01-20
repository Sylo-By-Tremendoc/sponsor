import { useState } from "react";
import OverviewHeader from "./components/OverviewHeaders";
import OverviewFAQItem from "./components/OverviewFAQItem";
import { HiOutlineDatabase, HiOutlineDocumentText, HiOutlineHome, HiOutlineUsers } from "react-icons/hi";
import { BsPatchQuestion } from "react-icons/bs";

const Overview = () => {
  const overviewList = [
    {
      id: "general",
      title: "General",
      icon: <HiOutlineHome />,
      items: [
        {
          question: "What types of insurance coverage do you offer?",
          answer:
            "We offer a wide range of insurance products including health, life, auto, home, and business insurance plans.",
        },
        {
          question: "How do I purchase an insurance policy?",
          answer:
            "You can purchase a policy directly through our platform by selecting a plan, providing required details, and completing payment online.",
        },
        {
          question: "Can I manage my insurance policy online?",
          answer:
            "Yes, you can view, update, renew, and manage your policies anytime through your dashboard.",
        },
        {
          question: "Are my personal details secure?",
          answer:
            "Absolutely. We use industry-standard security measures to protect your data and ensure privacy.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our support team via live chat, email, or phone directly from the Help section.",
        },
        {
          question: "Do you offer reminders for renewals?",
          answer:
            "Yes, we notify you via email and in-app alerts before your policy renewal date.",
        },
      ],
    },
    {
      id: "about",
      title: "About Sylo",
      icon: <HiOutlineDocumentText />,
      items: [
        {
          question: "What is Sylo?",
          answer:
            "Sylo is a digital insurance platform designed to simplify buying, managing, and sharing insurance coverage.",
        },
        {
          question: "How is Sylo different from traditional insurers?",
          answer:
            "Sylo offers a fully digital experience with flexible payment options and transparent policy management.",
        },
        {
          question: "Is Sylo a licensed insurance provider?",
          answer:
            "Yes, Sylo works with licensed insurance partners and complies with all regulatory requirements.",
        },
        {
          question: "Where does Sylo operate?",
          answer:
            "Sylo operates in multiple regions and continues to expand coverage availability.",
        },
        {
          question: "Does Sylo charge any platform fees?",
          answer:
            "There are no hidden fees. Any applicable charges are clearly shown before you complete a transaction.",
        },
        {
          question: "Can businesses use Sylo?",
          answer:
            "Yes, Sylo supports both individual customers and businesses seeking insurance solutions.",
        },
      ],
    },
    {
      id: "benefactor",
      title: "Benefactor",
      icon: <HiOutlineUsers />,
      items: [
        {
          question: "Who is a benefactor?",
          answer:
            "A benefactor is someone who contributes financially to help cover part or all of an insurance payment.",
        },
        {
          question: "How does shared payment work?",
          answer:
            "You can invite benefactors to contribute specific amounts toward your insurance premium.",
        },
        {
          question: "Can multiple benefactors contribute?",
          answer:
            "Yes, multiple benefactors can contribute as long as the total amount does not exceed the premium.",
        },
        {
          question: "Do benefactors need a Sylo account?",
          answer:
            "Yes, benefactors must have a Sylo account to ensure secure and transparent payments.",
        },
        {
          question: "Can a benefactor withdraw their contribution?",
          answer:
            "Once a payment is completed, contributions cannot be withdrawn.",
        },
        {
          question: "Is shared payment secure?",
          answer:
            "Yes, all shared payments are protected with secure payment processing and audit trails.",
        },
      ],
    },
    {
      id: "package-plan",
      title: "Package Plan",
      icon: <HiOutlineDatabase />,
      items: [
        {
          question: "What is a package plan?",
          answer:
            "A package plan bundles multiple insurance coverages into a single, cost-effective plan.",
        },
        {
          question: "What types of coverage can be bundled?",
          answer:
            "You can bundle combinations such as health and life, or auto and home insurance.",
        },
        {
          question: "Are package plans cheaper?",
          answer:
            "Yes, package plans typically offer discounted rates compared to purchasing policies separately.",
        },
        {
          question: "Can I customize a package plan?",
          answer:
            "Absolutely. You can tailor package plans to suit your specific needs.",
        },
        {
          question: "Can I add or remove coverage later?",
          answer:
            "Yes, you can modify your package plan at any time from your dashboard.",
        },
        {
          question: "Who should choose a package plan?",
          answer:
            "Package plans are ideal for individuals or families seeking comprehensive coverage at a lower cost.",
        },
      ],
    },
    {
      id: "other-questions",
      title: "Other Questions",
      icon: <BsPatchQuestion />,
      items: [
        {
          question: "How do I cancel my policy?",
          answer:
            "You can cancel your policy from your dashboard or by contacting customer support.",
        },
        {
          question: "Will I receive a refund after cancellation?",
          answer:
            "Refund eligibility depends on the policy terms and cancellation timing.",
        },
        {
          question: "How long does it take to process claims?",
          answer:
            "Most claims are processed within 3–7 business days, depending on complexity.",
        },
        {
          question: "Can I update my personal information?",
          answer:
            "Yes, you can update your personal details anytime through your account settings.",
        },
        {
          question: "What happens if I miss a payment?",
          answer:
            "Missed payments may result in temporary suspension. You’ll receive notifications before any action is taken.",
        },
        {
          question: "Where can I find policy documents?",
          answer:
            "All policy documents are available for download in your dashboard.",
        },
      ],
    },
  ];

  const [activeId, setActiveId] = useState(overviewList[0].id);
  const activeSection = overviewList.find((section) => section.id === activeId);

  return (
    <div className="space-y-6 text-white p-4 bg-[#08382C] rounded-2xl">
      <div className="grid md:grid-cols-5 rounded-2xl overflow-hidden">
        {overviewList.map((section) => (
          <OverviewHeader
            key={section.id}
            title={section.title}
            icon={section.icon}
            isActive={section.id === activeId}
            onClick={() => setActiveId(section.id)}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {activeSection?.items.map((item, idx) => (
          <OverviewFAQItem
            key={idx}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
