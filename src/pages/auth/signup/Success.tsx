import { BiCheckCircle } from "react-icons/bi";
import Typography from "../../../components/common/Typography";

const Success = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div className=" w-full my-auto flex flex-col justify-center items-center text-center bg-white px-4">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <BiCheckCircle className="w-12 h-12 text-green-500" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Great!</h2>
      <Typography variant={"smallText"} className="text-charcoal-gray mb-8">
        Your Tremendoc account has been <br /> created successfully.
      </Typography>

      <button
        onClick={handleNext}
        className="w-48 bg-[#00FF00] hover:bg-[#00E600] text-black font-medium rounded-full py-2 transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default Success;
