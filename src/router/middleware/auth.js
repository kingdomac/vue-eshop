export default (to, from, next) => {
  if (!sessionStorage.getItem("token")) {
    return next({ name: "login" });
  }

  return next();
};
