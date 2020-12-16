import './routing/event-intercept';
import { registerApps, usingHooks, configHooks, setHomepage, setResourceLoader, setPageContainer, setRender, setRouterType, setBasename, setSkeletonContainer } from './weapp';
import { setContext } from './context';
import { DefaultResourceLoader } from '@saasfe/we-app-resource-loader';
import { RouterType } from '@saasfe/we-app-types';
export declare function start(): Promise<any>;
export { setResourceLoader, setPageContainer, setRender, setSkeletonContainer, DefaultResourceLoader, usingHooks, configHooks, registerApps, setHomepage, setContext, RouterType, setRouterType, setBasename, };
export { RenderCustomProps, Route, RouteObj, RouteMatch, RouteMatchParams, Locate, GetGotoHrefParams, HookScope, SafeHookScope, ResourceLoader, ResourceLoaderDesc, Resource, ResourceFunction, ResourceWithType, ResourceType, } from '@saasfe/we-app-types';
export { DefaultResourceLoaderOpts } from '@saasfe/we-app-resource-loader';
export { isFunction, navigate, getRouteSwitchConfig, getGotoHref, DEFAULTRouteMatch, AppLocation, parseLocate } from '@saasfe/we-app-utils';
