import s from "./style.module.css";

export default function Page() {
  const text = "CSS version";
  const splitText = text.split(" ").map((text) => text.split(""));

  return (
    <div className="bg-blue-300 text-black">
      <div className="flex h-screen items-end justify-left overflow-hidden">
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          {splitText[0].map((char, index) => (
            <span
              key={index}
              className={s.letter}
              style={
                {
                  "--index": index,
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          ))}
          <br />
          {splitText[1].map((char, index) => (
            <span
              key={index}
              className={s.letter}
              style={
                {
                  "--index": splitText[0].length + index,
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
