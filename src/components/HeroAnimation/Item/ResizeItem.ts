import { IResizeItem } from "../../Types/Hero.types";

const ResizeItem = (props: IResizeItem) => {
  const {
    itemRef,
    itemExpandedRef,
    overlayRef,
    related,
    open,
    transitionDuration,
    inititalOpen,
  } = props;

  if (itemRef.current && itemExpandedRef.current && overlayRef.current) {
    const parentEL = itemRef.current.parentElement;
    let grandParentEL;
    if (parentEL && parentEL.parentElement)
      grandParentEL = parentEL.parentElement.parentElement;

    const itemRect = itemRef.current.getBoundingClientRect();
    const bodyRect = document?.body.getBoundingClientRect();
    const grandParentRect = grandParentEL?.getBoundingClientRect();

    const { width, height } = itemRect;

    let itemLeft = itemRect.left,
      itemTop = itemRect.top,
      itemTopAfter = "0px",
      itemLeftAfter = "0px",
      widthBefore = width,
      widthAfter = "100vw",
      overlayWidth = "100vw",
      overlayTopAfter = "0px",
      overlayHeight = "100vh",
      overlayPosition = "fixed",
      itemPosition = "fixed",
      transition = `all ${transitionDuration}s`;

    let offsetTop = itemRect.top - bodyRect.top,
      offsetLeft = itemRect.left - bodyRect.left;

    if (related && grandParentRect) {
      itemTop -= grandParentRect.top;
      itemLeft -= grandParentRect.left;
      itemTopAfter = grandParentRect.top - bodyRect.top + "px";
      itemLeftAfter = grandParentRect.left + "px";
      overlayTopAfter = grandParentRect.top - bodyRect.top + "px";
      widthAfter = grandParentRect.width + "px";
      overlayPosition = "absolute";
      overlayWidth = grandParentRect.width + "px";
      overlayHeight = grandParentRect.height + "px";
      itemPosition = "absolute";
    }

    if (inititalOpen) {
      transition = "none";
    }

    if (open) {
      itemExpandedRef.current.style.top = offsetTop + "px";
      itemExpandedRef.current.style.left = offsetLeft + "px";
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = height + "px";

      itemExpandedRef.current.style.visibility = `visible`;
      itemExpandedRef.current.style.pointerEvents = `none`;
      setTimeout(() => {
        if (itemRef.current) itemRef.current.style.visibility = `hidden`;
      }, 10);
      itemExpandedRef.current.style.transition = transition;
      itemExpandedRef.current.style.transform = `translate(${-itemLeft}px, ${-itemTop}px)`;
      itemExpandedRef.current.style.width = widthAfter;

      setTimeout(() => {
        if (itemExpandedRef.current && overlayRef.current && grandParentRect) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = itemTopAfter;
          itemExpandedRef.current.style.left = itemLeftAfter;
          itemExpandedRef.current.style.transform = "none";
          itemExpandedRef.current.style.pointerEvents = `auto`;
          itemExpandedRef.current.style.position = itemPosition;
          itemExpandedRef.current.style.visibility = `hidden`;
          overlayRef.current.style.top = overlayTopAfter;
          overlayRef.current.style.left = itemLeftAfter;
          overlayRef.current.style.display = "block";
          overlayRef.current.style.width = overlayWidth;
          overlayRef.current.style.height = overlayHeight;
          overlayRef.current.style.position = overlayPosition;
          overlayRef.current.scrollTop = 0;
        }
      }, transitionDuration * 1000);
    } else {
      itemExpandedRef.current.style.visibility = `visible`;
      itemExpandedRef.current.style.transition = transition;
      itemExpandedRef.current.style.transform = `translate(${itemLeft}px, ${itemTop}px)`;
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = height + "px";
      itemExpandedRef.current.style.pointerEvents = `none`;
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.display = `none`;
      }, 10);

      setTimeout(() => {
        if (itemExpandedRef.current && itemRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = offsetTop + "px";
          itemExpandedRef.current.style.left = offsetLeft + "px";
          itemExpandedRef.current.style.transform = "none";
          itemRef.current.style.visibility = `visible`;
          itemExpandedRef.current.style.visibility = `hidden`;
          itemExpandedRef.current.style.pointerEvents = `auto`;
          itemExpandedRef.current.style.position = "absolute";
        }
      }, transitionDuration * 1000);
    }
  }
};

export default ResizeItem;
