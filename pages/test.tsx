import { useState } from "react";
import { checkWord } from "../util/supabase";
import { useAuth } from "../util/auth";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

const childVariants = {
  hidden: {
    // opacity: 0,
    rotateX: -90,
    fill: "#979797",
  },
  visible: {
    // opacitX: 1,
    rotateX: 0,
    fill: "#78B159",
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

// const childVariants = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//   },
// };

const Test = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-green-600 w-64"
    >
      <motion.div variants={childVariants} className="w-16 h-16 bg-red-500">
        <h1>yooooo</h1>
      </motion.div>
      <motion.div
        variants={childVariants}
        className="w-16 h-16 bg-red-500"
      ></motion.div>
      <motion.div
        variants={childVariants}
        className="w-16 h-16 bg-red-500"
      ></motion.div>
      <motion.div
        variants={childVariants}
        className="w-16 h-16 bg-red-500"
      ></motion.div>
    </motion.div>
  );
};

export default Test;
