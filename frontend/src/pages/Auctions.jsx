import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LiveAuctions from "../components/LiveAuctions";
import SilentAuctions from "../components/SilentAuctions";

const Auctions = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="scroll-smooth">
      {isSmallScreen ? (
        <Routes>
          {/* توجيه كل صفحة بشكل منفصل */}
          <Route path="/liveauctions" element={<LiveAuctions />} />
          <Route path="/silentauctions" element={<SilentAuctions />} />
        </Routes>
      ) : (
        // عرض كلا المكونين في نفس الصفحة إذا كانت الشاشة كبيرة
        <>
          <LiveAuctions />
          <SilentAuctions />
        </>
      )}
    </div>
  );
};

export default Auctions;
