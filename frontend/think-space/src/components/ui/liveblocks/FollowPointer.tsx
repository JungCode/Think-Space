import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";
const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: any;
  y: any;
  info: {
    name: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(info.name);
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50 "
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1, x:-255 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 24 24"
        className={`h-6 w-6 text-${color} stroke-[${color}]`}
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full "
      >
        {info.name || "Anonymous"}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
