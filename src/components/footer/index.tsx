import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import Icons from "../common/Icons";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white rounded-t-3xl md:rounded-b-3xl px-6 md:px-14 lg:px-20 py-12 md:mx-4 md:mb-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5  mb-10 ">
          <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
            Connect with Us
          </h2>

          <div className="flex items-center gap-5">
            <Button onClick={() => navigate("/pricing")}>Get Started</Button>
            <Button
              className="bg-white text-black"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-gray-700 pt-10">
          <div className="space-y-4">
            <Link
              to="/"
              className="relative z-10 flex gap-2 items-center cursor-pointer"
            >
              <Icons iconName="logo" />
              <span className="text-sm font-semibold">SyloCare</span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed">
              We are dedicated to providing comprehensive healthcare solutions
              focused on your well-being.
            </p>
            {/* <div className="text-sm text-gray-400">
              <p className="text-gray-500">Visit our head office</p>
              <p>
                34, Peninsula Estate, Lekki Phase 1, <br /> Lekki, Lagos,
                Nigeria.
              </p>
            </div> */}
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about-us" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary">
                  How it works
                </Link>
              </li>
              {/* <li>
                <Link to="#" className="hover:text-primary">
                  Appointment
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Our Doctors
                </Link>
              </li> */}
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-primary">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Term & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link to="#" className="hover:text-primary">
                  Feature Request
                </Link>
              </li> */}
              {/* <li>
                <Link to="#" className="hover:text-primary">
                  Online Support
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full bg-[#111] text-gray-300 placeholder-gray-500 focus:outline-none"
              />
              <button className="w-full bg-[#00FF00] text-black font-semibold rounded-full py-2 hover:opacity-90 transition">
                Subscribe
              </button>
              {/* <div className="space-y-2 text-sm text-gray-400 mt-6">
                <p>
                  <span className="text-gray-500">More Informations</span>{" "}
                  <br />
                  (+62) 1919-1414-896
                </p>
                <p>
                  <span className="text-gray-500">Our Email</span> <br />
                  info@tremendoc.com
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between md:items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} sylo. All rights reserved.</p>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white">
              Terms and Conditions
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span>Follow us</span>
            <Link to="#" className="text-primary">
              <FaFacebookF size={18} />
            </Link>
            <Link to="#" className="text-primary">
              <FaXTwitter size={18} />
            </Link>
            <Link to="#" className="text-primary">
              <FaInstagram size={18} />
            </Link>
            <Link to="#" className="text-primary">
              <FaLinkedinIn size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
