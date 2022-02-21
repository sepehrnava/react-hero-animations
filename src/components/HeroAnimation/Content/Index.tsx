import React, { useContext } from "react";
import { IContent } from "../../Types/Hero.types";
import { HeroContext } from "../Hero";

const Content = (props: IContent) => {
  const { isOpen, open, userControlMod } = useContext(HeroContext);
  const { children } = props;

  return userControlMod
    ? open && <div>{children}</div>
    : isOpen && <div>{children}</div>;
};

export default Content;
