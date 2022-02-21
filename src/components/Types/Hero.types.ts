export interface IIsOpenFunc {
  (value: boolean): void;
}

export interface IHero {
  open?: boolean | undefined;
  setOpen?: IIsOpenFunc;
  userControlMod?: boolean | undefined;
  isOpen?: boolean | undefined;
  isOpenFunc?: IIsOpenFunc;
  children?: any;
  transitionDuration?: number;
  relatedToParent?: boolean;
}

export interface IItem {
  children?: any;
  background?: string;
}

export interface IContent {
  children?: any;
}
