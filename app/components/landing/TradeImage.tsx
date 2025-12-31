import Image from "next/image";
import { motion } from "framer-motion";

export function TradeImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="flex items-center justify-center w-full h-auto"
    >
      <Image
        src="/images/trade.png"
        alt="Trade Image"
        width={1200}
        height={600}
      />
    </motion.div>
  );
}
