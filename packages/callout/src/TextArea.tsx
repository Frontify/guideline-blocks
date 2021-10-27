/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative, useBlockSettings, useEditorState } from "@frontify/app-bridge";
import { ChangeEvent, FC } from "react";
import { CalloutBlockSettings } from "./types";

type TextAreaProps = {
  className: string;
  appBridge: AppBridgeNative;
}

export const TextArea: FC<TextAreaProps> = ({className, appBridge}) => {
  const [blockSettings, setBlockSettings] = useBlockSettings<CalloutBlockSettings>(appBridge);
  const isEditing = useEditorState();
  const {textValue} = blockSettings;

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBlockSettings({textValue: e.target.value} as CalloutBlockSettings);
  }

  return (
    isEditing ?
      <textarea className={className} onChange={onTextAreaChange}>{textValue}</textarea>
      : <span>{textValue}</span>
  );
};
