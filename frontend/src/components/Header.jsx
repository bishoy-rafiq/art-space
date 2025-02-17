import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const [divs, setDivs] = useState([
    {
      id: 1,
      div: (
        <div className="flex justify-center sm:mr-4 lg:mr-36">
          <img src={assets.header_img1} alt="Gallery 1" className="w-[500px]" />
        </div>
      ),
    },
    {
      id: 2,
      div: (
        <div className="flex justify-center gap-8 mt-4">
          <img src={assets.header_img2} alt="Gallery 2" className=" w-[250px]" />
          <img src={assets.header_img3} alt="Gallery 3" className=" w-[250px]" />
        </div>
      ),
    },
    {
      id: 3,
      div: (
        <div className="flex justify-center mt-4">
          <img src={assets.header_img4} alt="Gallery 4" className="w-[300px]" />
        </div>
      ),
    },
  ]);

  let scrollTimeout = null;

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          setDivs((prevDivs) => {
            const newOrder = [...prevDivs];
            [newOrder[0], newOrder[1]] = [newOrder[1], newOrder[0]];
            return newOrder;
          });

          setTimeout(() => {
            setDivs((prevDivs) => {
              const newOrder = [...prevDivs];
              [newOrder[1], newOrder[2]] = [newOrder[2], newOrder[1]];
              return newOrder;
            });
          }, 1500);

          scrollTimeout = null;
        }, 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      {/* النص */}
      <div className="lg:text-right font-cairo p-4 ">
        <div className="w-full lg:w-[469px]  lg:h-[352px] font-cairo font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[40px] lg:leading-[54px] text-right tracking-[0.25px] text-[#002366]">
          <span className="text-blue-500">مرحبًا بك في عالم الإبداع الفني!</span>
          <br />
          استكشف أسرار الفن وأحدث المزادات، وتعمّق في جمال اللوحات، النحت، والفن ثلاثي الأبعاد.
        </div>
      </div>

      {/* الصور */}
      <div className="w-full lg:w-[737px]  lg:h-[604px] order-1 flex-grow-0 flex flex-col gap-4">
        {divs.map((div, index) => (
          <div
            key={div.id}
            className={`transition-transform duration-1000 ${
              index === 0
                ? "transform scale-100 z-10"
                : index === 1
                ? "transform scale-95 z-5"
                : "transform scale-90 z-1"
            }`}
          >
            {div.div}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
