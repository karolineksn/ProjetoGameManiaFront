import { HTMLAttributes } from 'react';

declare namespace JSX {
  interface IntrinsicElements {
    div: HTMLAttributes<HTMLDivElement>;
  }
}
