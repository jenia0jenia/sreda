import React, { useEffect, useRef, useState } from "react";
import "./style.scss"
import { webgl } from "./webgl";

export default function VideoWithAlpha(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

  const handleVideoRef = (element: HTMLVideoElement) => {
    if (element !== videoRef) {
      setVideoRef(element);
    }
  };

  useEffect(() => {
    if (canvasRef && videoRef) {
      const video = videoRef;
      const canvas = canvasRef.current;
      const initWebGL = () => webgl(canvas, video);
      video.addEventListener("playing", initWebGL);
      return () => video.removeEventListener("playing", initWebGL);
    }
  }, [canvasRef, videoRef]);

  return (
    <>
      <video
        ref={handleVideoRef}
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: 0,
          width: 0,
          opacity: 0,
          pointerEvents: "none"
        }}
        {...props}
      />
      <canvas ref={canvasRef} />
    </>
  );
}
