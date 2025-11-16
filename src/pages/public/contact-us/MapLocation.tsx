import { Section } from "../home/components";
import mapImg from "../../../assets/images/map.png";

const MapLocation = () => {
  return (
    <Section className="space-y-4 bg-white text-center relative">
      <span className="absolute top-0 right-4 left-4 md:right-32 md:left-32 border-t border-[#A1A1A1]"></span>

      <img src={mapImg} className="rounded-2xl" />
    </Section>
  );
};

export default MapLocation;
