import { ResourceLoader, Render, UsingScope, TPageContainer } from '@saasfe/we-app-types';
export declare function setPageContainer(value: TPageContainer, scopes: UsingScope[]): void;
export declare function setResourceLoader(value: ResourceLoader<any>, scopes: UsingScope[]): void;
export declare function setRender(value: Render, scopes: UsingScope[]): void;
export declare function setSandbox(value: Render, scopes: UsingScope[]): void;
export declare function getGlobalConfig(pathname: string, scopeName: string): any;
