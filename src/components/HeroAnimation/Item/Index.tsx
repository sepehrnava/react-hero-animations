import React, { useContext, useEffect, useRef, useState } from "react";
import { IItem } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";
import ResizeItem from "./ResizeItem";
import Content from "../Content/Index";

const Item = (props: IItem) => {
  const { children, background } = props;

  const {
    open = false,
    setOpen,
    transitionDuration = 0.5,
    related = false,
    wrapperRef,
    targetHeight = "same",
  } = useContext(HeroContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const itemExpandedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayItemExpandedRef = useRef<HTMLDivElement>(null);

  const [inititalOpen, setInititalOpen] = useState(true);

  useEffect(() => {
    if (itemRef.current && itemExpandedRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      itemExpandedRef.current.style.width = itemRect.width + "px";
    }
  }, []);

  useEffect(() => {
    let hasWrapper = false,
      wrapperEl = itemRef.current?.parentElement?.parentElement?.parentElement;

    if (wrapperRef) {
      wrapperEl = wrapperRef.current;
      hasWrapper = true;
    }

    let contentWrapper;
    if (typeof document !== undefined) {
      contentWrapper = document.getElementById("react-hero-content-container");
    }

    ResizeItem({
      itemRef,
      itemExpandedRef,
      overlayRef,
      overlayItemExpandedRef,
      contentWrapper,
      related,
      open,
      transitionDuration,
      wrapperEl,
      hasWrapper,
      inititalOpen,
      targetHeight,
    });
    setInititalOpen(false);
  }, [open]);

  const toggleOpen = () => {
    setOpen && setOpen(!open);
  };

  let renderContent = null;

  if (children.length > 0) {
    children.forEach((element: any) => {
      if (element.type === Content) {
        renderContent = element;
      }
    });
  } else {
    if (children.type === Content) renderContent = children;
  }

  let renderExceptContent = [];

  if (children.length > 0) {
    children.forEach((element: any) => {
      if (element.type !== Content) {
        renderExceptContent.push(element);
      }
    });
  } else {
    if (children.type !== Content) renderExceptContent = children;
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
      >
        {renderExceptContent}
      </div>
      <div
        //@ts-ignore
        style={styles.overlay}
        ref={overlayRef}
        className='react-hero-overlay'
      >
        <div
          onClick={toggleOpen}
          style={{ background }}
          ref={overlayItemExpandedRef}
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
    overflow: "hidden",
  },
  overlay: {
    visibility: "hidden" as "hidden",
    position: "absolute" as "absolute",
    overflowY: "overlay" as "overlay",
  },
};

export default Item;
