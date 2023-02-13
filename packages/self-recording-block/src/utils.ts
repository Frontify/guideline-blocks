/* eslint-disable @typescript-eslint/ban-ts-comment */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import p5Types from 'p5';

export function createDisplayCapture(constraints: DisplayMediaStreamOptions, p5: p5Types): p5Types.Element {
    // return if getUserMedia is not supported by browser
    if (!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
        throw new DOMException('getDisplayMedia not supported in this browser');
    }

    const domElement = document.createElement('video');
    // required to work in iOS 11 & up:
    domElement.setAttribute('playsinline', '');

    navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => {
        domElement.srcObject = stream;
    }, console.log);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoElement = addElement(domElement, p5 as any, true);
    // @ts-ignore
    videoElement.loadedmetadata = false;
    // set width and height onload metadata
    domElement.addEventListener('loadedmetadata', () => {
        domElement.play();
        if (domElement.width) {
            // @ts-ignore
            videoElement.width = domElement.width;
            // @ts-ignore
            videoElement.height = domElement.height;
        } else {
            // @ts-ignore
            videoElement.width = videoElement.elt.width = domElement.videoWidth;
            // @ts-ignore
            videoElement.height = videoElement.elt.height = domElement.videoHeight;
        }
        // @ts-ignore
        videoElement.loadedmetadata = true;
    });

    return videoElement as p5Types.Element;
}

function addElement<T extends HTMLElement>(
    element: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pInst: p5Types & { _userNode: any; _elements: any },
    media: boolean
) {
    const node = pInst._userNode ? pInst._userNode : document.body;
    node.appendChild(element);
    //@ts-ignore
    const c = media ? new p5Types.MediaElement(element, pInst) : new p5Types.Element(element, pInst);
    pInst._elements.push(c);
    return c;
}
