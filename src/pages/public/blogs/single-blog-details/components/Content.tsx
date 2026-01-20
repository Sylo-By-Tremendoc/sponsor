import Typography from "@/components/common/Typography"
import { TitleText } from "@/pages/public/home/components"
import blogImg from "../../../../../assets/images/blog-content-img.png";

const Content = () => {
  return (
     <div className="md:col-span-2 space-y-5 p-3 bg-white rounded-2xl">
          <img src={blogImg} className="w-full h-60 rounded-2xl" />

          <article className="space-y-5">
            <TitleText className="m-0">
              Comprehensive Coverage: Ensuring Your Pets Are Fully Insured
              Understanding the Importance of Pet Insurance
            </TitleText>

            <Typography>
              Pet insurance is a crucial investment for pet owners, offering
              financial protection against unexpected veterinary expenses. Key
              benefits include: Reducing the burden of emergency medical costs.
              Providing peace of mind knowing your pet can receive necessary
              care. Offering flexible plans to fit various needs and budgets.
              What Does Comprehensive Coverage Include? Comprehensive pet
              insurance policies typically offer extensive protection, covering:
              Accidents and injuries, such as fractures or bite wounds.
              Illnesses, including chronic and hereditary conditions. Routine
              wellness visits and preventive care, like vaccinations and
              screenings. Prescription medications and emergency surgeries.
              Choosing the Right Insurance Plan for Your Pet Selecting the best
              insurance plan requires understanding your pet’s needs and
              comparing options. Consider: The age, breed, and medical history
              of your pet. Deductibles, premiums, and coverage limits.
              Exclusions and waiting periods. Reviews and ratings of the
              insurance provider. Maximizing Your Pet Insurance Benefits To make
              the most out of your pet insurance, you should: Submit claims
              promptly and keep detailed records of your pet’s health care.
              Choose a deductible that balances monthly premiums with
              out-of-pocket costs. Regularly review your policy to ensure it
              still meets your needs as your pet ages. Conclusion Investing in
              comprehensive pet insurance is an act of love and responsibility
              towards your furry family members. By carefully selecting the
              right plan and understanding how to maximize its benefits, you can
              ensure your pets are fully protected throughout their lives.
            </Typography>
          </article>
        </div>
  )
}

export default Content