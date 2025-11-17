import DifferentMarketPricing from "@/pages/public/pricing/DifferentMarketPricing";
import PlanAndPrice from "@/pages/public/pricing/PlanAndPrice";
import { useNavigate } from "react-router-dom";

const Plans = () => {
   const navigate = useNavigate()
  return (
    <div>
      <PlanAndPrice className="px-0!" />
      <DifferentMarketPricing className="px-0!" onClick={(id: string) => navigate(`/package-plans/plans/${id}`)} />
    </div>
  );
};

export default Plans;
