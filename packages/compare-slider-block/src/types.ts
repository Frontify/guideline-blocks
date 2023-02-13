export type BlockSettings = {
    alignment: Alignment;
    firstImage: string;
    height: number;
};

export enum Alignment {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}
