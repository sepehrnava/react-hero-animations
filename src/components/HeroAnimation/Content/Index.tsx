import React, { useContext, useEffect, useState, useRef } from "react";
import { IContent } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";
import StyleContent from "./StyleContent";

const Content = (props: IContent) => {
  const { open, transitionDuration = 0.5, related = false } = useContext(
    HeroContext
  );
  const { children } = props;

  const [display, setDisplay] = useState("none");

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDisplay("block");
        StyleContent({ contentRef, related });
      }, transitionDuration * 1000);
    } else {
      setDisplay("none");
    }
  }, [open]);

  return (
    <div ref={contentRef} style={{ ...styles.heroContent, display }}>
      {children}
    </div>
  );
};

const styles = {
  heroContent: {
    position: "absolute" as "absolute",
    display: "none",
    overflow: "auto",
  },
};

export default Content;
