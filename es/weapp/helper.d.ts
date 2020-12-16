import { ResourceFunction, AppConfig } from '@saasfe/we-app-types';
interface Route {
    pathname: string;
    absolute?: boolean;
    exact?: boolean;
    strict?: boolean;
}
interface Module {
    module: string;
    moduleReal: string;
    moduleName: string;
    route: string | string[] | true | Route | Route[];
    routeIgnore: Route[];
    getComponent: ResourceFunction;
    [prop: string]: any;
}
export interface MicroAppConfig extends AppConfig {
    microAppName?: string;
    modules?: Module[];
}
export declare function transformAppConfig(microAppConfig: MicroAppConfig, { resourceLoader }: {
    resourceLoader: any;
}): Promise<AppConfig>;
export {};
