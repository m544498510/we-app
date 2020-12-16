import { HookScope, LifecycleHookEnum } from '@saasfe/we-app-types';
export declare function getEnabledHookNames(): any[];
export declare function runLifecycleHook(lifecycleHook: LifecycleHookEnum, activePageScopes: HookScope[], props?: any): Promise<boolean>;
