import { Link, useNavigate } from "react-router-dom";
import { smoothSlideVariant } from "../../../utils/constant";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Success from "./Success";
import CreateAccount from "./CreateAccount";
import EnterOTP from "./EnterOTP";
import Icons from "@/components/common/Icons";
import heroImg2 from "../../../assets/images/hero-image-1.png";

const Signup = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState("CREATE");
  const [redirectPath, setRedirectPath] = useState("");

  const handleCreationSuccessful = () => {
    if (redirectPath) {
      localStorage.removeItem("postAuthRedirect");

      navigate(redirectPath, {
        replace: true,
        state: {
          from: { pathname: redirectPath },
        },
      });
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    const storedRedirect = localStorage.getItem("postAuthRedirect");

    if (storedRedirect) {
      setRedirectPath(storedRedirect);
    }
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        style={{ backgroundImage: `url(${heroImg2})` }}
        className="
    relative hidden md:flex flex-col justify-between
    px-10 py-10 text-white
    bg-cover bg-center bg-no-repeat
  "
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Header */}
        <Link to="/" className="relative z-10 flex items-center cursor-pointer">
          <Icons iconName="logo" />
          <span className="text-sm font-semibold">By Tremendoc</span>
        </Link>

        {/* Marketing Text */}
        <div className="relative z-10">
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
          className="bg-white flex flex-col items-center px-5 md:px-10 py-10 h-screen overflow-y-auto"
        >
          {process === "CREATE" && (
            <CreateAccount handleNext={() => setProcess("OTP")} />
          )}

          {process === "OTP" && (
            <EnterOTP handleNext={() => setProcess("SUCCESS")} />
          )}

          {process === "SUCCESS" && (
            <Success handleNext={handleCreationSuccessful} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Signup;
