import React, { useState } from "react";
import Item from "./Item/Index";
import Content from "./Content/Index";

import { IHero } from "../Types/Hero.types";

export const HeroContext = React.createContext<IHero>({});

export const Hero = (props: IHero) => {
  const { children, transitionDuration, related, style, wrapperRef } = props;

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
    wrapperRef,
  };

  let renderItem = null;

  if (children.length > 0) {
    children.forEach((element: any) => {
      if (element.type?.displayName === "Hero.Item") {
        renderItem = element;
      }
    });
  } else {
    if (children?.type?.displayName === "Hero.Item") renderItem = children;
  }

  return (
    <HeroContext.Provider value={contextValue}>
      <div style={style}>{renderItem}</div>
    </HeroContext.Provider>
  );
};

Hero.Item = Item;
Hero.Content = Content;

export { Item as HeroItem, Content as HeroContent };
