import { IResizeItem } from "../../Types/Hero.types";

const ResizeItem = (props: IResizeItem) => {
  const {
    itemRef,
    itemExpandedRef,
    overlayRef,
    overlayItemExpandedRef,
    contentWrapper,
    related,
    open,
    transitionDuration,
    wrapperEl,
    hasWrapper,
    inititalOpen,
    targetHeight,
  } = props;

  if (itemRef.current && itemExpandedRef.current && overlayRef.current) {
    const itemRect = itemRef.current.getBoundingClientRect();
    const bodyRect = document?.body.getBoundingClientRect();
    const wrapperRect = wrapperEl?.getBoundingClientRect();

    const { width, height } = itemRect;

    let itemLeft = itemRect.left,
      itemTop = itemRect.top,
      itemTopAfter = "0px",
      itemLeftAfter = "0px",
      widthBefore = width,
      widthAfter = "100vw",
      heightBefore = height + "px",
      heightAfter = height,
      overlayWidth = "100vw",
      overlayTopAfter = "0px",
      overlayHeight = "100vh",
      overlayPosition = "fixed",
      itemPosition = "fixed",
      borderRadiusBefore = itemRef.current.style.borderRadius,
      borderRadiusAfter = wrapperEl?.style.borderRadius,
      transition = `transform ${transitionDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.2), width ${transitionDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.2), height ${transitionDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.2)`;
    // cubic-bezier(0.175, 0.885, 0.32, 1.2)
    let offsetTop = itemRect.top - bodyRect.top,
      offsetLeft = itemRect.left - bodyRect.left;

    if ((related || hasWrapper) && wrapperRect) {
      itemTop -= wrapperRect.top;
      itemLeft -= wrapperRect.left;
      itemTopAfter = wrapperRect.top - bodyRect.top + "px";
      itemLeftAfter = wrapperRect.left + "px";
      overlayTopAfter = wrapperRect.top - bodyRect.top + "px";
      widthAfter = wrapperRect.width + "px";
      overlayPosition = "absolute";
      overlayWidth = wrapperRect.width + "px";
      overlayHeight = wrapperRect.height + "px";
      itemPosition = "absolute";
      if (hasWrapper) {
        heightAfter = wrapperRect.height;
      }
    }
    if (targetHeight && targetHeight !== "same") {
      if (targetHeight === "full") {
        if (wrapperRect) heightAfter = wrapperRect.height;
      } else {
        heightAfter = targetHeight;
      }
    }
    if (overlayItemExpandedRef.current) {
      overlayItemExpandedRef.current.style.height = heightAfter + "px";
    }

    const transitionTarget = () => {
      if (open) {
        if (itemExpandedRef.current && overlayRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = itemTopAfter;
          itemExpandedRef.current.style.left = itemLeftAfter;
          itemExpandedRef.current.style.transform = "none";
          itemExpandedRef.current.style.pointerEvents = `auto`;
          itemExpandedRef.current.style.position = itemPosition;
          itemExpandedRef.current.style.opacity = `0`;

          overlayRef.current.style.top = overlayTopAfter;
          overlayRef.current.style.left = itemLeftAfter;
          overlayRef.current.style.visibility = "visible";
          overlayRef.current.style.width = overlayWidth;
          overlayRef.current.style.height = overlayHeight;
          overlayRef.current.style.position = overlayPosition;
          overlayRef.current.scrollTop = 0;
        }
      } else {
        if (itemExpandedRef.current && itemRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = offsetTop + "px";
          itemExpandedRef.current.style.left = offsetLeft + "px";
          itemExpandedRef.current.style.transform = "none";
          itemRef.current.style.opacity = `1`;
          itemExpandedRef.current.style.opacity = `0`;
          itemExpandedRef.current.style.pointerEvents = `auto`;
          itemExpandedRef.current.style.position = "absolute";
        }
      }
    };
    if (contentWrapper)
      contentWrapper.style.height = `calc(100% - ${heightAfter}px)`;

    if (inititalOpen) {
      transition = "none";
    }

    if (open) {
      itemExpandedRef.current.style.top = offsetTop + "px";
      itemExpandedRef.current.style.left = offsetLeft + "px";
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = heightBefore;
      itemExpandedRef.current.style.borderRadius = borderRadiusAfter || "";
      overlayRef.current.style.borderRadius = borderRadiusAfter || "";
      itemExpandedRef.current.style.pointerEvents = `none`;
      itemExpandedRef.current.style.transition = transition;
      itemExpandedRef.current.style.transform = `translate(${-itemLeft}px, ${-itemTop}px)`;
      itemExpandedRef.current.style.width = widthAfter;
      itemExpandedRef.current.style.height = heightAfter + "px";

      if (inititalOpen) {
        transitionTarget();
      } else {
        setTimeout(() => {
          transitionTarget();
        }, transitionDuration * 1000);
      }
    } else {
      itemExpandedRef.current.style.opacity = `1`;
      itemExpandedRef.current.style.transition = transition;
      itemExpandedRef.current.style.transform = `translate(${itemLeft}px, ${itemTop}px)`;
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = heightBefore;
      itemExpandedRef.current.style.pointerEvents = `none`;
      itemExpandedRef.current.style.borderRadius = borderRadiusBefore;

      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.visibility = "hidden";
      }, 10);

      if (inititalOpen) {
        transitionTarget();
      } else {
        setTimeout(() => {
          transitionTarget();
        }, transitionDuration * 1000);
      }
    }
  }
};

export default ResizeItem;
