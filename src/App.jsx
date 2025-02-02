import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import BottomNavigationModal from "./components/BottomNavigationModal";
import LearningWindow from "./components/LearningWindow";

function App() {
  return (
    <>
      <SplashScreen />

      {/* Responsive spheres */}
      <div className="w-full h-full overflow-hidden blur-lg">
        <div className="sphere hidden md:block"></div>
        <div className="sphere hidden md:block"></div>
        <div className="sphere hidden md:block"></div>
      </div>

      <div className="content w-full h-full overflow-x-hidden overflow-y-auto absolute top-0 left-0">
        <div className=" container mx-auto">
          <LearningWindow/>
          <BottomNavigationModal/>
        </div>
      </div>  



    </>
  );
}

export default App;
