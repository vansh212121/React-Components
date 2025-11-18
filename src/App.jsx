import React from "react";
// import PricingSection from "./components/Pricing";
import { SlideTabsExample } from "./components/Navbar2";
import SpotlightText from "./components/SpotlightText";
import GlowTrailsText from "./components/GlowTrailText";
import MagneticText from "./components/MagneticText";
import MagneticGlowText from "./components/MagneticGlowText";
// import CursorMaskReveal from "./components/CursorMaskReveal";
// import ScrollUnblurText from "./components/UnblurTestReveal";
// import HoverPopupCard from "./components/HoverPopCard";

const App = () => {
  return (
    <div className="bg-sky-200 space-y-6 ">
      <SlideTabsExample />
      {/* <PricingSection /> */}

      {/* <ScrollUnblurText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        colorFrom="#888888"
        colorTo="#000000"
        blurFrom={15}
        blurTo={0}
        opacityFrom={0.3}
        opacityTo={1}
        stagger={0.08} // 👈 Slower = more dramatic
        scrub={1.5}
        className="text-6xl font-bold"
      />   */}

      {/* <HoverPopupCard
        bg="/bg.png"
        popup="/goku.png"
        logo="/logo.png"
      /> */}

      {/* <CursorMaskReveal
        fgImage="/white.png"
        bgImage="/colour.png"
        maskSize={420}
        smoothness={0.15}
        overlayColor="rgba(255,255,255,0.55)"
        width={1000}
        height={520}
      /> */}

      <SpotlightText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        colorBase="#d0d0d0"
        colorReveal="#111111"
        spotlightSize={180}
        spotlightSoftness={90}
        fontSize="text-5xl md:text-8xl lg:text-6xl font-bold"
      />

      <GlowTrailsText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        glowColor="#ec4899"
        trailLength={12}
        spotlightSize={200}
        blurAmount={30}
      />

      <br />

      <MagneticText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        magneticStrength={0.5}
        magneticRadius={300}
        splitBy="chars"
        revealOnProximity={true}
        colorReveal="#3b82f6"
      />
      <br />

      <MagneticGlowText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        glowColor="#8b5cf6"
        magneticStrength={0.3}
        spotlightSize={220}
      />
    </div>
  );
};

export default App;
