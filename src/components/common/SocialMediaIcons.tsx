"use client"
import Link from "next/link"

interface SocialMediaIconsProps {
  facebookLink?: string | null
  instagramLink?: string | null
  youtubeLink?: string | null
  className?: string
  iconClassName?: string
}

const SocialMediaIcons = ({
  facebookLink,
  instagramLink,
  youtubeLink,
  className = "",
  iconClassName = "fs-5"
}: SocialMediaIconsProps) => {
  // Don't render anything if no social links are provided
  if (!facebookLink && !instagramLink && !youtubeLink) {
    return null
  }

  return (
    <ul className={`style-none d-flex align-items-center ${className}`}>
      {facebookLink && (
        <li>
          <Link
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center justify-content-center rounded-circle text-white ${iconClassName}`}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#1877F2",
              transition: "all 0.3s ease"
            }}
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
        </li>
      )}
      
      {instagramLink && (
        <li className="ms-2">
          <Link
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center justify-content-center rounded-circle text-white ${iconClassName}`}
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              transition: "all 0.3s ease"
            }}
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </li>
      )}
      
      {youtubeLink && (
        <li className="ms-2">
          <Link
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center justify-content-center rounded-circle text-white ${iconClassName}`}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#FF0000",
              transition: "all 0.3s ease"
            }}
            aria-label="YouTube"
          >
            <i className="fa-brands fa-youtube"></i>
          </Link>
        </li>
      )}
    </ul>
  )
}

export default SocialMediaIcons
