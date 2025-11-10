import React from "react";
import Navbar from "./components/Navbar";
import TestimonialsSection from "./components/Testimonials";

const App = () => {
  return (
    <div className="bg-green-700 ">
      <Navbar />
      <TestimonialsSection />
      <TestimonialsSection />
      <TestimonialsSection />
      <TestimonialsSection />
      <TestimonialsSection />
    </div>
  );
};

export default App;
