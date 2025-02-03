import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Dialog } from 'primereact/dialog';
import SignInUp from "./SignInUp";
import ChatInterface from "./ChatInterface";
import { useApiKey } from "../hooks/useApi";

const BottomNavigationModal = () => {
    const [apiKey, setApiKey, clearApiKey] = useApiKey();
  
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleScreen, setVisibleScreen] = useState(0);


  // Toggle the modal open/close
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(!apiKey)
      {
        setVisible(true);
        setVisibleScreen(1);
      } 
  },[])

  return (
    <div>
      <Dialog visible={visible} style={{ width: 'max-content', padding:"1rem", backgroundVColor:"#dfdfdf" }} onHide={() => {if (!visible) return; setVisible(false); }}>
        {
          visibleScreen == 0 && <SignInUp/>
        }

        {
          visibleScreen == 1 && <ChatInterface/>
        }
        
      </Dialog>

      {/* Fixed button at the bottom */}
      <div className="fixed bottom-20 right-10 z-20">
        <button
          onClick={toggleModal}
          className={` ${isOpen?'text-[#8A6FD5] bg-white hover:bg-white':"text-white  bg-purple-500 hover:bg-purplr-600"} p-3 rounded-full shadow-lg focus:outline-none`}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-10 shadow-lg flex justify-center items-end md:items-center z-10">
          <div className="bg-white rounded-t-lg md:rounded-lg w-[300px] md:max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-bold text-center text-[#7853df] p-2 border-b-2 border-[#7853df]">Menu</h2>
            <ul className="list-none p-2">
                <li className="test-lg font-bold mb-2 text-white bg-purple-500 hover:bg-purple-600 p-2 " onClick={() => { toggleModal(); setVisible(true); setVisibleScreen(1);}}>AI Chat</li>
                {/* <li className="test-lg font-bold mb-2 text-white bg-purple-500 hover:bg-purple-600 p-2 " onClick={() => { toggleModal(); setVisible(true); setVisibleScreen(0)}}> Sign-In / Sign Up</li> */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigationModal;
