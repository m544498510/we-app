import App, { getActivePageScopes } from './app';
import Base from './base';
import { RouterType, HookScope } from '@saasfe/we-app-types';
export declare const registerApps: (cfgs: any, parser?: import("@saasfe/we-app-types").Parser | import("@saasfe/we-app-types").AppListParser) => Promise<App[]>;
export declare const usingHooks: (params: (string | import("@saasfe/we-app-types").UsingHookOpts<any>)[], scopes?: HookScope[]) => void;
export declare const configHooks: (params: (string | import("@saasfe/we-app-types").UsingHookOpts<any>)[], scopes?: HookScope[]) => void;
export declare const registerHookPages: () => Promise<void>;
export declare const startRootProduct: () => void;
export declare const getScope: (scopeName: string) => HookScope;
export declare const setConfig: (config: string | import("@saasfe/we-app-types").BaseConfig, value?: any) => void;
export declare const compoundScope: (base?: Base) => HookScope;
export declare const requireChildrenInited: () => Promise<any[]>;
export declare const setData: (pathname: string | symbol | object, data?: any) => void;
export declare const getData: (pathname: string, traced?: boolean) => any;
export declare const setResourceLoader: (resourceLoader: import("@saasfe/we-app-types").ResourceLoader<any>, scopes?: import("@saasfe/we-app-types").UsingScope[]) => void;
export declare const setPageContainer: (pageContainer: HTMLElement, scopes?: import("@saasfe/we-app-types").UsingScope[]) => void;
export declare const setRender: (render: import("@saasfe/we-app-types").Render, scopes?: import("@saasfe/we-app-types").UsingScope[]) => void;
export declare const setRouterType: (routerType: RouterType) => void;
export declare const setBasename: (basename: string) => void;
export declare const setSkeletonContainer: (container: HTMLElement) => void;
export { getActivePageScopes, };
