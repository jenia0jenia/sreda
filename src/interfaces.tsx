export interface IScreenText {
    id: string;
    title: string;
    desc: string;
    image?: string;
}

export interface ITransparentVideoOption {
    url: string
    width: number
    height: number
    frameRate: number
}

export interface IBubble {
    element: HTMLDivElement,
    placed: boolean,
    width: number,
    height: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    // color: string
}