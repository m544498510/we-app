/**
 * 定义产品级别的共用的功能
 * 1. 基础dom结构，每个产品可单独定义
 * 2. 要加载的基础资源，每个产品、微应用可单独定义
 * 3. 页面渲染实现，每个产品、微应用可单独定义
 * 4. 生命周期钩子，每个产品可单独定义，各个钩子根据条件(当前激活的产品、微应用、页面)决定是否被调用
 *    hooks被启用的位置，决定了其判断条件
 */
import App from './app';
import Base from './base';
import { AppConfig, BaseType, ProductInstance, ProductConfig, Parser, AppListParser, AppConfigParser, AppInstance } from '@saasfe/we-app-types';
export default class Product extends Base implements ProductInstance {
    type: BaseType.product | BaseType.root;
    parent: ProductInstance;
    constructor(config: ProductConfig);
    registerApps(cfgs: string | AppConfig[] | any, parser?: Parser | AppListParser): Promise<App[]>;
    getApp(appName: string): AppInstance;
    registerApp(config: AppConfig, parser?: AppConfigParser): Promise<AppInstance>;
    private parseAppConfigs;
    private parseAppConfig;
}
