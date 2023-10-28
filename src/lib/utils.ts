import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const roundToPlace = (num: number, place: number): number => {
  return (Math.round(num * Math.pow(10, place)) / Math.pow(10, place));
}