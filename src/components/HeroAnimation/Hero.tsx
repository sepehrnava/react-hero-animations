import React, { useState } from "react";
import Item from "./Item/Index";
import Content from "./Content/Index";

import { IHero } from "../Types/Hero.types";

export const HeroContext = React.createContext<IHero>({});

export const Hero = (props: IHero) => {
  const { children, open, setOpen, transitionDuration } = props;

  const [isOpen, setIsOpen] = useState(false);

  function isOpenFunc(value: boolean) {
    setIsOpen(value);
  }

  let userControlMod: boolean = false;

  if (typeof open !== "undefined") {
    userControlMod = true;
  }

  let contextValue: IHero = {
    isOpen,
    isOpenFunc,
    open,
    setOpen,
    userControlMod,
    transitionDuration,
  };

  return (
    <HeroContext.Provider value={contextValue}>{children}</HeroContext.Provider>
  );
};

Hero.Item = Item;
Hero.Content = Content;
