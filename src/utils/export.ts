import dayjs from "dayjs";
import * as FileSaver from "file-saver";
import _ from "lodash";
import * as XLSX from "xlsx";
import { WorkBook, utils, write } from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const formatAPIDate = (date?: any): string => {
  if (date) return dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ");
  return "";
};

export const exportAsExcelFile = (
  headers: { [x: string]: string },
  json: any[],
  excelFileName: string
): void => {
  const convertedJson = json.map((obj) => {
    const res: any = {};
    const keys = Object.keys(headers);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      res[headers[key]] = _.get(obj, key);
    }
    return res;
  });
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(convertedJson);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"],
  };
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
  FileSaver.saveAs(
    data,
    `${excelFileName} (${formatAPIDate(new Date())})${EXCEL_EXTENSION}`
  );
};

export const exportFromTable = async (
  filename: string[],
  tableWrapper?: HTMLElement,
  window?: Window
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (!tableWrapper) {
      resolve(false);
      return;
    }

    let table = tableWrapper.querySelector("table") as HTMLTableElement;
    let keys: string[] = [];
    let rowArray = Array.from(table?.rows || []);
    Array.from(rowArray[0]?.cells).forEach((cell) => {
      keys.push(cell.innerText);
    });

    let maindata: any[] = [];
    let i = 2;
    for (i; i < rowArray.length; i++) {
      let record: any = {};
      let row = rowArray[i];
      let cells = Array.from(row.cells);
      let j: number = 0;
      for (j; j < cells.length; j++) {
        let cell = cells[j];
        record[keys[j]] = cell.innerText;
      }
      maindata.push(record);
    }

    await exportXLSX(maindata, filename);
    resolve(true);
  });
};

type ExportType<T> = (
  dataSource?: T[],
  label?: string[],
  cols?: { idx: number; code: string }[]
) => Promise<void>;

const getName = (obj?: any) => {
  if ("name" in obj) {
    return obj["name"];
  }
  if ("first_name" in obj && "last_name" in obj) {
    return obj["first_name"] + " " + obj["last_name"];
  }
};

export const exportXLSX: ExportType<any> = (
  dataSource = [],
  label = ["party"],
  cols = []
) =>
  new Promise((resolve, reject) => {
    let realData = [];
    for (let obj of dataSource) {
      let one = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (value && typeof value === "string" && value.includes("₮")) {
          value = parseFloat(value.split("₮")[0].replace(/,/g, ""));
        }
        if (value && typeof value === "string" && value.includes("Preview")) {
          value = value.substring(8);
        }
        if (
          key.search("_path") !== -1 ||
          key.search("_id") !== -1 ||
          key.search("_uid") !== -1 ||
          key === "id"
        ) {
          return;
        }
        if (typeof value !== "object") {
          one = {
            ...one,
            [key]: value,
          };
        } else {
          if (value && typeof value === "object") {
            one = {
              ...one,
              [`${key}_name`]: getName(value),
            };
          }
        }
      });
      realData.push(one);
    }
    dataSource = realData;
    try {
      const source = [];
      source.push([
        label.join("-") +
          " | Exported Date: " +
          dayjs().format("YYYY-MM-DD HH:mm"),
      ]);
      const headers = Object.keys(dataSource[0]);
      source.push(headers);
      const datasourceRaw = dataSource.map((e) => Object.values(e));
      source.push(...datasourceRaw);
      const ws = utils.aoa_to_sheet(source);

      const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"],
      };
      if (typeof cols === "object" && cols.length > 0) {
        cols.length > 0 && addFormula(wb, dataSource, cols);
      }
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      FileSaver.saveAs(
        data,
        `${`${label[0]}-${dayjs().format("YYYY-MM-DD")}`}.xlsx`
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });

const addFormula = (
  wb: WorkBook,
  dataSource: any[],
  cols: { idx: number; code: string }[]
) => {
  const firstSheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[firstSheetName];
  cols.forEach((e) => {
    const cellRef = utils.encode_cell({ c: e.idx, r: dataSource.length + 1 });
    const cell = sheet[cellRef];
    if (!cell) {
      // add new cell
      utils.sheet_add_aoa(
        sheet,
        [[{ t: "n", f: `SUM(${e.code}2:${e.code}${dataSource.length + 1})` }]],
        {
          origin: cellRef,
        }
      );
    }
  });
};
