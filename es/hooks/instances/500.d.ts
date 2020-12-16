import { HookOpts, UsingHookOpts } from '@saasfe/we-app-types';
export interface Hook500Opts extends HookOpts {
    [prop: string]: any;
}
declare const hook500: UsingHookOpts<Hook500Opts>;
export default hook500;
