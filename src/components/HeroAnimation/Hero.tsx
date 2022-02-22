import React, { useState } from "react";
import Item from "./Item/Index";
import Content from "./Content/Index";

import { IHero } from "../Types/Hero.types";

export const HeroContext = React.createContext<IHero>({});

export const Hero = (props: IHero) => {
  const { children, transitionDuration, related } = props;

  const [nativeOpen, nativeSetOpen] = useState(false);

  const userOpen = props.open;
  const userSetOpen = props.setOpen;

  let controlled: boolean = false;

  if (typeof userOpen !== "undefined") {
    controlled = true;
  }

  let contextValue: IHero = {
    open: controlled ? userOpen : nativeOpen,
    setOpen: controlled ? userSetOpen : nativeSetOpen,
    controlled,
    transitionDuration,
    related,
  };

  return (
    <HeroContext.Provider value={contextValue}>{children}</HeroContext.Provider>
  );
};

Hero.Item = Item;
Hero.Content = Content;
