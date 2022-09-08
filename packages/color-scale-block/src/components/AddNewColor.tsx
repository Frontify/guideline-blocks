/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';
import { AddNewColorModalProps, ColorProps } from '../types';
import { Flyout, ColorPicker, ColorFormat, Color } from '@frontify/fondue';
import { uuid } from "uuidv4";

export const AddNewColor: FC<AddNewColorModalProps> = ({
    newIndex,
    colorPickerRef,
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    setFormat,
}) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);

    return (

    <>
            <div ref={colorPickerRef}>
                <Flyout
                    isOpen={isColorPickerOpen}
                    onCancel={() => {
                        setIsColorPickerOpen(false);
                        setEditedColor(null);
                    }}
                    onOpenChange={() => {}}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        currentColor={editedColor ? editedColor.color : {
                                blue: 255,
                                green: 102,
                                red: 85
                        }}
                        currentFormat={colorPickerFormat}
                        setFormat={(format) => {
                            console.log(format);
                            setColorPickerFormat(format)
                        }}
                        onSelect={(color: Color) => {
                            console.log(color);
                            if (!editedColor) {
                                const newUuid = uuid();
                                updateColor({id: newUuid, color: color, index: newIndex} , newIndex);
                                setEditedColor({id: newUuid, color: color, index: newIndex});
                            } else {
                                updateColor({id: editedColor.id, color: color}, editedColor.index);
                                setEditedColor({id:  editedColor.id, color: color, index: editedColor.index, width: editedColor.width});

                            }
                        }}
                        palettes={[
                            {
                              colors: [
                                {
                                  alpha: 1,
                                  blue: 54,
                                  green: 33,
                                  name: '90',
                                  red: 153
                                },
                                {
                                  alpha: 1,
                                  blue: 58,
                                  green: 36,
                                  name: '80',
                                  red: 166
                                },
                                {
                                  alpha: 1,
                                  blue: 67,
                                  green: 41,
                                  name: '70',
                                  red: 191
                                },
                                {
                                  alpha: 1,
                                  blue: 90,
                                  green: 64,
                                  name: '60',
                                  red: 214
                                },
                                {
                                  alpha: 1,
                                  blue: 134,
                                  green: 114,
                                  name: '50',
                                  red: 225
                                },
                                {
                                  alpha: 1,
                                  blue: 188,
                                  green: 177,
                                  name: '40',
                                  red: 238
                                }
                              ],
                              id: 'red',
                              source: '#992136',
                              title: 'Red'
                            },
                            {
                              colors: [
                                {
                                  alpha: 1,
                                  blue: 82,
                                  green: 100,
                                  name: '90',
                                  red: 0
                                },
                                {
                                  alpha: 1,
                                  blue: 95,
                                  green: 115,
                                  name: '80',
                                  red: 0
                                },
                                {
                                  alpha: 1,
                                  blue: 120,
                                  green: 146,
                                  name: '70',
                                  red: 0
                                },
                                {
                                  alpha: 1,
                                  blue: 157,
                                  green: 192,
                                  name: '60',
                                  red: 0
                                },
                                {
                                  alpha: 1,
                                  blue: 207,
                                  green: 253,
                                  name: '50',
                                  red: 0
                                },
                                {
                                  alpha: 1,
                                  blue: 223,
                                  green: 255,
                                  name: '40',
                                  red: 74
                                }
                              ],
                              id: 'green',
                              source: '#006452',
                              title: 'Green'
                            },
                            {
                              colors: [
                                {
                                  alpha: 1,
                                  blue: 0,
                                  green: 144,
                                  name: '90',
                                  red: 204
                                },
                                {
                                  alpha: 1,
                                  blue: 0,
                                  green: 155,
                                  name: '80',
                                  red: 219
                                },
                                {
                                  alpha: 1,
                                  blue: 0,
                                  green: 176,
                                  name: '70',
                                  red: 250
                                },
                                {
                                  alpha: 1,
                                  blue: 41,
                                  green: 192,
                                  name: '60',
                                  red: 255
                                },
                                {
                                  alpha: 1,
                                  blue: 102,
                                  green: 210,
                                  name: '50',
                                  red: 255
                                },
                                {
                                  alpha: 1,
                                  blue: 178,
                                  green: 232,
                                  name: '40',
                                  red: 255
                                }
                              ],
                              id: 'yellow',
                              source: '#cc9000',
                              title: 'Yellow'
                            }
                          ]}
                    />
                </Flyout>
            </div>
    </>
    )
};
