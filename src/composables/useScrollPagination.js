import { ref, reactive } from "vue";
export default () => {
  // const bottomOfPage = ref(null);

  const initialScrollPagination = {
    currentPage: 0,
    maxPerPage: 10,
    numberOfPages: 1,
    showLoader: false,
  };

  const scrollPaginationState = reactive({
    ...initialScrollPagination,
  });

  const scrollTriger = async (getData, bottomOfPage) => {
    //console.log("osbserver start");
    const observer = new IntersectionObserver(async (entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting) {
        if (
          scrollPaginationState.numberOfPages >
          scrollPaginationState.currentPage
        ) {
          try {
            scrollPaginationState.showLoader = true;
            scrollPaginationState.currentPage += 1;
            await getData();
          } catch (error) {
          } finally {
            scrollPaginationState.showLoader = false;
          }
        } else {
          //console.log("osbserver disconnect");
          observer.disconnect();
        }
      }
    });
    return observer.observe(bottomOfPage.value);
  };

  const scrollTop = (element) => element.scrollIntoView();

  return {
    initialScrollPagination,
    scrollPaginationState,
    scrollTriger,
    scrollTop,
  };
};
