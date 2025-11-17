import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import Typography from "@/components/common/Typography";
import { ageRanges, beneficiaryCountries } from "@/utils/constant";
import worldMapImg from "../../../assets/images/world-map.png";
import Icons from "@/components/common/Icons";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import { toast } from "react-toastify";

const GetStartedModal = ({
  showGetStartedModal,
  setShowGetStartedModal,
  handleContinue,
}: {
  showGetStartedModal: boolean;
  setShowGetStartedModal: (val: boolean) => void;
  handleContinue: () => void;
}) => {
  const location = useBeneficiaryStore((state) => state.location);
  const ageRange = useBeneficiaryStore((state) => state.ageRange);
  const setLocation = useBeneficiaryStore((state) => state.setLocation);
  const setAgeRange = useBeneficiaryStore((state) => state.setAgeRange);

  const handleSubmit = () => {
    if (!location)
      return toast.error("Please select the beneficiary's country.");

    if (!ageRange)
      return toast.error("Please select the beneficiary's age range.");

    handleContinue();
  };

  return (
    <CustomDialog
      openModal={showGetStartedModal}
      onClose={() => setShowGetStartedModal(false)}
      className="w-full md:max-w-200"
    >
      <div className="space-y- px-2">
        {/* HEADER */}
        <div className="flex-1 sticky top-0 z-20 space-y-2">
          <Typography variant="heading4" className="text-center font-semibold">
            In which country is your beneficiary located?
          </Typography>

          <Typography variant="smallText" className="text-center text-gray-500">
            To help us tailor the best package for you, please select your
            beneficiary country and age range.
          </Typography>
        </div>

        {/* MAP */}
        <div className="relative flex justify-center">
          <img
            src={worldMapImg}
            alt="world map"
            className="w-full max-w-[420px] opacity-80"
          />

          {/* Highlight selected country (+ small overlay) */}
          {location === "NG" && (
            <div className="absolute top-[55%] left-[47%]">
              <Icons iconName="nigeriaMap" />
            </div>
          )}

          {location === "GH" && (
            <div className="absolute top-[56%] left-[46%]">
              <Icons iconName="ghanaMap" />
            </div>
          )}

          {location === "KE" && (
            <div className="absolute top-[60%] left-[52.5%]">
              <Icons iconName="kenyaMap" />
            </div>
          )}

          {location === "IN" && (
            <div className="absolute top-[42%] left-[59%]">
              <Icons iconName="indiaMap" />
            </div>
          )}
        </div>

        <section className="space-y-3 py-5">
          <Typography variant="mediumTextSemibold">Country</Typography>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {beneficiaryCountries.map((c) => {
              const active = location === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setLocation(c.id)}
                  className={`flex items-center justify-between px-4 py-3 border rounded-xl transition-all cursor-pointer
              ${active ? "border-primary bg-green-50" : "border-gray-300"}
              `}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w160/${c.code}.png`}
                      alt={c.label}
                      width={24}
                      height={24}
                      className=""
                    />

                    <Typography className="font-medium">{c.label}</Typography>
                  </div>

                  {active ? (
                    <span className="h-4 w-4 rounded-full bg-primary"></span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-gray-400"></span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* AGE SELECT */}
        <section className="space-y-3">
          <Typography variant="mediumTextSemibold">Age range</Typography>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {ageRanges?.map((age) => {
              const active = ageRange === age?.id;

              return (
                <button
                  key={age?.id}
                  onClick={() => setAgeRange(age?.id)}
                  className={`px-4 py-3 border rounded-xl text-left transition-all cursor-pointer
               ${active ? "border-primary bg-green-50" : "border-gray-300"}
             `}
                >
                  <Typography className="font-medium">{age?.id}</Typography>
                </button>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <DialogFooter className="pt-6">
          <Button
            className="w-full md:w-48 not-odd:text-white"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </DialogFooter>
      </div>
    </CustomDialog>
  );
};

export default GetStartedModal;
