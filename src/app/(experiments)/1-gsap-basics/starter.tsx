"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.to(".title", {
  //       opacity: 1,
  //       x: 150,
  //       duration: 3,
  //     });

  //     gsap.from(".title", {
  //       opacity: 0,
  //       x: -50,
  //     });
  //   }, containerRef);

  //   return () => {
  //     ctx.revert();
  //   };
  // }, []);

  useGSAP(
    () => {
      SplitText.create(".title", {
        type: "chars, words",
        charsClass: "letter",
      });

      gsap.to(".letter", {
        y: -30,
        opacity: 1,
        duration: 2,
        stagger: 0.1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="bg-blue-300 text-black h-screen">
      <p className="title text-[min(5rem,8vw)] ">
        Another Title Class Component
      </p>
      <div
        ref={containerRef}
        className="flex items-end justify-left overflow-hidden h-1/2"
      >
        <h1 className="title font-black text-[min(10rem,20vw)] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
    </div>
  );
}
