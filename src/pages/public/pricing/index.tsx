import { useBeneficiaryStore } from "@/store/beneficiary-store";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import StickyTableOfContents from "../../../utils/sticky-table-of-content";
import ComparePlans from "./ComparePlans";
import Importance from "./Importance";
import PlanAndPrice from "./PlanAndPrice";
import Support from "./Support";
import Testimonials from "./Testimonials";
import { useState } from "react";
import GetStartedModal from "../home/GetStartedModal";
import DifferentMarketPricing from "./DifferentMarketPricing";
import { useNavigate } from "react-router-dom";
import NoLocationOrAgeRangeSelected from "./components/NoLocationOrAgeRangeSelected";
import useAuth from "@/hooks/use-auth";

const Pricing = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const location = useBeneficiaryStore((state) => state.location);
  const ageRange = useBeneficiaryStore((state) => state.ageRange);

  const shouldShowLimitedUI = !location || !ageRange;

  const [showGetStartedModal, setShowGetStartedModal] =
    useState(shouldShowLimitedUI);

  const sections = [
    { id: "plans-and-pricing", label: "Plans and Pricing" },
    { id: "compare-plans", label: "Compare Plans" },
    { id: "testimonials", label: "Testimonials" },
    { id: "importance", label: "Importance" },
    { id: "support", label: "Support" },
  ];

  const handlePlanSelection = (planId: string) => {
    if (authUser?.token || authUser?.user) {
      navigate(`/package-plans/plans/${planId}`);
    } else {
      localStorage.setItem(
        "postAuthRedirect",
        `/package-plans/plans/${planId}`
      );

      navigate("/account/signup");
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <Navbar className="bg-white text-black border-0" />

      <div>
        <section id="plans-and-pricing">
          <PlanAndPrice />
        </section>

        {shouldShowLimitedUI ? (
          <NoLocationOrAgeRangeSelected
            onClick={() => setShowGetStartedModal(true)}
          />
        ) : (
          <>
            <section id="different-market-pricing">
              <DifferentMarketPricing
                onClick={(id) => handlePlanSelection(id)}
              />
            </section>
            <section id="compare-plans">
              <ComparePlans />
            </section>
            <section id="testimonials">
              <Testimonials />
            </section>
            <section id="importance">
              <Importance />
            </section>
            <section id="support">
              <Support />
            </section>

            <StickyTableOfContents sections={sections} topOffset={72} />
          </>
        )}

        <GetStartedModal
          showGetStartedModal={showGetStartedModal}
          setShowGetStartedModal={setShowGetStartedModal}
          handleContinue={() => setShowGetStartedModal(false)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
