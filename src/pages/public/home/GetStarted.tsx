import { motion } from "framer-motion";
import Pill from "../../../components/common/Pill";
import Typography from "../../../components/common/Typography";
import { Section, TitleText } from "./components";
import mainBeneficiary from "../../../assets/images/main-beneficiary.png";
import ukBeneficiary from "../../../assets/images/uk-beneficiary.png";
import canadaBeneficiary from "../../../assets/images/canada-beneficiary.png";
import usBeneficiary from "../../../assets/images/us-beneficiary.png";
import bgBeneficiary from "../../../assets/images/background-beneficiary.png";
import Icons from "@/components/common/Icons";
import { cn } from "@/utils/class-name";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floating = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const GetStarted = () => {
  return (
    <Section className="relative overflow-hidden bg-[#0B3B2E] py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div
          className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${bgBeneficiary})` }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2 text-white"
        >
          <motion.div variants={fadeUp}>
            <Pill text="GET STARTED" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <TitleText className="m-0">
              Unite to Support Your Loved Ones, <br />
              Wherever They Are
            </TitleText>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Typography variant="smallText" className="py-2">
              Distance shouldn’t be a barrier to caring for family. As the
              primary benefactor, you can invite siblings, parents, or friends
              from around the globe to join you in purchasing a healthcare plan
              for a loved one.
            </Typography>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5 pt-2">
            <FeatureItem
              title="Collaborative Contributions"
              description="Invite family members from different countries—like the UK, US, Canada, and beyond—to contribute their share."
            />

            <FeatureItem
              title="Shared Responsibility"
              description="Instead of shouldering the cost alone, you can spread the financial responsibility and ensure your loved one gets the best care."
            />

            <FeatureItem
              title="Flexibility in Payments"
              description="Each family member can pay in their local currency, making it easy and convenient for everyone involved."
            />
          </motion.div>
        </motion.div>
        <div className="relative flex justify-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-[6px] border-green-500"
          >
            <img
              src={mainBeneficiary}
              alt="Beneficiary"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <FloatingCard
            img="https://flagcdn.com/w160/ng.png"
            label="NG"
            className="w-20 h-20 top-2 left-0 md:left-20 rounded-full"
          />

          <FloatingCard
            img={ukBeneficiary}
            label="UK"
            className="top-0 -right-5 md:right-10"
          />

          <FloatingCard
            img={canadaBeneficiary}
            label="Canada"
            className="top-[37%] -right-5 md:-right-4"
          />

          <FloatingCard
            img={usBeneficiary}
            label="USA"
            className="bottom-0 -right-5 md:right-10"
          />
        </div>
      </div>
    </Section>
  );
};

export default GetStarted;

const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex gap-2">
    <Icons iconName="check" className="w-6 h-4 text-[#2BAC0B]" />
    <div className="space-y-1">
      <Typography variant="smallTextSemibold">{title}</Typography>
      <Typography variant="smallText" className="text-white/70">
        {description}
      </Typography>
    </div>
  </div>
);

const FloatingCard = ({
  img,
  label,
  className = "",
}: {
  img: string;
  label: string;
  className?: string;
}) => (
  <motion.div
    variants={floating}
    animate="animate"
    whileHover={{ scale: 1.05 }}
    className={cn(
      "absolute w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-green-500 shadow-lg bg-white",
      className
    )}
  >
    <img src={img} alt={label} className="w-full h-full object-cover" />
  </motion.div>
);
