import { Rule } from "antd/lib/form";
import { Gender, Position, Week } from "types";
export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "The field is required";

export const FORM_ITEM_RULE: (value?: any) => Rule[] = (value?: any) => [
  { message: FieldRequireMessage, required: true, ...value },
];

export const BUCKET_NAMES = {
  photos: "photos",
  banners: "banners",
  logo: "logo",
  productBanner: "productbanner",
  productPhotos: "productphotos",
  notifications: "notifications",
  avatars: "avatars",
  menus: "menus",
};
// Service

// Others
export const PRICE_RANGE_ARRAY = Object.freeze([
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
  },
]);

export const WEEK_DAY_ARRAY = Object.freeze([
  {
    value: Week.Monday,
    label: "Mon",
  },
  {
    value: Week.Tuesday,
    label: "Tue",
  },
  {
    value: Week.Wednesday,
    label: "Wed",
  },
  {
    value: Week.Thursday,
    label: "Thu",
  },
  {
    value: Week.Friday,
    label: "Fri",
  },
  {
    value: Week.Saturday,
    label: "Sat",
  },
  {
    value: Week.Sunday,
    label: "Sun",
  },
]);
export const COMMISSION_ARRAY = Object.freeze(
  new Array(101)
    .fill(1)
    .map((_, index) => ({ label: index + " %", value: index }))
);

export const BANK_ARRAY = Object.freeze([
  {
    value: "tdb",
    label: "Trade and Development bank",
  },
  {
    value: "khaan",
    label: "Хаан банк",
  },
  {
    value: "golomt",
    label: "Голомт Банк",
  },
  {
    value: "khas",
    label: "Хас банк",
  },
  {
    value: "state",
    label: "Төрийн банк",
  },
  {
    value: "capitron",
    label: "Капитрон банк",
  },
]);

export const CURRENCY_ARRAY = Object.freeze([
  {
    label: "MNT",
    value: "mnt",
    symbol: "₮",
  },
  {
    label: "USD",
    value: "usd",
    symbol: "$",
  },
]);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const LANGUAGES = Object.freeze([
  {
    label: "Mongolia",
    value: "mn",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "Korea",
    value: "kr",
  },
  {
    label: "China",
    value: "cn",
  },
  {
    label: "Russia",
    value: "ru",
  },
]);

// ----------------------------------------------------------------------
export const POSITIONS = [
  {
    label: "Жүжигчин",
    value: Position.Actor,
  },
  {
    label: "Зохиолч",
    value: Position.Writer,
  },
  {
    label: "Ерөнхий найруулагч",
    value: Position.Director,
  },
];

export const GENDERS = [
  {
    label: "Эрэгтэй",
    value: Gender.Male,
    key: Gender.Male,
  },
  {
    label: "Эмэгтэй",
    value: Gender.Female,
    key: Gender.Female,
  },
];

export const DEGREES = [
  {
    label: "СТА",
    value: "sta",
  },
  {
    label: "ТС",
    value: "ts",
  },
  {
    label: "МУГЖ",
    value: "mugj",
  },
];
// 1. Сонгодог жүжиг
// 2. Үндэсний түүхэн жүжиг
// 3. Орчин үеийн
// 4. Бэсрэг жүжиг
// 5. Хүүхдийн жүжиг
export const DRAMA_TYPES = [
  {
    label: "Сонгодог жүжиг",
    value: "classic_drama",
  },
  {
    label: "Үндэсний түүхэн жүжиг",
    value: "national_history_drama",
  },
  {
    label: "Орчин үеийн",
    value: "modern_drama",
  },
  {
    label: "Бэсрэг жүжиг",
    value: "comedy",
  },
  {
    label: "Хүүхдийн жүжиг",
    value: "children_drama",
  },
];

export const BLANK_STATUS = {
  active: {
    label: "Идэвхтэй",
    value: true,
    color: "green",
  },
  inactive: {
    label: "Идэвхгүй",
    value: false,
    color: "gray",
  },
};
