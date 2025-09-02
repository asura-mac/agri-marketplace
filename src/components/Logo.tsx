import Image from "next/image";

export default function Logo({ size = 110 }: { size?: number }) {
  return <Image src="/next.svg" alt="Logo" width={size} height={Math.round(size/4)} />;
}


