import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import BottomNavigationModal from "./components/BottomNavigationModal";
import LearningWindow from "./components/LearningWindow";

// import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
function App() {
  return (
    <PrimeReactProvider>
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



    </PrimeReactProvider>
  );
}

export default App;
