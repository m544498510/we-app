import { HookOpts, UsingHookOpts } from '@saasfe/we-app-types';
export interface HookLoadingOpts extends HookOpts {
    element: any;
}
declare const hookLoading: UsingHookOpts<HookLoadingOpts>;
export default hookLoading;
