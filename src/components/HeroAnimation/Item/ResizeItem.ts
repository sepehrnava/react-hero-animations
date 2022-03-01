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
    const clientWidth = wrapperEl?.clientWidth;
    const clientHeight = wrapperEl?.clientHeight;
    const widthDiff = (wrapperRect.width - clientWidth) / 2;
    const heightDiff = (wrapperRect.height - clientHeight) / 2;
    console.log(heightDiff);
    console.log("wrapperRect.width: ", wrapperRect.width);
    console.log("clientWidth: ", clientWidth);
    console.log("widthDiff: ", widthDiff);

    const { width, height } = itemRect;

    let itemLeft = itemRect.left,
      itemTop = itemRect.top,
      itemTopAfter = heightDiff,
      itemLeftAfter = widthDiff,
      widthBefore = width,
      widthAfter = "100vw",
      heightBefore = height + "px",
      heightAfter = height,
      overlayWidth = "100vw",
      overlayTopAfter = heightDiff,
      overlayHeight = "100vh",
      overlayPosition = "fixed",
      itemPosition = "fixed",
      borderRadiusBefore = itemRef.current.style.borderRadius,
      borderRadiusAfter = wrapperEl?.style.borderRadius,
      transition = `all ${transitionDuration}s, opacity 0s`;
    //
    let offsetTop = itemRect.top - bodyRect.top + heightDiff,
      offsetLeft = itemRect.left - bodyRect.left + widthDiff;

    if ((related || hasWrapper) && wrapperRect) {
      itemTop -= wrapperRect.top;
      itemLeft -= wrapperRect.left;
      itemTopAfter = wrapperRect.top - bodyRect.top + heightDiff;
      itemLeftAfter = wrapperRect.left + widthDiff;
      overlayTopAfter = wrapperRect.top - bodyRect.top + heightDiff;
      widthAfter = wrapperRect.width - widthDiff * 2 + "px";
      overlayPosition = "absolute";
      overlayWidth = clientWidth + "px";
      overlayHeight = clientHeight + "px";
      itemPosition = "absolute";
      if (hasWrapper) {
        heightAfter = clientHeight;
      }
    }
    if (targetHeight && targetHeight !== "same") {
      if (targetHeight === "full") {
        if (wrapperRect) heightAfter = clientHeight;
      } else {
        heightAfter = targetHeight;
      }
    }
    if (overlayItemExpandedRef.current) {
      overlayItemExpandedRef.current.style.height = heightAfter + "px";
    }
    console.log("itemTopAfter: ", itemTopAfter);
    const transitionTarget = () => {
      if (open) {
        if (itemExpandedRef.current && overlayRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = itemTopAfter + "px";
          itemExpandedRef.current.style.left = itemLeftAfter + "px";
          itemExpandedRef.current.style.transform = "none";
          itemExpandedRef.current.style.pointerEvents = `auto`;
          itemExpandedRef.current.style.position = itemPosition;
          itemExpandedRef.current.style.opacity = `0`;

          overlayRef.current.style.top = overlayTopAfter + "px";
          overlayRef.current.style.left = itemLeftAfter + "px";
          overlayRef.current.style.visibility = "visible";
          overlayRef.current.style.width = overlayWidth;
          overlayRef.current.style.height = overlayHeight;
          overlayRef.current.style.position = overlayPosition;
          overlayRef.current.scrollTop = 0;
        }
      } else {
        if (itemExpandedRef.current && itemRef.current) {
          itemExpandedRef.current.style.transition = "none";
          itemExpandedRef.current.style.top = offsetTop - heightDiff + "px";
          itemExpandedRef.current.style.left = offsetLeft - widthDiff + "px";
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
      itemExpandedRef.current.style.top = offsetTop - heightDiff + "px";
      itemExpandedRef.current.style.left = offsetLeft - widthDiff + "px";
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = heightBefore;
      // itemExpandedRef.current.style.borderRadius = borderRadiusAfter || "";
      // overlayRef.current.style.borderRadius = borderRadiusAfter || "";
      itemExpandedRef.current.style.pointerEvents = `none`;
      itemExpandedRef.current.style.transition = transition;
      itemExpandedRef.current.style.transform = `translate(${
        -itemLeft + widthDiff
      }px, ${-itemTop + heightDiff}px)`;
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
      itemExpandedRef.current.style.transform = `translate(${
        itemLeft - widthDiff
      }px, ${itemTop - heightDiff}px)`;
      itemExpandedRef.current.style.width = widthBefore + "px";
      itemExpandedRef.current.style.height = heightBefore;
      itemExpandedRef.current.style.pointerEvents = `none`;
      // itemExpandedRef.current.style.borderRadius = borderRadiusBefore;

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
