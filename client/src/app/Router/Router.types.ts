export enum Routes {
    Swords = 'SWORDS',
    Shields = 'SHIELDS',
};

export enum Tabs {
    SwordsTab = 'SWORDS_TAB',
    ShieldsTab = 'SHIELDS_TAB',
};

type StackParamsBase = Record<string, object | undefined>;

export interface SwordStackParams extends StackParamsBase {
    [Routes.Swords]: undefined;
};

export interface ShieldStackParams extends StackParamsBase {
    [Routes.Shields]: undefined;
};

export interface BottomTabParams extends StackParamsBase {
    [Tabs.SwordsTab]: undefined;
    [Tabs.ShieldsTab]: undefined;
};