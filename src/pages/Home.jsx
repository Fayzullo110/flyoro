import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="destinations">
        <Destinations />
      </div>
      <div id="newsletter">
        <Newsletter />
      </div>
      <Testimonials />
    </>
  );
}
