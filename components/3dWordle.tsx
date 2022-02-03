import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const ThreeDWordle = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <color attach="background">{"#000"}</color>

      {/* positon = [x,y,z] */}
      <ambientLight />
      {/* <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box>
      <Box args={[1, 1, 1]} position={[1.5, 0, 0]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box>
      <Box args={[1, 1, 1]} position={[-1.5, 0, 0]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box>

      <Box args={[1, 1, 1]} position={[3, 0, 0]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box>
      <Box args={[1, 1, 1]} position={[-3, 0, 0]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box> */}
      {/* <Box args={[1, 1, 1]} position={[1, 1, 1]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box>
      <Box args={[1, 1, 1]} position={[1, 1, 1]}>
        <meshBasicMaterial color={"#E81224"} />
      </Box> */}
    </Canvas>
  );
};

export default ThreeDWordle;
