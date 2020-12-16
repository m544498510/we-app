import { HookDescEntity, HookDesc, PageConfig } from '@saasfe/we-app-types';
export declare function hasHookName(hookName: string): boolean;
export declare function getRegisteredHooks(): string[];
export declare function getHookEntity(hookName: string): {
    hookDescEntity: HookDescEntity<any>;
    opts: any;
};
export declare function getPageConfigs(): PageConfig[];
export declare function registerHook(hookDesc: HookDesc<any>, opts?: any): {
    hookDescEntity: HookDescEntity<any>;
    opts: any;
};
export declare function registerHooks(hookDesc: HookDesc<any> | HookDesc<any>[] | [HookDesc<any>, any][], opts?: any): void;
