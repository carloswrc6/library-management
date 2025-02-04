import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const getName = (name: string): string => {
  const parts = name.split(" ");
  return parts.length >= 2 ? `${parts[0]} ${parts[1]}` : parts[0];
};

export const darkenColor = (hex: string, percent: number) => {
  let num = parseInt(hex.replace("#", ""), 16);
  let r = Math.max(0, (num >> 16) - (num >> 16) * percent);
  let g = Math.max(0, ((num >> 8) & 0x00ff) - ((num >> 8) & 0x00ff) * percent);
  let b = Math.max(0, (num & 0x0000ff) - (num & 0x0000ff) * percent);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};