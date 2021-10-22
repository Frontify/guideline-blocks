import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    backgroundColor: string;
    borderColor: string;
    showBorder: boolean;
};

export default function DosDontsBlock({ appBridge }: Props): ReactElement {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    console.log(blockSettings);

    return (
        <div>
            <span className="tw-text-violet-60 tw-underline">Dos and donts!</span>
        </div>
    );
}
