import React, { useContext, useEffect, useState, useRef } from "react";
import { IContent } from "../../Types/Hero.types";

const Content = (props: IContent) => {
  const { children } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  console.log("content rendered");

  return <div ref={contentRef}>{children}</div>;
};

export default Content;
