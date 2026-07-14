"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { GSDevTools, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create(".title", {
        type: "words, chars",
        wordsClass: "word++",
        charsClass: "char",
        mask: "chars",
      });

      const tl = gsap.timeline();

      GSDevTools.create({
        animation: tl,
      });

      tl.from(".title .word1 .char", {
        y: "100%",
        duration: 0.5,
        stagger: 0.08,
        ease: "circ.out",
      });

      tl.from(".tl-start", {
        height: 0,
        duration: 0.3,
      });

      tl.from(
        ".tl-main",
        {
          width: 0,
          duration: 0.6,
        },
        "<+0.5",
      );

      tl.from(
        ".tl-dot",
        {
          x: "-300%",
          opacity: 0,
          rotation: 360 * 3,
          duration: 1,
        },
        "<<",
      );

      tl.from(
        ".title .word2 .char",
        {
          x: "0%",
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "circ.out",
        },
        "<",
      );

      tl.from(
        ".title .word3 .char",
        {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "circ.out",
        },
        "<+0.2s",
      );
    },

    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#E5E5E5] text-[#2A2A2A] flex h-screen items-center justify-center tracking-tighter"
    >
      <h1 className="title font-bold text-[min(20vh,10vw)] flex flex-col gap-[0.2em] leading-none text-left uppercase">
        <span className="relative block right-[1.5em] text-left">GSAP</span>
        <span className="relative block">
          <span>timeline</span>
          {/* Timeline */}
          <div className="absolute w-full -bottom-[0.04em] h-[0.04em]">
            <div className="tl-main absolute w-full bottom-0 h-[0.04em] bg-orange-500" />
            <div className="tl-start absolute left-0 top-1/2 -translate-y-1/2 h-[0.3em] w-[0.04em] bg-orange-500" />
          </div>
          {/* Dot */}
          <div className="tl-dot absolute -top-[0.08em] -right-[0.16em] h-[0.08em] aspect-square bg-orange-500 opacity-100" />
        </span>
        <span className="relative block left-[1.6em] text-right">basics</span>
      </h1>
    </div>
  );
}
