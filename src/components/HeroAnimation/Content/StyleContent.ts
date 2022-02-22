import { IStyleContent } from "../../Types/Hero.types";

const StyleContent = (props: IStyleContent) => {
  const { contentRef, related } = props;

  let itemExpandedEl;

  if (typeof document !== "undefined")
    itemExpandedEl = document.getElementById(
      "react-animations-hero-item-expanded"
    );

  if (contentRef.current && itemExpandedEl) {
    const itemExpandedRect = itemExpandedEl.getBoundingClientRect();

    let width = "100%";

    if (related) {
      width = itemExpandedRect.width + "px";
    }

    contentRef.current.style.width = width;
    contentRef.current.style.top =
      itemExpandedRect.top + itemExpandedRect.height + "px";
    contentRef.current.style.left = itemExpandedRect.left + "px";
  }
};

export default StyleContent;
