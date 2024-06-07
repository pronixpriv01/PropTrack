import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* eslint-disable no-prototype-builtins */
import qs from "query-string";
import { z } from "zod";
import { notificationsCategoryStyles } from "@/constants";

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mo.')
    month: "short", // abbreviated month name (e.g., 'Okt.')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mo.')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // numeric month (e.g., '10')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Okt.')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "de-DE",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatTimeAgo(date: Date): string {
  const now: Date = new Date();
  const diff: number = now.getTime() - date.getTime();

  const seconds: number = Math.floor(diff / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'vor weniger als einer Minute';
  } else if (minutes <60) {
    return `vor ${minutes} Minute${minutes === 1 ? '' : 'n'}`;
  } else if (hours < 24) {
    return `vor ${hours} Stunde${hours === 1 ? '' : 'n'}`;
  } else {
    return `vor ${days} Tag${days === 1 ? '' : 'en'}`;
  }
}

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountRoleStyles(role: AccountRoles): AccountRoleStyles {
  switch (role) {
    case "Manager Developer":
      return {
        bg: "bg-blue-100",
        lightBg: "bg-blue-200",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "Marketing":
      return {
        bg: "bg-green-100",
        lightBg: "bg-green-200",
        title: "text-green-900",
        subText: "text-green-700",
      };

    case "Developer":
      return {
        bg: "bg-purple-100",
        lightBg: "bg-purple-200",
        title: "text-purple-900",
        subText: "text-purple-700",
      };

    case "DevOps":
      return {
        bg: "bg-red-100",
        lightBg: "bg-red-200",
        title: "text-red-900",
        subText: "text-red-700",
      };

    case "Mobile Dev":
      return {
        bg: "bg-yellow-100",
        lightBg: "bg-yellow-200",
        title: "text-yellow-900",
        subText: "text-yellow-700",
      };

    case "CEO":
      return {
        bg: "bg-orange-100",
        lightBg: "bg-orange-200",
        title: "text-orange-900",
        subText: "text-orange-700",
      };

    case "TestUser":
      return {
        bg: "bg-gray-100",
        lightBg: "bg-gray-200",
        title: "text-gray-900",
        subText: "text-gray-700",
      };

    default:
      return {
        bg: "bg-gray-100",
        lightBg: "bg-gray-200",
        title: "text-gray-900",
        subText: "text-gray-700",
      };
  }
}

export function getEventCategoryStyles(category: string) {
  switch (category) {
    case "Interview":
      return "bg-blue-500"; // Hier wird nur die linke Border gefärbt
    case "Meeting":
      return "bg-red-500"; // Hier wird nur die linke Border gefärbt
    case "Discussion":
      return "bg-green-500"; // Hier wird nur die linke Border gefärbt
    default:
      return "bg-gray-500"; // Fallback für andere Kategorien
  }
}

export function getNotificationStyle(category: string, type: NotificationType): any {
  switch (type) {
    case "AccountRole":
      return getAccountRoleStyles(category as AccountRoles);

    case "Reminder":
      return notificationsCategoryStyles["Reminder"];

    case "Notification":
      return notificationsCategoryStyles["Update"];

    default:
      return notificationsCategoryStyles["default"];
  }
}

// export function countTransactionCategories(
//   transactions: Transaction[]
// ): CategoryCount[] {
//   const categoryCounts: { [category: string]: number } = {};
//   let totalCount = 0;

//   // Iterate over each transaction
//   transactions &&
//     transactions.forEach((transaction) => {
//       // Extract the category from the transaction
//       const category = transaction.category;

//       // If the category exists in the categoryCounts object, increment its count
//       if (categoryCounts.hasOwnProperty(category)) {
//         categoryCounts[category]++;
//       } else {
//         // Otherwise, initialize the count to 1
//         categoryCounts[category] = 1;
//       }

//       // Increment total count
//       totalCount++;
//     });

//   // Convert the categoryCounts object to an array of objects
//   const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
//     (category) => ({
//       name: category,
//       count: categoryCounts[category],
//       totalCount,
//     })
//   );

//   // Sort the aggregatedCategories array by count in descending order
//   aggregatedCategories.sort((a, b) => b.count - a.count);

//   return aggregatedCategories;
// }

// export function extractCustomerIdFromUrl(url: string) {
//   // Split the URL string by '/'
//   const parts = url.split("/");

//   // Extract the last part, which represents the customer ID
//   const customerId = parts[parts.length - 1];

//   return customerId;
// }

// export function encryptId(id: string) {
//   return btoa(id);
// }

// export function decryptId(id: string) {
//   return atob(id);
// }

// export const getTransactionStatus = (date: Date) => {
//   const today = new Date();
//   const twoDaysAgo = new Date(today);
//   twoDaysAgo.setDate(today.getDate() - 2);

//   return date > twoDaysAgo ? "Processing" : "Success";
// };
