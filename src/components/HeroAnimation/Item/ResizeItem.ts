import { IResizeItem } from "../../Types/Hero.types";

const ResizeItem = (props: IResizeItem) => {
  const { itemRef, itemExpandedRef, related, open, transitionDuration } = props;

  if (itemRef.current && itemExpandedRef.current) {
    const parentEL = itemRef.current.parentElement;

    const itemRect = itemRef.current.getBoundingClientRect();
    const bodyRect = document?.body.getBoundingClientRect();
    const parentRect = parentEL?.getBoundingClientRect();

    const { width } = itemRect;

    let itemLeft = itemRect.left,
      itemTop = itemRect.top,
      itemTopAfter = "0px",
      itemLeftAfter = "0px",
      widthBefore = width,
      widthAfter = "100%";

    let offsetTop = itemRect.top - bodyRect.top,
      offsetLeft = itemRect.left - bodyRect.left;

    if (related && parentRect) {
      itemTop -= parentRect.top;
      itemLeft -= parentRect.left;
      itemTopAfter = parentRect.top + "px";
      itemLeftAfter = parentRect.left + "px";
      widthAfter = parentRect.width + "px";
    }

    if (open) {
      itemExpandedRef.current.style.top = offsetTop + "px";
      itemExpandedRef.current.style.left = offsetLeft + "px";
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.visibility = `visible`;
      itemExpandedRef.current.style.pointerEvents = `none`;
      setTimeout(() => {
        if (itemRef.current) itemRef.current.style.visibility = `hidden`;
      }, 10);
      itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
      itemExpandedRef.current.style.transform = `translate(${-itemLeft}px, ${-itemTop}px)`;
      itemExpandedRef.current.style.width = widthAfter;

      setTimeout(() => {
        if (itemExpandedRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = itemTopAfter;
          itemExpandedRef.current.style.left = itemLeftAfter;
          itemExpandedRef.current.style.transform = "none";
          itemExpandedRef.current.style.pointerEvents = `auto`;
        }
      }, transitionDuration * 1000);
    } else {
      itemExpandedRef.current.style.transition = `all ${transitionDuration}s`;
      itemExpandedRef.current.style.transform = `translate(${itemLeft}px, ${itemTop}px)`;
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.pointerEvents = `none`;
      setTimeout(() => {
        if (itemExpandedRef.current && itemRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = offsetTop + "px";
          itemExpandedRef.current.style.left = offsetLeft + "px";
          itemExpandedRef.current.style.transform = "none";
          itemRef.current.style.visibility = `visible`;
          itemExpandedRef.current.style.visibility = `hidden`;
          itemExpandedRef.current.style.pointerEvents = `auto`;
        }
      }, transitionDuration * 1000);
    }
  }
};

export default ResizeItem;
