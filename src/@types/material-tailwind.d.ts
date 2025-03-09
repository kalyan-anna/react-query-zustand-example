// https://github.com/creativetimofficial/material-tailwind/issues/651
import {} from '@material-tailwind/react';

type EventCapture = {
  onPointerEnterCapture?: unknown;
  onPointerLeaveCapture?: unknown;
};

declare module '@material-tailwind/react' {
  export interface ButtonProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface InputProps extends EventCapture {
    crossOrigin?: unknown;
  }
  export interface SelectProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface CardFooterProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface CardProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface CardHeaderProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface TypographyProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface CardBodyProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface Avatar extends EventCapture {
    placeholder?: unknown;
  }
  export interface MenuList extends EventCapture {
    placeholder?: unknown;
  }
  export interface MenuItem extends EventCapture {
    placeholder?: unknown;
  }
  export interface Navbar extends EventCapture {
    placeholder?: unknown;
  }
  export interface IconButton extends EventCapture {
    placeholder?: unknown;
  }
  export interface List extends EventCapture {
    placeholder?: unknown;
  }
  export interface ListItem extends EventCapture {
    placeholder?: unknown;
  }
  export interface ListItemPrefix extends EventCapture {
    placeholder?: unknown;
  }
}
