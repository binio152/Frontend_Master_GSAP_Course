"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { useEffect, useRef } from "react";
import { distance } from "@/lib/math";
import Script from "next/script";

export default function Page() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "mousemove",
      (e: MouseEvent) => {
        const screen = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        const center = { x: screen.width / 2, y: screen.height / 2 };
        const mouse = { x: e.clientX, y: e.clientY };

        const d = distance(mouse.x, mouse.y, center.x, center.y);

        const maxDistance = distance(0, 0, center.x, center.y);

        if (titleRef.current) {
          titleRef.current.style.setProperty(
            "--distance",
            (d / maxDistance).toString(),
          );
        }
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, []);

  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid,
      )}
    >
      <Script
        src="//unpkg.com/react-scan/dist/auto.global.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <h1
        ref={titleRef}
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"],
        )}
      >
        Variables
      </h1>
    </div>
  );
}
