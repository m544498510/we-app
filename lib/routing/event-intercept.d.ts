import { HookScope } from '@saasfe/we-app-types';
export declare function callCapturedEventListeners(eventArguments: any): void;
export declare type RoutingWithHook = (location: Location, activePageScopes?: HookScope) => Promise<boolean>;
export declare const runRoutingWithHook: RoutingWithHook;
export declare function setRoutingWithHook(fn: RoutingWithHook): void;
