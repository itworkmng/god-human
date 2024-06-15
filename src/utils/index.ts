import { uploadFile } from "@uploadcare/upload-client";
import { DEGREES } from "config";
import dayjs, { QUnitType } from "dayjs";
import { HTMLAttributes } from "react";
import auth from "service/auth";
import file from "service/file";
import { jwtDecode } from "jwt-decode";
import { FilterDeadline } from "types";
import { E_BLANK, ITOKEN } from "./typdef";
import { RegistrationLetters } from "./constants";
import { Payment } from "service/order/type";
const publicKey = import.meta.env.VITE_UPLOAD_CARE_PUBLIC_CARE;

export const calculateTableRowSpan = (
  index: number,
  record: any,
  list: any[],
  dest_field: string
): { rowSpan: number } => {
  let obj = {
    rowSpan: 1,
  };
  if (list.length === 0) return obj;

  // If index equal to zero  , then need to calculate total task which dest field is the same.
  if (index == 0 && list)
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );

  // If current dest field is equal to previous dest field
  // then rowSpan should be zero in order to merge the column
  if (index != 0 && list && list[index - 1][dest_field] == record[dest_field])
    obj.rowSpan = 0;

  // If index isn't zero and current dest field is different from the previous dest field ,
  // then calculate the new total task number
  if (index != 0 && list && list[index - 1][dest_field] != record[dest_field])
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );
  return obj;
};
export const tableCellFixed: (width: number) => {
  width: number;
  onCell: () => HTMLAttributes<HTMLElement>;
} = (width) => ({
  width,
  onCell: () => ({ style: { maxWidth: width, minWidth: width } }),
});

export const firstLastNames = (lastName?: string, firstName?: string) => {
  if (!firstName || !lastName) return "";

  let sliced_name =
    (firstName || "").charAt(0).toUpperCase() + (firstName || "").slice(1);
  return `${lastName?.substring(0, 1).toUpperCase()}. ${sliced_name}`;
};

export interface ISorter {
  //method to list all the keys of the object
  toList: () => SortOption[];
}

export interface SortOption {
  selector: string;
  direction: "asc" | "desc";
}

export interface DataLoadRequest {
  pageNumber?: number;
  pageSize?: number;
  orders?: Array<SortOption>;
}
export const tablePagination: (
  params: Partial<{
    pageSize?: number;
    current?: number;
    [x: string]: any;
  }>,
  sort: any
) => { limit: number; page: number; sorter: any; [x: string]: any } = (
  { pageSize, current, ...rest },
  sort
) => {
  return {
    limit: pageSize || 20,
    page: (current || 1) - 1,
    sorter: sort,
    ...rest,
  };
};

export const isStringValid = (value?: string) => {
  if (!value) return false;
  if (!value.trim()) return false;
  if (value.length <= 0) return false;
  return true;
};

export const isDateValid = (date?: Date) => {
  if (!date) return false;
  if (dayjs(date).year() <= 1) return false;
  return true;
};

export const moneyFormat: (
  money?: number | null,
  currency?: string
) => string = (money, currency) => {
  if (!money) return "0";
  let format = new Intl.NumberFormat().format(money);
  if (currency) return `${format} ${currency === "mnt" ? "₮" : "$"}`;
  return format;
};

export const generateUniqueID = () => new Date().getTime().toString();

export const convertFileToUploadFile = (path?: string): any[] | undefined =>
  path
    ? [
        {
          uid: path,
          status: "done",
          response: "",
          url: file.fileToUrl(path),
          name: path,
          isBefore: true,
        },
      ]
    : undefined;

export const getImageSeperate = (
  files?: any[]
): { unChangedImages?: any[]; changedImages?: any[] } => {
  let unChangedImages = files
    ?.filter((el: any) => el.isBefore)
    .map((el) => el.uid);
  let changedImages = files?.filter((el: any) => !el.isBefore);
  return { unChangedImages, changedImages };
};

export const formatTimeToDate = (str: string) => {
  let value = str.split(":");
  if (!value || value?.length !== 3) return undefined;
  return dayjs()
    .set("hour", parseInt(value[0].trim()))
    .set("minute", parseInt(value[1].trim()))
    .set("second", parseInt(value[2].trim()));
};

