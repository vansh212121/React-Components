import React from "react";
// import PricingSection from "./components/Pricing";
import { SlideTabsExample } from "./components/Navbar2";
import CursorMaskReveal from "./components/CursorMaskReveal";
// import ScrollUnblurText from "./components/UnblurTestReveal";
// import HoverPopupCard from "./components/HoverPopCard";

const App = () => {
  return (
    <div className="bg-sky-200 ">
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

      <CursorMaskReveal
        fgImage="/white.png"
        bgImage="/colour.png"
        maskSize={420}
        smoothness={0.15}
        overlayColor="rgba(255,255,255,0.55)"
        width={1000}
        height={520}
      />
    </div>
  );
};

export default App;
