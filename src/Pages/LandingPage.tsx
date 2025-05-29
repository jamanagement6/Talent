import About from "../Components/About";
import Hero from "../Components/Hero";
// import Navbar from "../Components/Navbar";

const LandingPage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero/>
      <About/>
    </div>
  );
};

export default LandingPage;
