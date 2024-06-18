import { MaterialCommunityIcons } from "@expo/vector-icons";
export const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 2500);
};

export const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const renderDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
};

const getOrdinalSuffix = (number) => {
  if (number === 1 || number === 21 || number === 31) return "st";
  if (number === 2 || number === 22) return "nd";
  if (number === 3 || number === 23) return "rd";
  return "th";
};

export const getIcon = (type, value) => {
  switch (type) {
    case "expense":
      switch (value) {
        case "utils":
          return (
            <MaterialCommunityIcons
              name="home-variant"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "electronics":
          return (
            <MaterialCommunityIcons name="laptop" size={28} color="rgba(27, 27, 51, 1)" />
          );
        case "dine":
          return (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "breakfast":
          return (
            <MaterialCommunityIcons
              name="food-croissant"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "grocery":
          return (
            <MaterialCommunityIcons name="cart" size={28} color="rgba(27, 27, 51, 1)" />
          );
        default:
          return null;
      }
    case "income":
      switch (value) {
        case "bonus":
          return (
            <MaterialCommunityIcons
              name="cash-plus"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "parttime":
          return (
            <MaterialCommunityIcons
              name="briefcase-clock"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "freelance":
          return (
            <MaterialCommunityIcons
              name="account-cash"
              size={28}
              color="rgba(27, 27, 51, 1)"
            />
          );
        case "sales":
          return (
            <MaterialCommunityIcons name="shopping" size={28} color="rgba(27, 27, 51, 1)" />
          );
        default:
          return null;
      }
    default:
      return null;
  }
};


export const filterTransactionsByTimeFrame = (transactions, timeFrame) => {
  const currentDate = new Date();
  let startTime;

  switch (timeFrame) {
    case "day":
      startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      break;
    case "week":
      startTime = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      break;
    case "year":
      startTime = new Date(currentDate.getFullYear(), 0, 1);
      break;
    default:
      startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
  }

  return transactions.filter(
    (transaction) => new Date(transaction.date) >= startTime
  );
};