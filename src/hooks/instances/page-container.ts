/**
 * 骨架必须在路由切换前确定是显示还是隐藏
 * 页面容器在路由切换前显示，在卸载后隐藏
 */
import { HookDesc, HookDescRunnerParam, HookOpts } from '../type';

export interface HookSkeletonOpts extends HookOpts {
  createPageContainer: (param: HookDescRunnerParam<HookSkeletonOpts>) => Element;
  [prop: string]: any;
}

function DefaultCreatePageContainer(param: HookDescRunnerParam<HookSkeletonOpts>) {
  if (!param.pageScope.page) {
    return;
  }

  const { product, weApp, page } = param.hookScope;
  const base = page || weApp || product;
  const elSkeleton: Element = base.getData('skeletonContainer', true);
  if (elSkeleton) {
    const { productName = '', weAppName = '', pageName = '' } = param.pageScope;

    const pageContainerId = [productName, weAppName, pageName].filter(n => n).join('__');
    let elPageContainer = elSkeleton.querySelector(`#${pageContainerId}`);

    if (!elPageContainer) {
      const elContent = base.getData('contentContainer', true);
      if (elContent) {
        elPageContainer = document.createElement('div');
        elPageContainer.id = pageContainerId;
        elContent.appendChild(elPageContainer);
      }
    }

    return elPageContainer;
  }
}

const hookPageContainer: HookDesc<HookSkeletonOpts> = {
  hookName: 'pageContainer',

  async beforeLoad(param: HookDescRunnerParam<HookSkeletonOpts>) {
    // 生成页面容器，容器存储到scope中
    const { opts: { createPageContainer = DefaultCreatePageContainer }, pageScope } = param;

    const elPageContainer = createPageContainer(param);
    if (elPageContainer) {
      pageScope.page?.setPageContainer(elPageContainer);
    }
  },

  async beforeMount(param: HookDescRunnerParam<HookSkeletonOpts>) {
    const { page } = param.pageScope;

    const elPageContainer = page?.getPageContainer();
    if (elPageContainer) {
      (elPageContainer as HTMLElement).style.display = '';
    }
  },

  async afterUnmount(param: HookDescRunnerParam<HookSkeletonOpts>) {
    // 隐藏页面容器
    const { page } = param.pageScope;

    const elPageContainer = page?.getPageContainer();
    if (elPageContainer) {
      (elPageContainer as HTMLElement).style.display = 'none';
    }
  },
};

export default hookPageContainer;