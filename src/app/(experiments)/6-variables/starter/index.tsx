"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { CSSProperties, useEffect, useState } from "react";
import { distance } from "@/lib/math";

export default function Page() {
  const [distanceFromCenter, setDistanceFromCenter] = useState(0);

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

        setDistanceFromCenter(d / maxDistance);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, [distanceFromCenter]);

  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid,
      )}
    >
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"],
        )}
        style={
          {
            "--distance": distanceFromCenter,
          } as CSSProperties
        }
      >
        Variables
      </h1>
    </div>
  );
}
