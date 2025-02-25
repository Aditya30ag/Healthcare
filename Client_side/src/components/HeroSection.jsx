import React from "react";
import HeroLeft from "./HeroLeft";
import HealthCareBanner from "./HealthCareBanner"
import MainBox from "./MainBox";

function HeroSection() {
  return (
    <>
      <HealthCareBanner/>
      <MainBox/>
      <HeroLeft />
    </>
  );
}

export default HeroSection;
