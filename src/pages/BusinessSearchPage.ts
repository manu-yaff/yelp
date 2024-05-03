import { ErrorComponent } from '../components/Error.js';
import { Loader } from '../components/Loader.js';
import { Fetch, State } from '../common/fetch.js';
import { getBusinessBySearch } from '../api/api.js';
import { BusinessEntity } from '../common/entities.js';
import { BusinessList } from '../components/BusinessList.js';
import { $ } from '../common/dom.js';
import { getRouter } from '../router.js';

export function BusinessSearchPage() {
  const componentContainer = $.createElement('section');
  const listContainer = $.createElement('div');
  const errorComponent = ErrorComponent();
  const loaderComponent = Loader();
  const router = getRouter();

  const { search_term: searchTerm, location } = router.getSearchParams();

  function handleStateChanges(
    _: State<Array<BusinessEntity>>,
    property: string | symbol,
    value: any,
    __: any
  ): boolean {
    const isLoading = property == 'loading' && value;
    const isError = property == 'error' && value;
    const isData = property == 'data' && value;

    if (isLoading) {
      listContainer.replaceChildren();
      listContainer.appendChild(loaderComponent.getContainer());
    }

    if (isError) {
      console.error(isError);
      listContainer.replaceChildren();
      listContainer.appendChild(errorComponent.getContainer());
    }

    if (isData) {
      const businessList = BusinessList({ items: value });
      listContainer.replaceChildren(businessList.getContainer());
    }

    return true;
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    Fetch<BusinessEntity[]>({
      callback: () => getBusinessBySearch(searchTerm, location),
      observer: handleStateChanges,
    });

    componentContainer.append(listContainer);
  }

  initComponent();

  return { getContainer };
}
