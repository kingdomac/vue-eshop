import { useRoute } from "vue-router";

export default () => {
  const route = useRoute();
  const setPageTitle = (additionalTitle = null) => {
    let title = `${process.env.VUE_APP_TITLE}`;

    if (additionalTitle) {
      title += ` - ${additionalTitle}`;
    }

    document.title = title;
  };

  return { setPageTitle };
};
