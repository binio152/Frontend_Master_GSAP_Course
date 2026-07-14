"use client";

import { useEffect, useRef } from "react";
import s from "./styles.module.css";
import { lerp } from "@/lib/math";

export default function Page() {
  const mouseRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const callback = () => {
      // Calculate the current position of box
      // Current = Current + Delay
      // Delay   = (Target - Current) * Time
      cursorRef.current.x = lerp(cursorRef.current.x, targetRef.current.x, 0.2);
      cursorRef.current.y = lerp(cursorRef.current.y, targetRef.current.y, 0.2);

      // Update current position follow the mouse moving
      if (mouseRef.current) {
        mouseRef.current.style.setProperty(
          "--x",
          cursorRef.current.x.toString(),
        );

        mouseRef.current.style.setProperty(
          "--y",
          cursorRef.current.y.toString(),
        );
      }

      requestAnimationFrame(callback);
    };

    callback();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // Update the target of the box
    window.addEventListener("mousemove", (e: MouseEvent) => {
      const mouse = { x: e.clientX, y: e.clientY };
      if (mouseRef.current) targetRef.current = mouse;
    });

    return () => controller.abort();
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div ref={mouseRef} className={s.cursor} />
    </div>
  );
}
