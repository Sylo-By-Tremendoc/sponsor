import { useNavigate } from "react-router-dom";
import { smoothSlideVariant } from "../../../utils/constant";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Success from "./Success";
import CreateAccount from "./CreateAccount";
import EnterOTP from "./EnterOTP";

const Signup = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState("CREATE");

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-black text-white px-10 py-10 z-20">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <h1 className="text-lg font-semibold">
              sylo <span className="text-gray-400 text-sm">By Tremendoc</span>
            </h1>
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
            Send Healthcare Home, <br /> Just Like you Send Money.
          </h2>
          <p className="text-sm text-gray-300 mt-4">
            Diasporas in the UK, US and Canada can now provide comprehensive
            healthcare coverage for family back home.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={process}
          variants={smoothSlideVariant["forward"]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="bg-white flex flex-col items-center px-5 md:px-8 py-10 h-screen overflow-y-auto"
        >
          {process === "CREATE" ? (
            <CreateAccount handleNext={() => setProcess("OTP")} />
          ) : process === "OTP" ? (
            <EnterOTP handleNext={() => setProcess("SUCCESS")} />
          ) : (
            <Success handleNext={() => navigate("/account/login")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Signup;
