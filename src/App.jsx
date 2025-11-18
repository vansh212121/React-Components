import React from "react";
import { SlideTabsExample } from "./components/Navbar/Navbar2";
import ScatterTrail from "./components/ImagePath/MultiImageTrail";
import MultiImageTrail from "./components/ImagePath/MultiImageTrail";
import ImagePathTrail from "./components/ImagePath/ImagePathEffect";
import HoverPopupCard from "./components/HoverPopCard";

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


      <HoverPopupCard
        bg="/bg.png"
        popup="/goku.png"
        logo="/logo.png"
      />


      {/* <CursorMaskReveal
        fgImage="/white.png"
        bgImage="/colour.png"
        maskSize={420}
        smoothness={0.15}
        overlayColor="rgba(255,255,255,0.55)"
        width={1000}
        height={520}
      /> */}
      {/* 
      <SpotlightText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        colorBase="#d0d0d0"
        colorReveal="#111111"
        spotlightSize={180}
        spotlightSoftness={90}
        fontSize="text-5xl md:text-8xl lg:text-6xl font-bold"
      /> */}
      {/* <CanvasGlowTrailsText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        glowColor="#ec4899"
        trailLength={12}
        spotlightSize={200}
        blurAmount={30}
      /> */}
      {/* 
      <MagneticText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        magneticStrength={0.5}
        magneticRadius={300}
        splitBy="chars"
        revealOnProximity={true}
        colorReveal="#3b82f6"
      /> */}
      {/* <MagneticGlowText
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti perferendis culpa facere laboriosam veniam provident ut eveniet recusandae! Eaque quis velit necessitatibus ex alias voluptatem sint corporis odit maxime modi amet iusto nihil vel nam pariatur doloribus ab eveniet saepe, quibusdam facilis neque ullam? Aut ducimus tempore sit maxime quos."
        glowColor="#8b5cf6"
        magneticStrength={0.3}
        spotlightSize={220}
      /> */}
      {/* BENTO */}
      {/* <BentoGallery
        images={[
          { src: "/Bento1.png", spanRows: 2 },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento5.png", spanCols: 2 },
          { src: "/Bento3.png" },
          { src: "/Bento6.png" },
        ]}
      /> */}
      {/* 
      <BentoAsymmetric
        images={[
          { src: "/Bento1.png", spanRows: 2 },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento5.png", spanCols: 2 },
          { src: "/Bento6.png" },
        ]}
      /> */}
      {/* <BentoCenterFocus
        images={[
          { src: "/Bento1.png", spanRows: 2 },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento1.png", spanCols: 2 },
          { src: "/Bento5.png" },
          { src: "/Bento2.png" },
          { src: "/Bento5.png" },
          { src: "/Bento3.png" },
          { src: "/Bento6.png" },
        ]}
      /> */}
      {/*       
      <BentoLShape
        images={[
          { src: "/Bento1.png" },
          { src: "/Bento1.png" },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento5.png" },
          { src: "/Bento6.png" },
        ]}
      /> */}
      {/* <BentoZigzag
        images={[
          { src: "/Bento1.png" },
          { src: "/Bento1.png" },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento5.png" },
          { src: "/Bento3.png" },
          { src: "/Bento3.png" },
          { src: "/Bento4.png" },
        ]}
      /> */}
      {/* <BentoMagazine
        images={[
          { src: "/Bento1.png" },
          { src: "/Bento1.png" },
          { src: "/Bento2.png" },
          { src: "/Bento4.png" },
          { src: "/Bento4.png" },
          { src: "/Bento5.png" },
          { src: "/Bento6.png" },
        ]}
      /> */}
      {/* <FAQ />
      <SaaSFAQWithSidebar /> */}
      {/* <PremiumSaaSFAQ /> */}
      {/* Ticker */}
      {/* <SmoothWaveTicker /> */}
      {/* <SShapedTicker speed={40} primaryAmplitude={50} secondaryAmplitude={25} /> */}

      {/* <ComplexWaveTicker
        items={[
          { src: "/img1.jpg", title: "Product 1" },
          { src: "/img2.jpg", title: "Product 2" },
        ]}
      /> */}

      {/* <SpiralWaveTicker /> */}

      <div className="px-12 py-12">
        {/* <ImagePathTrail
          images={[
            "/img1.png",
            "/img2.png",
            "/img3.png",
            "/img4.png",
            "/img5.png",
            "/img6.png",
          ]}
          width={180}
          height={220}
        /> */}

        {/* <MultiImageTrail /> */}
        {/* <ScatterTrail /> */}

        {/* <MagneticImageFollow /> */}

        {/* <ScatterBurstImages /> */}

        {/* <CleanImageTrail /> */}
      </div>
    </div>
  );
};

export default App;
