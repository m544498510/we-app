/**
 * 骨架必须在路由切换前确定是显示还是隐藏
 * 页面容器在路由切换前显示，在卸载后隐藏
 */
import { HookOpts, UsingHookOpts } from '@saasfe/we-app-types';
export interface HookSkeletonOpts extends HookOpts {
    template: string;
    container: HTMLElement;
    contentSelector: string;
    [prop: string]: any;
}
declare const hookSkeleton: UsingHookOpts<HookSkeletonOpts>;
export default hookSkeleton;
