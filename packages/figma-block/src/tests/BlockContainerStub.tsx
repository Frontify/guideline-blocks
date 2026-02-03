/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { ImageContainer, ImageElement, ImageStage, VectorContainerOperator } from '../components';

export const BlockContainerStub = ({ height, padding = 0 }: { height: string; padding?: number }) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isImageLoaded && stageRef.current && containerRef.current && imageRef.current) {
            const imageElement = new ImageElement(imageRef.current);
            const imageContainer = new ImageContainer(containerRef.current);
            const imageStage = new ImageStage(stageRef.current, height);
            imageStage.alterHeight(height);

            const bitmapContainerOperator = new VectorContainerOperator(
                imageContainer,
                imageStage,
                imageElement,
                false
            );
            bitmapContainerOperator.setPadding(padding).fitAndCenterTheImageContainerWithinTheImageStage();
        }
    }, [height, isImageLoaded, padding]);

    return (
        <div id="image-stage" ref={stageRef} style={{ overflow: 'hidden', position: 'relative', height }}>
            <div id="image-container" ref={containerRef} style={{ position: 'absolute' }}>
                <img
                    id="image-element"
                    ref={imageRef}
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmlld0JveD0iMCAtMjU2IDE4MDAgMTgwMCIKICAgaWQ9InN2ZzMwMzciCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC4zLjEgcjk4ODYiCiAgIHdpZHRoPSIxMDAlIgogICBoZWlnaHQ9IjEwMCUiCiAgIHNvZGlwb2RpOmRvY25hbWU9InJhbmRvbV9mb250X2F3ZXNvbWUuc3ZnIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzMDQ3Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzA0NSIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjY0MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI0ODAiCiAgICAgaWQ9Im5hbWVkdmlldzMwNDMiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjIzLjgzOTYiCiAgICAgaW5rc2NhcGU6Y3g9IjE3OTUuMDc0NiIKICAgICBpbmtzY2FwZTpjeT0iMTM2MC42MzU4IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyNSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzMwMzciIC8+CiAgPGcKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwtMSw3LjU5MzIyMDMsMTMzOC45ODMxKSIKICAgICBpZD0iZzMwMzkiPgogICAgPHBhdGgKICAgICAgIGQ9Im0gNjY2LDEwNTUgcSAtNjAsLTkyIC0xMzcsLTI3MyAtMjIsNDUgLTM3LDcyLjUgLTE1LDI3LjUgLTQwLjUsNjMuNSAtMjUuNSwzNiAtNTEsNTYuNSAtMjUuNSwyMC41IC02MywzNSBRIDMwMCwxMDI0IDI1NiwxMDI0IEggMzIgcSAtMTQsMCAtMjMsOSAtOSw5IC05LDIzIHYgMTkyIHEgMCwxNCA5LDIzIDksOSAyMyw5IGggMjI0IHEgMjUwLDAgNDEwLC0yMjUgeiBNIDE3OTIsMjU2IHEgMCwtMTQgLTksLTIzIEwgMTQ2MywtODcgcSAtOSwtOSAtMjMsLTkgLTEzLDAgLTIyLjUsOS41IC05LjUsOS41IC05LjUsMjIuNSB2IDE5MiBxIC0zMiwwIC04NSwtMC41IC01MywtMC41IC04MSwtMSAtMjgsLTAuNSAtNzMsMSAtNDUsMS41IC03MSw1IC0yNiwzLjUgLTY0LDEwLjUgLTM4LDcgLTYzLDE4LjUgLTI1LDExLjUgLTU4LDI4LjUgLTMzLDE3IC01OSw0MCAtMjYsMjMgLTU1LDUzLjUgLTI5LDMwLjUgLTU2LDY5LjUgNTksOTMgMTM2LDI3MyAyMiwtNDUgMzcsLTcyLjUgMTUsLTI3LjUgNDAuNSwtNjMuNSAyNS41LC0zNiA1MSwtNTYuNSAyNS41LC0yMC41IDYzLC0zNSBRIDExMDgsMzg0IDExNTIsMzg0IGggMjU2IHYgMTkyIHEgMCwxNCA5LDIzIDksOSAyMyw5IDEyLDAgMjQsLTEwIGwgMzE5LC0zMTkgcSA5LC05IDksLTIzIHogbSAwLDg5NiBxIDAsLTE0IC05LC0yMyBMIDE0NjMsODA5IHEgLTksLTkgLTIzLC05IC0xMywwIC0yMi41LDkuNSAtOS41LDkuNSAtOS41LDIyLjUgdiAxOTIgaCAtMjU2IHEgLTQ4LDAgLTg3LC0xNSAtMzksLTE1IC02OSwtNDUgUSA5NjYsOTM0IDk0NSw5MDIuNSA5MjQsODcxIDkwMCw4MjUgODY4LDc2MyA4MjIsNjU0IDc5Myw1ODggNzcyLjUsNTQzIDc1Miw0OTggNzE4LjUsNDM4IDY4NSwzNzggNjU0LjUsMzM4IDYyNCwyOTggNTgwLjUsMjU1IDUzNywyMTIgNDkwLjUsMTg2LjUgNDQ0LDE2MSAzODQsMTQ0LjUgMzI0LDEyOCAyNTYsMTI4IEggMzIgcSAtMTQsMCAtMjMsOSAtOSw5IC05LDIzIHYgMTkyIHEgMCwxNCA5LDIzIDksOSAyMyw5IGggMjI0IHEgNDgsMCA4NywxNSAzOSwxNSA2OSw0NSAzMCwzMCA1MSw2MS41IDIxLDMxLjUgNDUsNzcuNSAzMiw2MiA3OCwxNzEgMjksNjYgNDkuNSwxMTEgMjAuNSw0NSA1NCwxMDUgMzMuNSw2MCA2NCwxMDAgMzAuNSw0MCA3NCw4MyA0My41LDQzIDkwLDY4LjUgNDYuNSwyNS41IDEwNi41LDQyIDYwLDE2LjUgMTI4LDE2LjUgaCAyNTYgdiAxOTIgcSAwLDE0IDksMjMgOSw5IDIzLDkgMTIsMCAyNCwtMTAgbCAzMTksLTMxOSBxIDksLTkgOSwtMjMgeiIKICAgICAgIGlkPSJwYXRoMzA0MSIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzdHlsZT0iZmlsbDpjdXJyZW50Q29sb3IiIC8+CiAgPC9nPgo8L3N2Zz4K"
                    width="100%"
                    height="100%"
                    style={{ position: 'relative' }}
                    onLoad={() => setIsImageLoaded(true)}
                    alt=""
                />
            </div>
        </div>
    );
};
