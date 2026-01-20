import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import VideoShowcase from "./components/VideoShowcase";
import heroImg from "../../../assets/images/about-us-hero-img.png";
import partnersVideo from "../../../assets/images/partners-video.mp4";


const ExploreVideo = () => {
  const videos = [
    {
      id: "1",
      title: "Insurance Policy Renewal Online",
      description:
        "Renew coverage quickly with our straightforward online guide.",
      thumbnail: heroImg,
      videoUrl: partnersVideo,
    },
    {
      id: "2",
      title: "Insurance Policy Renewal Online",
      description:
        "Renew coverage quickly with our straightforward online guide.",
      thumbnail: heroImg,
      videoUrl: partnersVideo,
    },
    {
      id: "3",
      title: "Insurance Policy Renewal Online",
      description:
        "Renew coverage quickly with our straightforward online guide.",
      thumbnail: heroImg,
      videoUrl: partnersVideo,
    },
  ];

  return (
    <Section className="flex flex-col justify-center items-center gap-5 bg-[#F6F5FA]">
      <Pill text="EXPLORE VIDEO FOR BETTER UNDERSTANDING" />
      <TitleText className="mb-0">Video Explains Well</TitleText>

      <VideoShowcase videos={videos} />
    </Section>
  );
};

export default ExploreVideo;
