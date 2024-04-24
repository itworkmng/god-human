import ProForm, {
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormProps,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Divider, Popover, Tag } from "antd";
import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";
import { RiFilter3Fill } from "react-icons/ri";
import { FilterDeadline, FilterFormButton, FilterFormButtonTags } from "types";
import { calculateDeadlineDate } from "utils/index";

const buttons: FilterFormButton[] = [
  {
    value: FilterDeadline.FullHours,
    label: "24 цаг",
  },
  {
    value: FilterDeadline.Week,
    label: "7 өдөр",
  },
  {
    value: FilterDeadline.Month,
    label: "30 өдөр",
  },
  {
    value: FilterDeadline.ThreeMonth,
    label: "3 сар",
  },
  {
    value: FilterDeadline.SixMonth,
    label: "6 сар",
  },
  {
    value: FilterDeadline.Year,
    label: "1 жил",
  },
];

type Props = ProFormProps & {
  filters?: React.ReactNode;
  customHeadFilters?: React.ReactNode;
  showGroupButton?: boolean;
  hideFilter?: boolean;
  hideSearch?: boolean;
  hideDatePicker?: boolean;
  noFilter?: boolean;
  deadlineTotal?: FilterFormButtonTags[];
};
export const FilterForm = ({
  filters,
  showGroupButton = true,
  customHeadFilters,
  hideFilter = false,
  initialValues,
  hideSearch = false,
  hideDatePicker = false,
  noFilter,
  deadlineTotal,
  ...rest
}: Props) => {
  const form = useRef<ProFormInstance>();

  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});

    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };

  const content = (
    <ProForm
      {...rest}
      formRef={form}
      layout="inline"
      submitter={false}
      className="space-y-2 flex items-center justify-between flex-wrap"
    >
      <div className="flex items-center flex-wrap gap-2 md:gap-0">
        <div className="w-full flex items-center gap-4">
          <div className=" gap-2 custom-ant-radio-button ">
            <ProFormRadio.Group
              hidden={!showGroupButton}
              name={"deadline"}
              radioType="button"
              fieldProps={{
                size: "large",
                onChange: (e) => {
                  form.current?.setFieldValue(
                    "full_date",
                    calculateDeadlineDate(e.target.value)
                  );
                },
              }}
              options={buttons?.map((el) => ({
                ...el,
                label: (
                  <div className="flex gap-1 items-center">
                    <div>{el.label}</div>
                    {deadlineTotal && (
                      <Tag className="rounded-full">
                        {(deadlineTotal &&
                          deadlineTotal.find((e) => e.value == el.value)
                            ?.total) ||
                          0}
                      </Tag>
                    )}
                  </div>
                ),
              }))}
              initialValue={FilterDeadline.Month}
            />
          </div>
          <ProFormDateRangePicker
            className="text-gray-700 cursor-pointer"
            allowClear={false}
            name={"full_date"}
            fieldProps={{
              size: "large",
              className: "text-sm",
              suffixIcon: <FiCalendar className="text-gray-700 text-xl" />,
            }}
            initialValue={FilterDeadline.All}
          />
        </div>

        {customHeadFilters}
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <ProFormText
          name={"query"}
          placeholder={"Search"}
          hidden={hideSearch}
          fieldProps={{
            size: "large",
            className: "text-sm",
            prefix: <BiSearch color="#66708066" size={20} />, // Add the icon as a prefix here
          }}
        />
        {!noFilter && (
          <Popover
            trigger="click"
            content={
              <div style={{ width: 250 }} className="p-3">
                {filters}
                <Divider type="horizontal" />
                <div className="flex items-center justify-end">
                  <Button
                    type="text"
                    className="text-primary text-sm"
                    onClick={() => {
                      form.current?.resetFields();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            }
          >
            <Button
              size="large"
              className={`flex items-center  text-sm gap-2 font-semibold  relative ${
                hideFilter && "hidden"
              }`}
              icon={<RiFilter3Fill className="text-lg text-primary" />}
            >
              {checkIfChanged() && (
                <div className="absolute -top-1 -right-1 w-2 z-[10] h-2 bg-red-500 rounded-full"></div>
              )}
              Шүүх
            </Button>
          </Popover>
        )}
      </div>
    </ProForm>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>
      <div className="md:hidden block">
        <PopoverFilter children={content} />
      </div>
    </>
  );
};

export const PopoverFilter = ({ children }: { children: any }) => {
  return (
    <Popover
      trigger="click"
      content={<div className="p-3 w-80 min-[350]">{children}</div>}
    >
      <Button
        size="large"
        className={`flex items-center  gap-2 font-semibold text-sm `}
        icon={<RiFilter3Fill className="text-lg text-primary" />}
      >
        Filters
      </Button>
    </Popover>
  );
};
