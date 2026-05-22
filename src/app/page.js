import AvailableStudyRooms from "@/components/AvailableStudyRooms";
import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import StudyNookCTA from "@/components/StudyNookCTA";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner></Banner>
      <AvailableStudyRooms></AvailableStudyRooms>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <StudyNookCTA></StudyNookCTA>

    </div>
  );
}
