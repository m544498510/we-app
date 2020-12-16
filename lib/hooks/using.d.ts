import { UsingHooksConfigs, UsingHookOpts, UsingScope } from '@saasfe/we-app-types';
export declare function getHooksScopes(): UsingScope[];
export declare function getScopeHookNames(scopeName: string): string[];
export declare function getScopeHooks(scopeName: string): {
    hookName: string;
    opts: any;
    hookDescEntity: import("@saasfe/we-app-types").HookDescEntity<any>;
}[];
export declare function usingHooks(hookConfigs: UsingHooksConfigs, scopes: UsingScope[]): void;
export declare function configHooks(hookConfigs: (UsingHookOpts<any> | string)[], scopes: UsingScope[]): void;
