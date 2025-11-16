import { Button } from "../../../components/common/Button"
import Pill from "../../../components/common/Pill"
import Typography from "../../../components/common/Typography"
import { Section, TitleText } from "../home/components"

const Support = () => {
  return (
    <Section className="space-y-4 bg-white text-center relative">
      <span className="absolute top-0 right-4 left-4 md:right-32 md:left-32 border-t border-[#A1A1A1]"></span>
      <Pill text="SUPPORTS" />
      <div>
        <TitleText className="mb-3">
          Still Not Sure Which Plan Is Right for You?
        </TitleText>
        <Typography variant={"smallText"} className="text-charcoal-gray md:max-w-lg m-auto pb-4">
          We're here to help. Whether you're caring for one person or a full household, we'll guide you to the best fit.
        </Typography>
      </div>

      <Button>Talk to an Advisor</Button>
    </Section>
  )
}

export default Support