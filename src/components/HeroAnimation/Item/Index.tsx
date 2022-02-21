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

      if (open) {
        itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
        itemExpandedRef.current.style.top = window?.scrollY + "px";
        itemExpandedRef.current.style.left = "0px";
        itemExpandedRef.current.style.width = "100%";
        setTimeout(() => {
          if (itemExpandedRef.current) {
            itemExpandedRef.current.style.transition = "none";
            itemExpandedRef.current.style.position = "fixed";
            itemExpandedRef.current.style.top = "0px";
          }
        }, transitionDuration * 1000);
      } else {
        itemExpandedRef.current.style.top = offsetTop + "px";
        itemExpandedRef.current.style.left = offsetLeft + "px";
        itemExpandedRef.current.style.width = width + "px";
        itemExpandedRef.current.style.position = "absolute";
      }
    }
  };

  useEffect(() => {
    resizeItem();
  }, [open]);

  const toggleOpen = () => {
    if (userControlMod) {
      if (setOpen) {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }
    } else {
      if (isOpenFunc) {
        if (isOpen) {
          isOpenFunc(false);
        } else {
          isOpenFunc(true);
        }
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
        style={{ background: "aqua" }}
      >
        {children}
      </div>
    </>
  );
};

export default Item;
