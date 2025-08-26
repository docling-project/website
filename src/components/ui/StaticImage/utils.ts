// Dependencies
import { ImageLoaderProps } from "next/image";

/**
 * The loader for static images.
 *
 * This loader function simply returns the image source path as is.
 *
 * @param {ImageLoaderProps} props
 * @returns {string}
 */
export const loader = ({ src, width, quality }: ImageLoaderProps): string => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
