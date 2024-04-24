import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from "@ant-design/pro-table";
import { RemoveModal } from "components/modal";
import React, { useRef, useState } from "react";
import { ActionComponentProps, RemoveModelConfig } from "types";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  EditButton,
  IBadge,
  InActiveButton,
  StopPagination,
} from "..";

type Props<T> = ProTableProps<T, any, any> & {
  CreateComponent?: React.FC<ActionComponentProps<T>>;
  DetailComponent?: React.FC<ActionComponentProps<T>>;
  UpdateComponent?: React.FC<ActionComponentProps<T>>;
  RemoveComponent?: React.FC<ActionComponentProps<T>>;
  columns?: ProColumns<T, any>[];
  hideAction?: boolean;
  total?: number;
  hideCreateButton?: boolean;
  refresh?: (value?: any) => void;
  toolbarItems?: React.ReactNode;
  details?: T[];
  customActions?: (value: T) => React.ReactNode;
  RemoveModelConfig?: RemoveModelConfig<T>;
  DeActivateModelConfig?: RemoveModelConfig<T>;
  onPaginationChange?: (current: number, pageSize: number) => void;
  hideEditButton?: (record: any) => boolean;
  hideInActiveButton?: (record: any) => boolean;
  showDetailButton?: boolean;
  lockButton?: boolean;
  customHeaderTitle?: React.ReactNode;
  noShadow?: boolean;
  selectedId?: number;
  current?: number;
  pageSize?: number;
};
export const ITable = <T extends {}>({
  CreateComponent,
  UpdateComponent,
  DetailComponent,
  RemoveComponent,
  columns,
  hideAction = false,
  total,
  hideCreateButton = false,
  toolbarItems,
  refresh,
  details,
  customActions,
  RemoveModelConfig,
  DeActivateModelConfig,
  onPaginationChange,
  hideEditButton,
  hideInActiveButton,
  showDetailButton = false,
  lockButton = false,
  customHeaderTitle,
  noShadow = false,
  selectedId,
  current,
  pageSize,
  ...rest
}: Props<T>) => {
  const [pageData, setPageData] = useState<{
    current: number;
    pageSize: number;
  }>({
    current: 1,
    pageSize: pageSize ?? 20,
  });
  const actionRef = useRef<ActionType>();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();
  const [deactivate, setDeactivate] = useState<T>();

  return (
    <>
      <ProTable
        id="main-table"
        onRow={(record) => {
          return {
            onClick: () => {
              if (DetailComponent) {
                setDetail(record);
              }
            },
            className: DetailComponent && "cursor-pointer",
          };
        }}
        {...rest}
        toolBarRender={() => [
          <div className="flex items-center gap-2 flex-wrap">
            {toolbarItems}
            <CreateButton
              size="large"
              className={`${hideCreateButton && "hidden"}`}
              onClick={() => setCreate(true)}
            />
          </div>,
        ]}
        cardProps={{
          className: "px-0 rounded-xl",
          bordered: true,
          bodyStyle: {
            paddingInline: 0,
          },
        }}
        headerTitle={
          customHeaderTitle ? (
            customHeaderTitle
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 text-lg font-medium">Нийт</span>
                <IBadge showZero count={total ?? 0} />
              </div>
              {rest.headerTitle}
            </>
          )
        }
        toolbar={{
          className: "px-6",
        }}
        actionRef={actionRef}
        options={{
          reload: () => {
            refresh?.();
          },
          setting: false,
          density: false,
        }}
        rowKey={`id`}
        scroll={{ x: "auto" }}
        className={noShadow ? "rounded-xl" : ` shadow-sm  rounded-xl`}
        size="small"
        search={false}
        pagination={{
          className: "px-6 font-semibold text-gray-500",
          pageSize: pageData.pageSize,
          pageSizeOptions: [20, 50, 100, 200, 500],
          showSizeChanger: true,
          onChange: (current, size) => {
            setPageData({ current, pageSize: size });
            refresh &&
              refresh({
                current: current ? current - 1 : current,
                pageSize: size,
              });
          },
          showTotal: (total, range) => {
            return (
              <div className="font-semibold text-gray-500">
                {range[0]}-{range[1]} of {total} items
              </div>
            );
          },
          total,
          showLessItems: true,
          // onShowSizeChange: (current, size) => {
          //   setPageData({ current, pageSize: size });
          //   refresh &&
          //     refresh({
          //       current: current ? current - 1 : current,
          //       pageSize: size,
          //     });
          // },

          responsive: true,
        }}
        columns={[
          {
            title: "№",
            align: "center",
            width: 60,
            fixed: "left",
            dataIndex: "index",
            valueType: "index",
            className: "text-gray-600",
            render: (_value, _record, index) =>
              (pageData.current || 1) * (pageData.pageSize || 1) +
              (index + 1) -
              (pageData.pageSize || 1),
          },
          ...(columns as any),
          {
            hideInTable: hideAction,
            title: "",
            fixed: "right",
            dataIndex: "action",
            align: "right",

            render: (_, record) => {
              return (
                <StopPagination>
                  <div className="gap-2 flex  items-center">
                    {customActions && customActions(record)}
                    {showDetailButton && (
                      <DetailButton
                        onClick={() => {
                          setDetail(record);
                        }}
                      />
                    )}
                    {UpdateComponent && (
                      <EditButton
                        style={{
                          opacity: hideEditButton?.(record) ? 0.5 : 1,
                          cursor: hideEditButton?.(record)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() => {
                          hideEditButton?.(record) ? null : setUpdate(record);
                        }}
                      />
                    )}

                    {(RemoveModelConfig || RemoveComponent) && (
                      <DeleteButton
                        onClick={() => {
                          setRemove(record);
                        }}
                      />
                    )}

                    {DeActivateModelConfig && (
                      <InActiveButton
                        style={{
                          opacity: hideEditButton?.(record) ? 0.5 : 1,
                          cursor: hideEditButton?.(record)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() => {
                          hideEditButton?.(record)
                            ? null
                            : setDeactivate(record);
                        }}
                      />
                    )}
                  </div>
                </StopPagination>
              );
            },
          },
        ]}
      />
      {CreateComponent && (
        <CreateComponent
          open={create}
          onCancel={() => setCreate(false)}
          onFinish={() => {
            setCreate(false);
            refresh &&
              refresh({
                ...pageData,
                current: pageData.current ? pageData.current - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {UpdateComponent && (
        <UpdateComponent
          open={!!update}
          onCancel={() => setUpdate(undefined)}
          detail={update}
          onFinish={() => {
            setUpdate(undefined);
            refresh &&
              refresh({
                ...pageData,
                current: pageData.current ? pageData.current - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {DetailComponent && (
        <DetailComponent
          open={!!detail}
          detail={detail}
          onCancel={() => setDetail(undefined)}
          details={details}
        />
      )}
      {RemoveComponent && (
        <RemoveComponent
          open={!!remove}
          onCancel={() => setRemove(undefined)}
          detail={remove}
          onFinish={() => {
            setRemove(undefined);
            refresh &&
              refresh({
                ...pageData,
                current: pageData.current ? pageData.current - 1 : 0,
              });
          }}
          details={details}
        />
      )}
      {RemoveModelConfig && (
        <RemoveModal
          {...RemoveModelConfig.config(remove as any)}
          open={!!remove}
          onDone={() => {
            refresh &&
              refresh({
                ...pageData,
                current: pageData.current ? pageData.current - 1 : 0,
              });
            setRemove(undefined);
          }}
          onCancel={() => setRemove(undefined)}
          onRequest={RemoveModelConfig.action}
          remove={true}
        />
      )}
      {DeActivateModelConfig && (
        <RemoveModal
          {...DeActivateModelConfig.config(deactivate as any)}
          open={!!deactivate}
          onDone={() => {
            refresh &&
              refresh({
                ...pageData,
                current: pageData.current ? pageData.current - 1 : 0,
              });
            setDeactivate(undefined);
          }}
          onRequest={DeActivateModelConfig.action}
          onCancel={() => setDeactivate(undefined)}
          remove={false}
        />
      )}
    </>
  );
};
