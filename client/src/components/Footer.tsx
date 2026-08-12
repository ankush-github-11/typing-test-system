import { useLayoutEffect, useRef, useState } from "react";
import { IoLogoGithub, IoLocationSharp } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Settings", href: "/settings" },
];

const AutoFitText = ({ children }: { children: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const fit = () => {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      setScale(containerWidth / textWidth);
    };

    fit();
    const observer = new ResizeObserver(fit);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden flex justify-center"
    >
      <span
        ref={textRef}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          fontWeight: 500,
        }}
        className="text-[100px]"
      >
        {children}
      </span>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-bgcolorless text-textcolorless/90 px-6 md:px-10 py-10 pb-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">
          {/* Brand */}
          <div className="flex-[1.4]">
            <h1 className="text-2xl font-bold text-color1">EtherType</h1>
            <p className="text-sm mt-2 max-w-xs text-textcolorless/70 leading-relaxed">
              A new generation typing system with complete test analytics.
            </p>
          </div>

          {/* Explore */}
          <div className="flex-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-textcolorless/40 mb-4">
              Explore
            </h2>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group relative w-fit text-sm text-textcolorless/70 hover:text-color1 transition-colors"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-color1 transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <p className="text-sm text-textcolorless/70">
                Made by{" "}
                <span className="font-semibold text-textcolorless/80">
                  Ankush Bhattacharjee
                </span>
              </p>
              <p className="text-sm text-textcolorless/50">
                <IoLocationSharp className="inline-block -ml-[2px] mr-1" />
                Kolkata, India
              </p>
              <p className="text-sm text-textcolorless/50">
                <HiSparkles className="inline-block -ml-[2px] mr-1" />
                Built with <span className="font-semibold">React</span> and{" "}
                <span className="font-semibold">PostgreSQL</span>.
              </p>
              <a
                key="GitHub"
                href="https://github.com/ankush-github-11/typing-test-system"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-textcolorless/60 hover:text-color1 transition-colors focus-visible:outline focus-visible:outline-color1 focus-visible:outline-offset-4 rounded-sm -ml-[2px]"
              >
                <IoLogoGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-textcolorless/50">
            &copy; {new Date().getFullYear()} EtherType. All rights reserved.
          </p>
        </div>
        <div className="mt-4 text-textcolorless/50 w-full">
          <AutoFitText>Beat your best</AutoFitText>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
