import React, { useContext, useEffect, useState } from "react";
import { IContent } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";

const Content = (props: IContent) => {
  const { open, transitionDuration = 0.5 } = useContext(HeroContext);
  const { children } = props;

  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDisplay("block");
      }, transitionDuration * 1000);
    } else {
      setDisplay("none");
    }
  }, [open]);

  return <div style={{ ...styles.heroContent, display }}>{children}</div>;
};

const styles = {
  heroContent: {
    position: "absolute" as "absolute",
    display: "none",
  },
};

export default Content;
