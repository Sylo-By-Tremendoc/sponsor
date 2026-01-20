import Pill from "@/components/common/Pill";
import { Section } from "../home/components";
import Typography from "@/components/common/Typography";
import aboutImg from "../../../assets/images/why-this-matters.png";
import { useCurrencyStore } from "@/store/currency-store";
import { convertPrice } from "@/utils/constant";
import { motion } from "motion/react";

const AboutSylo = () => {
  const currency = useCurrencyStore((state) => state?.currency);

  const stats = [
    { value: "7%", label: "Countries Covered" },
    { value: "3.5M+", label: "Target Diasporas" },
    { value: "2", label: "Confirmed Partners" },
    { value: convertPrice(9.99, currency), label: "Starting Price" },
  ];
  return (
    <Section className="md:pb-5">
      <div className="flex flex-col md:flex-row justify-between items-start gap-5 p-5 rounded-2xl bg-[#EFEFEF]">
        <Pill text="ABOUT SYLO" className="no" />

        <div className="space-y-5 p-4 bg-white rounded-2xl md:max-w-3xl">
          <Typography>
            Founded in 2017, Tremendoc, Africa’s first telemedicine platform has
            become the continent’s leading digital health platform, serving
            hundreds of thousands of families.
          </Typography>
          <Typography variant={"smallText"}>
            Partnering with top health insurance companies, banks, and tech
            leaders, Tremendoc makes quality healthcare accessible, affordable,
            and reliable for Africans everywhere.
          </Typography>
          <img
            src={aboutImg}
            alt="Why this matters"
            className="w-full h-[20rem] rounded-2xl"
          />
          <Typography variant={"smallText"}>
            Across Africa and parts of Asia, less than 20% of people have formal
            health insurance, mostly limited to corporate employees. Millions of
            families are left paying out of pocket for medical bills, and
            diasporans sending money home face the uncertainty of whether it
            reaches real healthcare.
          </Typography>
          <Typography variant={"smallText"}>
            This gap is exactly what Tremendoc addresses by introducing SYLO, a
            comprehensive healthcare plan that lets diasporans directly secure
            healthcare for their loved ones at home. SYLO covers maternity,
            general health, hospitalization, and specialized care, turning every
            payment into guaranteed medical support.
          </Typography>
          <Typography variant={"smallText"}>
            With Tremendoc, your family is protected, your payments are secure,
            and your peace of mind is assured. Sign up today and give your loved
            ones the healthcare they deserve, no matter where you are.
          </Typography>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-white pt-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-default"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-900"
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Section>
  );
};

export default AboutSylo;
