/**
 * 加载基础库，每个scope只需要加载一次，在scope变化时需要移除
 * 基础库在路由切换前加载和移除
 *
 * JS沙箱是级联式沙箱，当前沙箱没有对象则会向上级查找，需阻止修改对象的值(用proxy拦截)
 * 写入则只能写在当前JS沙箱里
 */
import { HookOpts, UsingHookOpts, Resource } from '@saasfe/we-app-types';
export interface HookBasicLibsOpts extends HookOpts {
    url: Resource[];
    useSystem?: boolean;
    afterLoad?: () => Promise<any>;
    [prop: string]: any;
}
declare const hookBasicLibs: UsingHookOpts<HookBasicLibsOpts>;
export default hookBasicLibs;
