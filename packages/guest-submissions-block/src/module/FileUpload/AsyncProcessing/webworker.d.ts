/* (c) Copyright Frontify Ltd., all rights reserved. */

interface FileReaderSync {
    readAsArrayBuffer(blob: Blob): ArrayBuffer;

    readAsBinaryString(blob: Blob): void;

    readAsDataURL(blob: Blob): string;

    readAsText(blob: Blob, encoding?: string): string;
}

declare const FileReaderSync: {
    prototype: FileReaderSync;
    new (): FileReaderSync;
};