export const calculateDeadlineDate = (deadline: FilterDeadline) => {
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [dayjs().add(-1, "day"), dayjs()];
    case FilterDeadline.Week:
      return [dayjs().add(-1, "week"), dayjs()];
    case FilterDeadline.Month:
      return [dayjs().add(-30, "day"), dayjs()];
    case FilterDeadline.ThreeMonth:
      return [dayjs().add(-2, "month"), dayjs()];
    case FilterDeadline.SixMonth:
      return [dayjs().add(-5, "month"), dayjs()];
    case FilterDeadline.Year:
      return [dayjs().add(-1, "year"), dayjs()];
    case FilterDeadline.OneMonth:
      return [dayjs().add(-1, "month"), dayjs()];

    default:
      return undefined;
  }
};

export const calculatePreviousDeadline = (
  deadline?: FilterDeadline,
  dates?: dayjs.Dayjs[]
) => {
  if (!dates || dates.length <= 0 || (deadline && deadline < 0))
    return undefined;

  let date = dates[0].add(-1, "day");
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [date.add(-1, "day"), date];
    case FilterDeadline.Week:
      return [date.add(-1, "week"), date];

    case FilterDeadline.Month:
      return [date.add(-30, "day"), date];

    case FilterDeadline.ThreeMonth:
      return [date.add(-2, "month"), date];

    case FilterDeadline.SixMonth:
      return [date.add(-5, "month"), date];

    case FilterDeadline.Year:
      return [date.add(-1, "year"), date];

    case FilterDeadline.OneMonth:
      return [date.add(-1, "month"), date];

    default:
      return [date.add(-6, "month"), date];
  }
};

export const diffDates = (start?: Date, end?: Date, field?: QUnitType) => {
  return dayjs(start).diff(end, field);
};

export const capitalizate = (value?: string) =>
  value ? value?.charAt(0).toUpperCase() + value?.slice(1, value?.length) : "";

export const fillDollar = (value?: number) =>
  value ? new Array(value).fill("$").join("") : "";

export const validateEmail = (value?: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value || "")
    ? true
    : false;

export const isValidDate = (value?: Date) =>
  value ? new Date(value).getFullYear() > 1 : false;

export const renderEnDate = (value?: Date | string, withTime?: boolean) => {
  if (!value) return "";
  if (dayjs(value).year() <= 1) return "";
  if (withTime) return dayjs(value).format("MMM DD, YYYY HH:mm");
  return dayjs(value).format("MMM DD, YYYY");
};

export const getDeadlineType = (type: FilterDeadline) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return "hour";
    case FilterDeadline.Week:
      return "day";
    case FilterDeadline.Month:
      return "day";
    case FilterDeadline.ThreeMonth:
      return "month";
    case FilterDeadline.SixMonth:
      return "month";
    case FilterDeadline.Year:
      return "month";
    case FilterDeadline.OneMonth:
      return "day";
    default:
      return "";
  }
};

export const getDateByDeadline = (type?: FilterDeadline, date?: string) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return dayjs(date).format("HH:00");
    case FilterDeadline.Week:
      return dayjs(date).format("ddd");
    case FilterDeadline.Month:
      return dayjs(date).format("D");
    case FilterDeadline.ThreeMonth:
      return dayjs(date).format("MMM");
    case FilterDeadline.SixMonth:
      return dayjs(date).format("MMM");
    case FilterDeadline.Year:
      return dayjs(date).format("MMM");
    case FilterDeadline.OneMonth:
      return dayjs(date).format("D");
    default:
      return "";
  }
};

export const getTitleByDeadline = (
  type?: FilterDeadline,
  current?: boolean
) => {
  switch (type) {
    case FilterDeadline.FullHours:
      return current ? "Today" : "Yesterday";
    case FilterDeadline.Week:
      return current ? "This week" : "Last week";
    case FilterDeadline.Month:
      return current ? "This month" : "Last month";
    case FilterDeadline.ThreeMonth:
      return current ? "This 3 months" : "Last 3 months";
    case FilterDeadline.SixMonth:
      return current ? "This 6 months" : "Last 6 months";
    case FilterDeadline.Year:
      return current ? "This year" : "Last year";
    case FilterDeadline.OneMonth:
      return current ? "This month" : "Last month";
    default:
      return "";
  }
};

