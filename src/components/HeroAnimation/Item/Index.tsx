import React, { useContext, useEffect, useRef, useState } from "react";
import { IItem } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";
import "../Styles/hero.css";

const Item = (props: IItem) => {
  const {
    isOpen,
    isOpenFunc,
    open,
    setOpen,
    userControlMod,
    transitionDuration = 0.5,
  } = useContext(HeroContext);

  let currentOpen = isOpen,
    currentIsOpenFunc = isOpenFunc;

  if (userControlMod) {
    currentOpen = open;
    currentIsOpenFunc = setOpen;
  }

  userControlMod;
  const { children, background } = props;

  const itemRef = useRef<HTMLDivElement>(null);

  const itemExpandedRef = useRef<HTMLDivElement>(null);

  const resizeItem = () => {
    if (itemRef.current && itemExpandedRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const { width } = rect;

      const bodyRect = document?.body.getBoundingClientRect();
      const itemRect = itemRef.current.getBoundingClientRect();
      const offsetTop = itemRect.top - bodyRect.top;
      const offsetLeft = itemRect.left - bodyRect.left;

      if (currentOpen) {
        itemExpandedRef.current.style.visibility = `visible`;
        setTimeout(() => {
          if (itemRef.current) itemRef.current.style.visibility = `hidden`;
        }, 10);
        itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
        itemExpandedRef.current.style.transform = `translate(${-itemRect.left}px, ${-itemRect.top}px)`;
        itemExpandedRef.current.style.width = "100%";

        setTimeout(() => {
          if (itemExpandedRef.current) {
            itemExpandedRef.current.style.position = "fixed";
            itemExpandedRef.current.style.transition = "none";
            itemExpandedRef.current.style.top = "0px";
            itemExpandedRef.current.style.left = "0px";
            itemExpandedRef.current.style.transform = "none";
          }
        }, transitionDuration * 1000);
      } else {
        itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
        itemExpandedRef.current.style.transform = `translate(${itemRect.left}px, ${itemRect.top}px)`;
        itemExpandedRef.current.style.width = width + "px";
        setTimeout(() => {
          if (itemExpandedRef.current && itemRef.current) {
            itemExpandedRef.current.style.position = "absolute";
            itemExpandedRef.current.style.transition = "none";
            itemExpandedRef.current.style.top = offsetTop + "px";
            itemExpandedRef.current.style.left = offsetLeft + "px";
            itemExpandedRef.current.style.transform = "none";
            itemRef.current.style.visibility = `visible`;
            itemExpandedRef.current.style.visibility = `hidden`;
          }
        }, transitionDuration * 1000);
      }
    }
  };

  useEffect(() => {
    resizeItem();
  }, [currentOpen]);

  const toggleOpen = () => {
    if (currentIsOpenFunc) {
      if (currentOpen) {
        currentIsOpenFunc(false);
      } else {
        currentIsOpenFunc(true);
      }
    }
  };

  return (
    <>
      <div
        id='hero-item'
        ref={itemRef}
        onClick={toggleOpen}
        style={{ background }}
      >
        {children}
      </div>
      <div
        id='hero-item-expanded'
        ref={itemExpandedRef}
        onClick={toggleOpen}
        style={{ background }}
      >
        {children}
      </div>
    </>
  );
};

export default Item;
