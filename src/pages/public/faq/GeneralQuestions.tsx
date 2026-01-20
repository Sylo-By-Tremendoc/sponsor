import Accordion from "@/components/common/Accordion";
import { Section, TitleText } from "../home/components";

const GeneralQuestions = () => {
  const faqItems = [
    {
      id: "q1",
      title: "What types of insurance policies do you offer?",
      content:
        "We offer a wide range of insurance policies including life, health, auto, home, travel, and business insurance.",
    },
    {
      id: "q2",
      title: "How do I purchase an insurance policy?",
      content:
        "You can purchase a policy directly through our platform by selecting a plan, providing the required details, and completing payment securely.",
    },
    {
      id: "q3",
      title: "Can I customize my insurance coverage?",
      content:
        "Yes, our plans are flexible and allow you to customize coverage limits, add-ons, and beneficiaries based on your needs.",
    },
    {
      id: "q4",
      title: "How do I file an insurance claim?",
      content:
        "Claims can be filed online through your dashboard or by contacting our support team for guided assistance.",
    },
    {
      id: "q5",
      title: "What documents are required to file a claim?",
      content:
        "Required documents vary by policy but generally include proof of identity, policy details, and supporting claim documents.",
    },
    {
      id: "q6",
      title: "How long does claim processing take?",
      content:
        "Most claims are reviewed and processed within 5–10 business days, depending on the complexity of the case.",
    },
    {
      id: "q7",
      title: "Can I track my claim status?",
      content:
        "Yes, you can track the real-time status of your claim from your dashboard once it has been submitted.",
    },
    {
      id: "q8",
      title: "Is customer support available 24/7?",
      content:
        "Yes, our customer support team is available 24/7 via chat, email, and phone to assist you.",
    },
    {
      id: "q9",
      title: "Can I update my policy details after purchase?",
      content:
        "You can update certain details such as beneficiaries, contact information, and add-ons through your account settings.",
    },
    {
      id: "q10",
      title: "What payment methods do you accept?",
      content:
        "We accept major credit/debit cards, bank transfers, and other secure digital payment methods.",
    },
    {
      id: "q11",
      title: "Are my personal and payment details secure?",
      content:
        "Yes, we use industry-standard encryption and security measures to protect your data and transactions.",
    },
    {
      id: "q12",
      title: "How can I renew or cancel my policy?",
      content:
        "Policies can be renewed or canceled directly from your dashboard, following the applicable terms and conditions.",
    },
  ];

  return (
    <Section className="md:pt-10">
      <TitleText className="text-center">General Questions</TitleText>
      <Accordion items={faqItems} className="grid-cols-1 md:grid-cols-2" />
    </Section>
  );
};

export default GeneralQuestions;
