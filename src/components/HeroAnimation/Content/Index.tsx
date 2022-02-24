import React, { useRef } from "react";
import { IContent } from "../../Types/Hero.types";

const Content = (props: IContent) => {
  const { children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  return <div ref={contentRef}>{children}</div>;
};

export default Content;
