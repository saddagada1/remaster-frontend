import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import Gradient from "./gradient";
import { pitchClassColours } from "@/lib/constants";

interface SafeImageProps extends HTMLAttributes<HTMLDivElement> {
  url?: string | null;
  alt?: string;
  square?: boolean;
  grain?: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({
  url,
  alt,
  square,
  grain,
  className,
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <div
      {...props}
      className={cn(
        "relative aspect-square overflow-hidden",
        square ? "rounded-md" : "rounded-full",
        className,
      )}
    >
      {url && !error ? (
        <Image
          src={url}
          alt={alt ?? "Remaster Image"}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <>
          <Gradient
            colours={Object.values(pitchClassColours).filter(
              (_, i) => i % 2 !== 0,
            )}
          />
          {grain && <div className="anim-grain opacity-10 mix-blend-overlay" />}
        </>
      )}
    </div>
  );
};

export default SafeImage;
