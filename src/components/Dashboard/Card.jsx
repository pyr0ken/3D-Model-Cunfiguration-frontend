import { useState, useRef } from "react";
import { GiHeartOrgan } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Card({ title, file, id }) {
  const divRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <Link to={`/dashboard/models/${id}`}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-md cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-950 px-8 py-16 shadow-2xl"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
          }}
        />
        <span className="mb-4 inline-flex items-center justify-center rounded-md bg-[#007BFF] p-3 shadow-lg">
          <GiHeartOrgan className="h-10 w-10 text-white" />
        </span>
        <h3 className="mb-2 font-medium tracking-tight text-white">{title}</h3>
        <p className="text-sm text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex
          obcaecati natus eligendi delectus, cum deleniti sunt in labore nihil
          quod quibusdam expedita nemo.
        </p>
        <p className="text-sm text-slate-400">{file}</p>
      </div>
    </Link>
  );
}
