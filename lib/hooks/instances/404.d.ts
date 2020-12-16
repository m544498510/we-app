/**
 * 404的判断方式：
 * 1. singleSpa里有页面，但是没有匹配到
 * 2. 匹配到的页面全部被排除了
 */
import { HookOpts, UsingHookOpts } from '@saasfe/we-app-types';
export interface Hook404Opts extends HookOpts {
    excludePages?: string[];
}
declare const hook404: UsingHookOpts<Hook404Opts>;
export default hook404;
