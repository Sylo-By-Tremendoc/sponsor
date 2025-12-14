import Container from "@/components/common/Container";
import DifferentMarketPricing from "@/pages/public/pricing/DifferentMarketPricing";
import PlanAndPrice from "@/pages/public/pricing/PlanAndPrice";
import { useNavigate } from "react-router-dom";

const Plans = () => {
   const navigate = useNavigate()
  return (
    <Container>
      <PlanAndPrice className="!px-0 !pt-0 !pb-9" />
      <DifferentMarketPricing className="!px-0" onClick={(id: string) => navigate(`/package-plans/plans/${id}`)} />
    </Container>
  );
};

export default Plans;
