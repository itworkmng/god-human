import { WEEK_DAY_ARRAY } from "config";
import { MerchantService } from "service/merchantService/type";
import { formatTimeToDate, isStringValid } from ".";

// Import Section
export const isServiceDataValid = (data?: MerchantService) => {
  if (!data?.location) return false;
  if (!data?.price_range) return false;
  if ((data.hours?.length || 0) <= 0) return false;
  if (!isStringValid(data.phone)) return false;

  return true;
};

export const formatServiceHours = (data?: string[]) => {
  let formattedValues = data?.map((el) => {
    let splitted = el?.split("~") ?? [];
    if (splitted.length <= 0) return undefined;
    let week =
      splitted?.[0]?.split("-")?.map((el) => el?.trim().toLowerCase()) ?? []; // Week
    let hours =
      splitted?.[1]?.split("-")?.map((el) => el?.trim().toLowerCase()) ?? []; // Hours
    if (week.length <= 0) return undefined;
    if (hours.length <= 0) return undefined;
    if (week[0] === "everyday") week = WEEK_DAY_ARRAY.map((el) => el.value);
    return {
      week_days: week.map((el) => el.trim().toLowerCase()),
      opening: formatTimeToDate(hours[0].trim() + ":00"),
      closing: formatTimeToDate(hours[1].trim() + ":00"),
    };
  });
  return formattedValues;
};

export const validateHours = (data?: string[]) => {
  if ((data?.length || 0) === 0) {
    return false;
  }

  if (
    !data?.some((el) => {
      let temp = el.split("~");
      let weeks =
        temp?.[0]?.split("-")?.map((el) => el?.trim()?.toLocaleLowerCase()) ??
        []; // Week
      let hours =
        temp?.[1]?.split("-")?.map((el) => el?.trim()?.toLocaleLowerCase()) ??
        []; // Hours
      let fromHour =
        hours?.[0]?.split(":")?.map((el) => el?.trim()?.toLocaleLowerCase()) ??
        [];
      let toHour =
        hours?.[1]?.split(":")?.map((el) => el?.trim()?.toLocaleLowerCase()) ??
        [];

      if (
        weeks.length <= 0 ||
        (temp?.length || 0) <= 0 ||
        (hours?.length || 0) <= 0 ||
        fromHour?.length <= 0 ||
        fromHour.length != 2 ||
        toHour?.length <= 0 ||
        toHour.length != 2
      ) {
        return false;
      }
      if (
        weeks.length === 1 &&
        !WEEK_DAY_ARRAY.find((el) => el.label === weeks[0]) &&
        weeks[0] !== "everyday"
      )
        return false;
      return true;
    })
  ) {
    return false;
  }
  return true;
};
