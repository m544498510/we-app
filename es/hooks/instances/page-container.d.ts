/**
 * 骨架必须在路由切换前确定是显示还是隐藏
 * 页面容器在路由切换前显示，在卸载后隐藏
 */
import { HookDescRunnerParam, HookOpts, UsingHookOpts, TPageContainer, ContainerSelector } from '@saasfe/we-app-types';
export interface HookPageContainerOpts extends HookOpts {
    createPageContainer: (param: HookDescRunnerParam<HookPageContainerOpts>) => TPageContainer;
    skeletonContainer?: ContainerSelector;
    contentContainer?: ContainerSelector;
    specialSelectors?: {
        [scopeName: string]: string;
    };
}
declare const hookPageContainer: UsingHookOpts<HookPageContainerOpts>;
export default hookPageContainer;
