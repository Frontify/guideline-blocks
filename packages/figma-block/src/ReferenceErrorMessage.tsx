/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Heading, Text } from '@frontify/fondue/components';
import { IconExclamationMarkTriangle } from '@frontify/fondue/icons';

interface ReferenceErrorMessageProps {
    originalUrl: string;
}

const ReferenceErrorMessage = ({ originalUrl }: ReferenceErrorMessageProps) => {
    return (
        <div className="tw-w-full tw-py-8 tw-px-11 tw-relative tw-rounded tw-border tw-border-line">
            <div className="tw-flex tw-justify-between" data-test-id="custom-block-error-boundary-header">
                <div className="tw-flex tw-flex-col tw-gap-4 tw-items-start">
                    <div className="tw-text-text-negative tw-gap-2 tw-flex tw-items-center">
                        <IconExclamationMarkTriangle size={24} />
                        <Heading size="large" weight="strong" color="negative" as="p">
                            Reference view unavailable
                        </Heading>
                    </div>
                    <Text>
                        We&apos;re sorry for the inconvenience, and our team is working on it. For now, please use the
                        parent block.
                    </Text>

                    <a href={originalUrl}>
                        <Button emphasis="default">Go to parent block</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ReferenceErrorMessage;
