import { useEffect } from "react";
import WixAlphaClass from "../../classes/wix-alpha/index.js";
import "./AlphaVideo.scss"

export default function AlphaVideo(props: any) {
  useEffect(() => {
    const WixAlpha = new WixAlphaClass(`#target-${props.id}`, `#${props.id}`)
  }, []);

  return (
    <>
      <section id="video-sec" className="video-place">
        <canvas id={`target-${props.id}`}></canvas>
        <video {...props} >
          <source src={props.src} type="video/mp4"></source>
        </video>
      </section>
    </>
  );
}
