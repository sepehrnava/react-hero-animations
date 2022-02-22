import React, { useContext, useEffect, useRef, useState } from "react";
import { IItem } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";
import ResizeItem from "./ResizeItem";

const Item = (props: IItem) => {
  const { children, background } = props;

  const {
    open = false,
    setOpen,
    transitionDuration = 0.5,
    related = false,
  } = useContext(HeroContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const itemExpandedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current && itemExpandedRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      itemExpandedRef.current.style.width = itemRect.width + "px";
    }
  }, []);

  useEffect(() => {
    ResizeItem({
      itemRef,
      itemExpandedRef,
      related,
      open,
      transitionDuration,
    });
  }, [open]);

  const toggleOpen = () => {
    setOpen && setOpen(!open);
  };

  return (
    <>
      <div
        ref={itemRef}
        onClick={toggleOpen}
        style={{ ...styles.heroItem, background }}
      >
        {children}
      </div>
      <div
        ref={itemExpandedRef}
        onClick={toggleOpen}
        style={{ ...styles.heroItemExpanded, background }}
        id='react-animations-hero-item-expanded'
      >
        {children}
      </div>
    </>
  );
};

const styles = {
  heroItem: {
    width: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1,
  },
  heroItemExpanded: {
    position: "absolute" as "absolute",
    visibility: "hidden" as "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1,
  },
};

export default Item;
