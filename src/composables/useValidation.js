export default () => {
  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const rules = password.length > 7; //has_minimum_lenth
    //&& /\d/.test(password) && // has_number
    // /[a-z]/.test(password) && // has_lowercase
    // /[A-Z]/.test(password) && // has_uppercase
    // /[!@#\$%\^\&*\)\(+=._-]/.test(password); // has_special

    if (!rules) {
      return false;
    }
    return true;
  };
  return { validateEmail, validatePassword };
};
