import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SplashScreen = () => {
  const svgRef = useRef(null);
  const brandRef = useRef(null);

  const leftPetals = ["l1", "l2", "l3"];
  const rightPetals = ["r1", "r2", "r3"];
  const brandName = "Welcome to AI Tutor";
  const closeAngles = {
    l1: 11,
    l2: 18,
    l3: 33,
    r1: -11,
    r2: -18,
    r3: -33,
  };

  useEffect(() => {
    const svg = svgRef.current;

    const letters = document.querySelectorAll(".letter");
    const quotes = document.querySelectorAll(".quotes");

    // Set initial states
    gsap.set(".petal-l, .petal-r ", {
      transformOrigin: "50% 80%",
    });

    // Start with petals closed
    leftPetals.forEach((id) => {
      gsap.set(`#${id}`, {
        rotation: closeAngles[id],
      });
    });

    rightPetals.forEach((id) => {
      gsap.set(`#${id}`, {
        rotation: closeAngles[id],
      });
    });

    // Create timeline for opening animation
    const tl = gsap.timeline({
      delay: 0.5, // Delay before animation starts
    });

    // Animate petals opening
    tl.to(".petal-l, .petal-r", {
      rotation: 0,
      duration: 1.5,
      ease: "power1.inOut",
    });

    // tl.fromTo(
    //   letters,
    //   { opacity: 0 },
    //   {
    //     delay: 0.5,
    //     opacity: 0.8,
    //     duration: 0.5,
    //     stagger: 0.2,
    //     ease: "power1.inOut",
    //   }
    // );

    // tl.fromTo(
    //   quotes,
    //   { opacity: 0 },
    //   {
    //     opacity: 0.8,
    //     duration: 1,
    //     stagger: 0.2,
    //     ease: "power1.inOut",
    //   }
    // );

    // tl.to(".splash-container", {
    //   delay: 1,
    //   opacity:0,
    //   duration: 3,
    //   ease: "power2.inOut",
    // });

    // tl.set(".splash-container", {
    //   display:"none",
    // });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full splash-container absolute top-0 left-0 z-30 bg-zinc-900 p-4"
      // style={{
      //   // background:
      //     // "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
      //     backdropFilter: "blur(10px)"
      // }}
    >
      <svg
        ref={svgRef}
        className="lotus-flower"
        width={400}
        viewBox="0 0 400 230"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Center petal */}
          <path
            className="petal-center"
            d="M200.24533,20.51144c-6.66667,-0.79083 -36.33333,39.54158 -36,78.29235c0.33333,38.75075 26.33333,76.71068 38,76.71068c11.66667,0 30.33333,-31.63327 31,-74.33819c0.66667,-42.70491 -26.33333,-79.87401 -33,-80.66484z"
            fill="#8A6FD5"
            stroke="#8A6FD5"
            strokeWidth="5"
            opacity="0.9"
          />

          {/* Left petals */}
          <path
            className="petal-l"
            id="l1"
            d="M143.58726,26.07116c-6.50521,1.63067 -17.48837,51.65212 -1.30399,89.32257c16.18438,37.67045 55.8425,65.32237 66.65964,61.11905c10.81715,-4.20332 15.16513,-41.77804 -1.712,-83.66497c-16.87713,-41.88692 -57.13844,-68.4073 -63.64365,-66.77665z"
            fill="#9B7CCE"
            stroke="#9B7CCE"
            strokeWidth="5"
            opacity="0.9"
          />
          <path
            className="petal-l"
            id="l2"
            d="M96.29829,52.30906c-5.39639,4.00892 3.90346,56.34604 33.58192,86.59914c29.67846,30.2531 77.21919,42.0545 85.61149,33.95015c8.3923,-8.10435 -2.21161,-45.95673 -34.17468,-80.01517c-31.96307,-34.05843 -79.62235,-44.54304 -85.01874,-40.53411l0.00001,-0.00001z"
            fill="#6A4DC5"
            stroke="#6A4DC5"
            strokeWidth="5"
            opacity="0.9"
          />
          <path
            className="petal-l"
            id="l3"
            d="M58.83696,99.15766c-3.50168,5.73853 24.72682,50.78087 63.57723,67.71331c38.8504,16.93244 87.35028,10.06543 92.09554,-0.5926c4.74526,-10.65803 -19.26626,-41.78186 -61.66042,-61.38671c-42.39415,-19.60485 -90.51067,-11.47253 -94.01235,-5.734z"
            fill="#483D8B"
            stroke="#483D8B"
            strokeWidth="5"
            opacity="0.9"
          />

          {/* Right petals */}
          <path
            className="petal-r"
            id="r1"
            d="M258.4804,26.23559c-5.85724,-3.11212 -49.88698,24.9817 -65.45325,62.16341c-15.56626,37.18172 -7.01082,82.67653 3.80633,86.79903c10.81715,4.1225 41.08402,-19.53777 59.1974,-60.14816c18.11338,-40.61039 8.30676,-85.70215 2.44952,-88.81427l0,-0.00001z"
            fill="#9B7CCE"
            stroke="#9B7CCE"
            strokeWidth="5"
            opacity="0.9"
          />
          <path
            className="petal-r"
            id="r2"
            d="M303.65139,51.75103c-4.19481,-5.25319 -56.17548,5.86753 -85.37439,36.58373c-29.19891,30.7162 -39.33397,78.63983 -30.94167,86.74418c8.3923,8.10435 45.85155,-3.81413 78.77374,-36.94635c32.92219,-33.13222 41.73712,-81.12837 37.54231,-86.38157l0.00001,0.00001z"
            fill="#6A4DC5"
            stroke="#6A4DC5"
            strokeWidth="5"
            opacity="0.9"
          />
          <path
            className="petal-r"
            id="r3"
            d="M336.23487,98.71768c-1.92148,-6.44208 -54.28302,-15.60342 -92.86226,1.93804c-38.57925,17.54146 -65.92882,58.17882 -61.18356,68.83685c4.74526,10.65803 43.94162,13.63989 86.87809,-4.74689c42.93647,-18.38679 69.08921,-59.58592 67.16773,-66.028z"
            fill="#483D8B"
            stroke="#483D8B"
            strokeWidth="5"
            opacity="0.9"
          />

          {/* Center ellipse */}
          <ellipse
            cx="200.75002"
            cy="186.25001"
            stroke="#E6E6FA"
            strokeWidth="5"
            fill="#E6E6FA"
          />
        </g>
      </svg>

      <h1
        ref={brandRef}
        className="splash_brand_name uppercase text-purple-400  text-center font-bold text-4xl"
      >
        {
          brandName
        }
      </h1>

      <h2
        ref={brandRef}
        className="splash_brand_name mt-6 md:w-[800px] text-center text-gray-400  text-sm  lg:text-sm"
      >
        AI Python Tutor for Kids is an interactive learning platform designed to teach the basics of Python through step-by-step lessons, engaging quizzes, and real-time AI assistance. Built using React, TailwindCSS, and Axios, the app ensures a smooth, responsive, and visually appealing experience. The AI chat panel, powered by GeminiAI's API, helps kids with their coding questions in real time. The approach focuses on a structured learning path, where lessons unlock only after quizzes, promoting gradual skill development. An easy-to-use settings panel allows users to configure their own API key for uninterrupted AI support. 🚀
      </h2>

      <button className="border-2 hover:border-purple-500 hover:bg-purple-500 text-white border-white px-6 py-2 mt-6" onClick={()=>gsap.to(".splash-container", {
      y: "-100%",
      duration: 1.5,
      ease: "power1.inOut",
    })}>Let’s Learn Python!</button>
    </div>
  );
};

export default SplashScreen;
