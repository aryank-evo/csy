'use client';
import Image from "next/image";

import verificationImg from "@/assets/images/verified-icon.webp"
const VerifiedProperty = () => {

  return (
    <span
      className="d-inline-flex align-items-center gap-1"
      title="Verified Property"
      style={{ cursor: 'help', lineHeight: 0 }}
    >
      <Image
        src={verificationImg}
        alt="Verified Property"
        width={50}
        height={50}
        priority
      />
    </span>
  );
};

export default VerifiedProperty;
