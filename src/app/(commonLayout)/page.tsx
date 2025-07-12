import HeroSection from "@/components/Ui/HomePage/HeroSection/HeroSection";
import Specialist from "@/components/Ui/HomePage/Specialist/Specialist";
import TopRatedDoctors from "@/components/Ui/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/Ui/HomePage/WhyUs/WhyUs";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Specialist></Specialist>
      <TopRatedDoctors></TopRatedDoctors>
      <WhyUs></WhyUs>
    </div>
  );
};

export default page;
