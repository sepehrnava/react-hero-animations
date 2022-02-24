import { RefObject } from "react";
export interface ISetOpen {
  (value: boolean): void;
}
export interface IHero {
  open?: boolean;
  setOpen?: ISetOpen;
  controlled?: boolean;
  children?: any;
  transitionDuration?: number;
  related?: boolean;
  style?: Object;
  wrapperRef?: RefObject<HTMLElement>;
}

export interface IItem {
  children?: any;
  background?: string;
}

export interface IContent {
  children?: any;
}

export interface IResizeItem {
  itemRef: RefObject<HTMLDivElement>;
  itemExpandedRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  related: boolean;
  open: boolean;
  transitionDuration: number;
  inititalOpen: boolean;
  wrapperEl: HTMLElement | null | undefined;
}

export interface IStyleContent {
  contentRef: RefObject<HTMLDivElement>;
  related: boolean;
}
