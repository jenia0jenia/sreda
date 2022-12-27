import { useEffect } from "react";
import AlphaClass from "../../classes/wix-alpha/index.js";
import "./style.scss"

export default function AlphaVideo(props: any) {
  useEffect(() => {

    const WixAlpha = new AlphaClass(`#target-${props.id}`, `#${props.id}`);
  }, []);

  return (
    <>
      <section className={`video-place is-disabled${props.sound ? " sound" : ""}`}>
        <canvas id={`target-${props.id}`}></canvas>
        <video {...props}>
          <source src={props.src} type="video/mp4"></source>
        </video>
      </section>
    </>
  );
}
