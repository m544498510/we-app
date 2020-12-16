import { HookOpts, UsingHookOpts } from '@saasfe/we-app-types';
export interface Hook403Opts extends HookOpts {
    excludePages?: string[];
    check403?: (pageAuthCode: string) => Promise<boolean | object>;
    [prop: string]: any;
}
declare const hook403: UsingHookOpts<Hook403Opts>;
export default hook403;
