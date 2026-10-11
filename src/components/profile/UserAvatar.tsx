
import { useState } from "react";
import { BsPersonFill } from "react-icons/bs";

interface UserAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

const UserAvatar = ({
  imageUrl,
  name,
  size = 45,
  className = "",
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const showImage = Boolean(imageUrl) && !imageError;

  const initials = name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full
        border border-gray-200 bg-gray-100 shadow-sm
        ring-2 ring-white dark:border-gray-700
        dark:bg-gray-800 dark:ring-gray-900 ${className}`}
      style={{ width: size, height: size }}
      title={name || "User"}
    >
      {showImage ? (
        <img
          src={imageUrl!}
          alt={name || "User avatar"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <div className="flex h-full w-full items-center justify-center
          bg-gradient-to-br from-blue-100 to-indigo-100
          font-semibold text-blue-700 dark:from-blue-950
          dark:to-indigo-950 dark:text-blue-300"
          style={{ fontSize: size * 0.34 }}
          aria-label={name || "User"}
        >
          {initials}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center
          text-gray-500 dark:text-gray-400">
          <BsPersonFill
            style={{
              width: size * 0.65,
              height: size * 0.65,
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
