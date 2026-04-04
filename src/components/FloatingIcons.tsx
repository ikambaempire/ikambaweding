import { motion } from "framer-motion";
import { Heart, Flower2, Sparkles, Star, HeartHandshake } from "lucide-react";

const icons = [
  { Icon: Heart, x: "10%", y: "15%", size: 24, delay: 0, duration: 6 },
  { Icon: Flower2, x: "85%", y: "20%", size: 28, delay: 1.5, duration: 7 },
  { Icon: Sparkles, x: "75%", y: "70%", size: 20, delay: 0.8, duration: 5.5 },
  { Icon: Heart, x: "15%", y: "75%", size: 18, delay: 2, duration: 6.5 },
  { Icon: Star, x: "90%", y: "50%", size: 16, delay: 3, duration: 7.5 },
  { Icon: HeartHandshake, x: "5%", y: "45%", size: 22, delay: 1, duration: 6 },
  { Icon: Flower2, x: "50%", y: "85%", size: 20, delay: 2.5, duration: 5 },
  { Icon: Heart, x: "65%", y: "10%", size: 16, delay: 0.5, duration: 8 },
  { Icon: Sparkles, x: "30%", y: "90%", size: 18, delay: 1.8, duration: 6.2 },
  { Icon: Star, x: "40%", y: "8%", size: 14, delay: 3.5, duration: 7 },
];

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {icons.map(({ Icon, x, y, size, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ color: i % 2 === 0 ? 'rgba(218, 83, 34, 0.15)' : 'rgba(255, 193, 7, 0.15)' }}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.15, 0.08, 0.15, 0],
            y: [20, -15, 10, -20, 20],
            rotate: [0, 10, -5, 15, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
