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
    relatedToParent = false,
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

      const itemRect = itemRef.current.getBoundingClientRect();

      let itemLeft = itemRect.left,
        itemTop = itemRect.top,
        itemPositionBefore = "absolute",
        itemPositionAfter = "fixed",
        itemTopAfter = "0px",
        itemLeftAfter = "0px",
        widthBefore = width,
        widthAfter = "100%";
      const bodyRect = document?.body.getBoundingClientRect();

      const parentEL = itemRef.current.parentElement;

      const parentRect = parentEL?.getBoundingClientRect();

      let offsetTop = itemRect.top - bodyRect.top;
      let offsetLeft = itemRect.left - bodyRect.left;

      if (relatedToParent && parentRect) {
        itemTop -= parentRect.top;
        itemLeft -= parentRect.left;
        itemTopAfter = parentRect.top + "px";
        itemLeftAfter = parentRect.left + "px";
        widthAfter = parentRect.width + "px";
      }

      if (currentOpen) {
        itemExpandedRef.current.style.visibility = `visible`;
        setTimeout(() => {
          if (itemRef.current) itemRef.current.style.visibility = `hidden`;
        }, 10);
        itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
        itemExpandedRef.current.style.transform = `translate(${-itemLeft}px, ${-itemTop}px)`;
        itemExpandedRef.current.style.width = widthAfter;

        setTimeout(() => {
          if (itemExpandedRef.current) {
            itemExpandedRef.current.style.position = itemPositionAfter;
            itemExpandedRef.current.style.transition = "none";
            itemExpandedRef.current.style.top = itemTopAfter;
            itemExpandedRef.current.style.left = itemLeftAfter;
            itemExpandedRef.current.style.transform = "none";
          }
        }, transitionDuration * 1000);
      } else {
        itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
        itemExpandedRef.current.style.transform = `translate(${itemLeft}px, ${itemTop}px)`;
        itemExpandedRef.current.style.width = widthBefore + "px";
        setTimeout(() => {
          if (itemExpandedRef.current && itemRef.current) {
            itemExpandedRef.current.style.position = itemPositionBefore;
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
