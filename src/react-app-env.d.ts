declare module "babel-plugin-relay/macro" {
    export { graphql as default } from "react-relay";
}

declare module "*.mp4" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const src: string;
    export default src;
}
