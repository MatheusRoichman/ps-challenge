import Image, { ImageProps } from "next/image";
import { FC, useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallback?: string;
}

const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  fallback = "/assets/img/no-image.webp",
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
