import { BaseType, PageConfig, PageInstance, AppInstance } from '@saasfe/we-app-types';
import Base from './base';
export default class Page extends Base implements PageInstance {
    type: BaseType.page;
    parent: AppInstance;
    private component;
    constructor(config: PageConfig);
    start(): void;
    getRender(): import("@saasfe/we-app-types").Render;
    getAppBasename(): string;
    getBasename(): string;
    makeActivityFunction(): any;
    setCustomProps(customProps: any): void;
    private load;
    private mount;
    private unmount;
}
