"use client";

import { useRef } from "react";
import { Highlighted1, Highlighted2, Highlighted3 } from "./highlights";
import { TitleSection } from "./title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin, ScrollTrigger } from "gsap/all";
import { useControls } from "leva";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

export default function Page() {
  return (
    <>
      <TitleSection />
      <DescriptionSection />
      <div className="h-screen" />
    </>
  );
}

function DescriptionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { stagger, start, end } = useControls({
    stagger: { value: 0.1, min: 0, max: 1, step: 0.1 },
    start: { value: 20, min: 0, max: 100, step: 5 },
    end: { value: 30, min: 0, max: 100, step: 5 },
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "h2",
          markers: true,
          start: `top ${start}%`,
          end: `bottom ${end}%`,
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from("h2", {
        opacity: 0,
        duration: 1,
      });

      tl.from("path", {
        drawSVG: 0,
        stagger: stagger,
      });
    },
    {
      scope: containerRef,
      dependencies: [stagger, start, end],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen p-10 flex items-stretch justify-stretch"
    >
      <div className="title-container border-2 border-(--line) p-10 w-full flex items-center justify-center">
        <h2 className="text-[6vh] leading-[1.4] text-center text-balance max-w-7xl">
          <ScrollTriggerWord /> enables anyone to create{" "}
          <span className="whitespace-nowrap">jaw-dropping</span>{" "}
          <ScrollBasedWord /> animations with minimal code. Infinitely flexible.
          Scrub, pin, snap, or just <TriggerAnythingWord /> scroll-related, even
          if it has nothing to do{" "}
          <span className="whitespace-nowrap">with animation.</span>
        </h2>
      </div>
    </div>
  );
}

const ScrollTriggerWord = () => (
  <span className="relative">
    <Highlighted1 className="absolute top-[0.2em] left-0 w-[6em] mix-blend-multiply" />
    ScrollTrigger
  </span>
);
const ScrollBasedWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted2 className="absolute bottom-0 left-0 mix-blend-multiply" />
    scroll-based
  </span>
);
const TriggerAnythingWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted3 className="absolute bottom-0 left-0 mix-blend-multiply" />
    trigger anything
  </span>
);
