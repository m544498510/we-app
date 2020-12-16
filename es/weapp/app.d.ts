import { PageConfig, HookScope, AppConfig, BaseType, PageInstance, AppInstance, ProductInstance, PageConstructor } from '@saasfe/we-app-types';
import Base from './base';
export default class App extends Base implements AppInstance {
    type: BaseType.app;
    parent: ProductInstance;
    constructor(config: AppConfig);
    registerPages(configs?: PageConfig[]): Promise<PageInstance[]>;
    registerPage(cfg: PageConfig): Promise<PageInstance>;
    filterPages(cfgs: PageConfig | PageConfig[]): PageConfig | PageConfig[];
    getPage(pageName: string): PageInstance;
    protected registerChild(config: PageConfig, Child: PageConstructor): Promise<import("@saasfe/we-app-types").BaseInstance>;
}
export declare function getActivePageScopes(location: Location, excludePageNames?: string[]): HookScope[];
