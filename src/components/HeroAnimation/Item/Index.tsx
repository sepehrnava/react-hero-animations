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
    wrapperRef,
  } = useContext(HeroContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const itemExpandedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [inititalOpen, setInititalOpen] = useState(true);

  useEffect(() => {
    if (itemRef.current && itemExpandedRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      itemExpandedRef.current.style.width = itemRect.width + "px";
    }
  }, []);

  useEffect(() => {
    let wrapperEl =
      itemRef.current?.parentElement?.parentElement?.parentElement;

    if (wrapperRef) wrapperEl = wrapperRef.current;

    ResizeItem({
      itemRef,
      itemExpandedRef,
      overlayRef,
      related,
      open,
      transitionDuration,
      wrapperEl,
      inititalOpen,
    });
    setInititalOpen(false);
  }, [open]);

  const toggleOpen = () => {
    setOpen && setOpen(!open);
  };

  // console.log(Object.keys(children[1]._owner));

  // console.log(children[1].type.displayName);

  let renderContent = null;

  if (children.length > 0) {
    children.forEach((element: any) => {
      if (element.type?.displayName === "Hero.Content") {
        renderContent = element;
      }
    });
  } else {
    if (children?.type?.displayName === "Hero.Content")
      renderContent = children;
  }

  let renderExceptContent = [];

  if (children.length > 0) {
    children.forEach((element: any) => {
      if (element.type?.displayName !== "Hero.Content") {
        renderExceptContent.push(element);
      }
    });
  } else {
    if (children?.type?.displayName !== "Hero.Content")
      renderExceptContent = children;
  }

  return (
    <div style={styles.heroContainer}>
      <div
        ref={itemRef}
        onClick={toggleOpen}
        style={{ ...styles.heroItem, background }}
      >
        {renderExceptContent}
      </div>
      <div
        ref={itemExpandedRef}
        onClick={toggleOpen}
        style={{ ...styles.heroItemExpanded, background }}
        id='react-animations-hero-item-expanded'
      >
        {renderExceptContent}
      </div>
      <div style={styles.overlay} ref={overlayRef}>
        <div
          onClick={toggleOpen}
          style={{ ...styles.heroItemOverlay, background }}
        >
          {renderExceptContent}
        </div>

        {renderContent}
      </div>
    </div>
  );
};

const styles = {
  heroContainer: {
    overflow: "auto",
  },
  heroItem: {
    width: "max-content",
    cursor: "pointer",
    display: "flex",
  },
  heroItemExpanded: {
    position: "absolute" as "absolute",
    visibility: "hidden" as "hidden",
    cursor: "pointer",
    display: "flex",
  },
  overlay: {
    // backgroundColor: "aqua",
    display: "none",
    position: "absolute" as "absolute",
    overflow: "auto",
  },
  heroItemOverlay: {},
};

export default Item;
