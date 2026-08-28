/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from "@frontify/app-bridge";
import { convertToRteValue } from "@frontify/guideline-blocks-settings";
import type * as GuidelineBlocksSettings from "@frontify/guideline-blocks-settings";
import { render, screen } from "@testing-library/react";
import { type CSSProperties, type ReactNode } from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { CompareSliderBlock } from "./CompareSliderBlock";
import { Height } from "./types";

vi.mock("@frontify/guideline-blocks-shared", () => ({
    StyleProvider: ({ children }: { children: ReactNode }) => children,
    EditAltTextFlyout: () => null,
    ResponsiveImage: ({
        image,
        alt,
        className,
        style,
        testId,
    }: {
        image: { previewUrl?: string; genericUrl?: string };
        alt: string;
        className?: string;
        style?: CSSProperties;
        testId?: string;
    }) => (
        <img
            alt={alt}
            className={className}
            data-test-id={testId}
            src={image.previewUrl ?? image.genericUrl}
            style={style}
        />
    ),
    useImageContainer: () => ({
        containerWidth: 300,
        setContainerRef: vi.fn(),
    }),
}));

vi.mock("@frontify/guideline-blocks-settings", async (importOriginal) => ({
    ...(await importOriginal<typeof GuidelineBlocksSettings>()),
    RichTextEditor: ({ value }: { value?: string }) => (
        <div data-test-id="rte-content-html">{value}</div>
    ),
}));

const NativeImage = globalThis.Image;

beforeAll(() => {
    class LoadedImage {
        onload: (() => void) | null = null;

        set src(_value: string) {
            this.onload?.();
        }
    }

    globalThis.Image = LoadedImage as unknown as typeof Image;
});

afterAll(() => {
    globalThis.Image = NativeImage;
});

const CompareSliderBlockTestId = "compare-slider-block";
const CompareSliderTestId = "compare-slider-block-slider";
const BlockInjectButtonTestId = "block-inject-button";
const LabelWrapperTestId = "compare-slider-block-label-wrapper";
const StrikethroughWrapperTestId = "compare-slider-block-strikethrough-wrapper";
const FirstAssetTestId = "slider-item-first";
const SecondAssetTestId = "slider-item-second";
const RteContentHtmlTestId = "rte-content-html";

describe("CompareSliderBlock", () => {
    it("renders compare slider block", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {},
        );

        render(<CompareSliderBlockWithStubs />);

        expect(
            screen.getByTestId(CompareSliderBlockTestId),
        ).toBeInTheDocument();
    });

    it("renders two upload buttons if there are no assets uploaded yet", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                editorState: true,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getAllByTestId(BlockInjectButtonTestId)).toHaveLength(2);
    });

    it("renders one upload button if there is only one asset uploaded", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                editorState: true,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getAllByTestId(BlockInjectButtonTestId)).toHaveLength(1);
    });

    it("renders the compare slider if there are two assets uploaded", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                editorState: true,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getByTestId(CompareSliderTestId)).toBeInTheDocument();
    });

    it("renders label in view mode if content exists", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                blockSettings: {
                    firstAssetLabel: convertToRteValue(
                        undefined,
                        "first Asset Label",
                    ),
                },
                editorState: false,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getByTestId(RteContentHtmlTestId)).toHaveTextContent(
            "first Asset Label",
        );
    });

    it("renders two labels in view mode if content exists", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                blockSettings: {
                    firstAssetLabel: convertToRteValue(undefined, "Test"),
                    secondAssetLabel: convertToRteValue(undefined, "Test2"),
                },
                editorState: false,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        const labels = screen.getAllByTestId(RteContentHtmlTestId);

        expect(labels).toHaveLength(2);
        expect(labels[0]).toHaveTextContent("Test");
        expect(labels[1]).toHaveTextContent("Test2");
    });

    it("renders two labels in edit mode", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                editorState: true,
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getAllByTestId(LabelWrapperTestId)).toHaveLength(2);
    });

    it("renders a strikethrough line", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                blockSettings: {
                    firstAssetHasStrikethrough: true,
                },
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(
            screen.getByTestId(StrikethroughWrapperTestId),
        ).toBeInTheDocument();
    });

    it("renders the alt texts", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        {
                            ...AssetDummy.with(1),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                    secondAsset: [
                        {
                            ...AssetDummy.with(2),
                            previewUrl: "https://picsum.photos/200/200",
                        },
                    ],
                },
                blockSettings: {
                    firstAssetAlt: "First alt text",
                    secondAssetAlt: "Second alt text",
                },
            },
        );

        render(<CompareSliderBlockWithStubs />);

        const firstAsset = screen.getByTestId(FirstAssetTestId);
        const secondAsset = screen.getByTestId(SecondAssetTestId);

        expect(firstAsset).toBeInTheDocument();
        expect(firstAsset).toHaveAttribute("alt", "First alt text");

        expect(secondAsset).toBeInTheDocument();
        expect(secondAsset).toHaveAttribute("alt", "Second alt text");
    });

    it("uses the correct aspect ratio for the images if height is auto", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        { ...AssetDummy.with(1), height: 200, width: 100 },
                    ],
                    secondAsset: [
                        { ...AssetDummy.with(2), width: 100, height: 200 },
                    ],
                },
                blockSettings: {
                    height: Height.Auto,
                },
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(screen.getByTestId(CompareSliderBlockTestId)).toHaveStyle({
            aspectRatio: "0.5 / 1",
        });
    });

    it("does not use an aspect ratio for the images if height is set", () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(
            CompareSliderBlock,
            {
                blockAssets: {
                    firstAsset: [
                        { ...AssetDummy.with(1), height: 200, width: 100 },
                    ],
                    secondAsset: [
                        { ...AssetDummy.with(2), width: 100, height: 200 },
                    ],
                },
                blockSettings: {
                    height: "200px",
                },
            },
        );

        render(<CompareSliderBlockWithStubs />);

        expect(
            screen.getByTestId(CompareSliderBlockTestId).style.aspectRatio,
        ).toBe("");
    });
});
