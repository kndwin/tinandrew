import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { TinaModel } from "./tina";

export const Viewer = () => {
  const tinaModelRef = useRef(null);
  return (
    <Canvas
      className="my-12 flex w-full items-center justify-center"
      style={{ height: "30em" }}
      camera={{ position: [0, 1, 3] }}
    >
      <Suspense fallback={<Loading />}>
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          shadow-mapSize={[512, 512]}
          castShadow
          intensity={1}
        />
        <TinaModel ref={tinaModelRef} position={[0, -1, 0]} />
      </Suspense>
      <OrbitControls ref={tinaModelRef} />
    </Canvas>
  );
};

const Loading = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};