export const formatNumber = (value?: number) => {
  if (!value) return 0;
  if (value < 1000) return value.toFixed(1);
  if (value > 1000 && value < 1000000) {
    return (value / 1000).toFixed(1) + "K";
  }
  if (value > 1000000 && value < 1000000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value > 1000000000 && value < 1000000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  }
  return value.toFixed(1);
};

export const getDatePeriodType = (gapDays?: number) => {
  if (!gapDays) return "";
  if (gapDays <= 1) return "hour";
  if (gapDays <= 7) return "day";
  if (gapDays <= 31) return "day";
  return "month";
};

export const getDeadlineByRangeDate = (fullDate?: string[]) => {
  if (!fullDate || fullDate?.length <= 0) return "";
  let gapDays = diffDates(
    dayjs(fullDate[1]).toDate(),
    dayjs(fullDate[0]).toDate(),
    "days"
  );

  if (gapDays <= 1) return FilterDeadline.FullHours;
  if (gapDays <= 7) return FilterDeadline.Week;
  if (gapDays <= 31) return FilterDeadline.Month;
  if (gapDays <= 90) return FilterDeadline.ThreeMonth;
  if (gapDays <= 6 * 30) return FilterDeadline.SixMonth;
  return FilterDeadline.Year;
};

export const generateHours = (): string[] => {
  const hours: string[] = [];
  const format = "HH:mm";

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = dayjs()
        .set("hour", hour)
        .set("minute", minute)
        .format(format);
      hours.push(time);
    }
  }

  return hours;
};

export const extractAtristName = (
  firstName?: string,
  lastName?: string,
  degrees?: string[]
) => {
  let final = "";
  if (lastName) final += lastName[0] + ".";
  if (firstName) final += firstName;
  if (degrees)
    final +=
      " (" +
      degrees
        ?.map((degree) => DEGREES.find((e) => e.value === degree)?.label)
        .join(",") +
      ")";
  return final;
};

export const statusCheck = (value: E_BLANK) => {
  const findStatus =
    value == E_BLANK.Request
      ? { color: "orange", status: "Хүсэлт" }
      : value == E_BLANK.Printed
      ? { color: "blue", status: "Хэвлэгдсэн" }
      : { color: "green", status: "Хүлээн авсан" };
  return findStatus;
};
export const payStatusCheck = (value: Payment[], total_price: number) => {
  let paid = 0;
  for (let index = 0; index < value.length; index++) {
    const element = value[index];
    paid += element.price;
  }
  const calculate = total_price - paid;
  return calculate <= 0 ? 0 : calculate;
};
export const payTotal = (value: Payment[]) => {
  let price = 0;
  value.forEach((el) => {
    price += el.price;
  });
  return price;
};
export const tokenDecode = () => {
  const token = typeof window !== "undefined" ? auth.getToken() : false;
  if (token) {
    const decode: ITOKEN = jwtDecode(token);
    if (decode && decode) {
      const data: ITOKEN = {
        role: decode.role || "",
        email: decode.email || "",
        id: decode.id || 0,
      };
      return data;
    }
  }
  return undefined;
};

export const registrationNumberValidation = (value: string) => {
  var splittedValue = value.split("");
  value = value.toUpperCase();
  if (
    !RegistrationLetters.includes(splittedValue[0]) ||
    !RegistrationLetters.includes(splittedValue[1])
  ) {
    return "Эхний 2 тэмдэгтийг оруулна уу";
  }

  if (value.length != 10) return "Регистрийн урт 10 тэмдэгт байна";
  if (
    value.replace(/\D/g, "").length != 8 ||
    parseInt(value.replace(/\D/g, "")).toString().length < 7
  )
    return "Регистрерт 8 тоо агуулсан байна";

  return null;
};
export const uploadHandler = async (file: any) => {
  // logic
  if (file) {
    const result = await uploadFile(file, {
      publicKey,
      store: "auto",
      metadata: {
        subsystem: "js-client",
        pet: "cat",
      },
    });
    return result;
  }
  return;
};
export const imageUrlResize = (id: string, width: number, height: number) => {
  return "https://ucarecdn.com/" + id + `/-/resize/${width}x${height}/`;
};

export const imageUrl = (id: string) => {
  return "https://ucarecdn.com/" + id + "/";
};

export const imageUrlCrop = (id: string, width: number, height: number) => {
  return "https://ucarecdn.com/" + id + `/-/crop/${width}x${height}/`;
};
