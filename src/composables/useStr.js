import moment from "moment";
export default () => {
  const formatPrice = (price) => {
    return Number.parseFloat(price).toFixed(2);
  };

  const formatWithSalePrice = (price, salePrice) => {
    if (!salePrice) {
      return `<span>${formatPrice(price)}</span>`;
    }

    return `<span style='text-decoration: line-through'>${formatPrice(
      price
    )}</span><span>${salePrice}</span>`;
  };

  const getPrice = (price, salePrice) => {
    if (salePrice) {
      return salePrice;
    } else {
      return price;
    }
  };

  const slugify = (str) => {
    return str
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const strip = (str, nb_words, end = "...") => {
    return str.split(" ").splice(0, nb_words).join(" ") + end;
  };

  const countWords = (str) => {
    return str.trim().split(" ").length;
  };

  const formatDate = (date, format = "LLLL") => {
    const dateStr = String(date);
    let fullDateSplit = dateStr.split("T");
    let datePieces = String(fullDateSplit[0]).split("-");
    let timePieces = String(fullDateSplit[1]).split(":");

    let year = datePieces[0];
    let month = parseInt(datePieces[1]) - 1;
    let day = parseInt(datePieces[2]);

    let hrs = parseInt(timePieces[0]);
    let minutes = parseInt(timePieces[1]);
    let seconds = parseInt(timePieces[2]);

    // return moment(new Date(year, month, day, hrs, minutes, seconds)).format(
    //   format
    // );
    return moment(date).format(format);
  };

  return {
    formatPrice,
    formatWithSalePrice,
    slugify,
    strip,
    countWords,
    getPrice,
    formatDate,
  };
};
