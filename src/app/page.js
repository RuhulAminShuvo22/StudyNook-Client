import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner></Banner>
    {/* feature section up coming */}
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>

    </div>
  );
}
