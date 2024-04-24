import { CloseOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Typography, notification } from "antd";
import { useRef } from "react";
import { ERROR_MESSAGE, IERROR } from "utils/typdef";

type Props = ModalFormProps & {
  onRequest?: (body?: any) => Promise<any>;
  onSuccess?: () => void;
  children?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  noButton?: boolean;
  closeButton?: boolean;
};

export const IModalForm = ({
  onRequest,
  onSuccess: onDone,
  title,
  footer,
  noButton,
  closeButton,
  ...rest
}: Props) => {
  const submit = useRequest(async (values) => onRequest && onRequest(values), {
    manual: true,
    onSuccess: () => {
      onDone && onDone();
      notification.success({
        message: "Амжилттай",
      });
    },
    onError: (err: any | IERROR) => {
      notification.error({
        message:
          ERROR_MESSAGE.find((v) => v.value === err.error.name)?.label ||
          err.error.message,
      });
    },
  });

  return (
    <ModalForm
      {...rest}
      onFinishFailed={(err) => {
        notification.info({ message: "Please, fill the require fields." });
      }}
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      children={<div className="px-7">{rest.children}</div>}
      title={
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-base text-gray-800 font-semibold">{title}</div>
          <Button
            onClick={() =>
              rest.modalProps?.onCancel && rest.modalProps.onCancel(null as any)
            }
            icon={<CloseOutlined className="text-gray-500" size={12} />}
          />
        </div>
      }
      layout="horizontal"
      className="md:p-7 pt-4 "
      labelCol={{
        span: 12,
      }}
      labelAlign="left"
      colProps={{
        span: 12,
      }}
      modalProps={{
        ...rest.modalProps,
        closable: false,
        className: `${rest.className} custom-ant-modal-footer-remove `,
      }}
      submitter={{
        render: ({ submit: onSubmit }) => {
          return (
            ((rest.submitter || rest.submitter === undefined) && !noButton && (
              <div className="flex items-center justify-between w-full px-10 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300 py-5">
                <div className="w-full flex">{footer}</div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() =>
                      rest.modalProps?.onCancel &&
                      rest.modalProps?.onCancel(null as any)
                    }>
                    Цуцлах
                  </Button>
                  <Button
                    type="primary"
                    onClick={onSubmit}
                    loading={submit.loading}>
                    Илгээх
                  </Button>
                </div>
              </div>
            )) ||
            (closeButton && (
              <div className="flex items-center justify-end w-full px-10 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300 py-5">
                <div className="w-full flex">{footer}</div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() =>
                      rest.modalProps?.onCancel &&
                      rest.modalProps?.onCancel(null as any)
                    }>
                    Хаах
                  </Button>
                </div>
              </div>
            ))
          );
        },
      }}
      onFinish={async (values) => {
        if (await submit.runAsync(values)) {
          return true;
        }
        return false;
      }}
    />
  );
};
type PropsRemove = ModalFormProps & {
  onRequest?: (id: number, body: any) => Promise<any>;
  onDone?: () => void;
  display: React.ReactNode;
  uniqueKey?: number;
  onCancel: () => void;
  body?: any;
  title?: string;
  remove?: boolean;
  cancelTitle?: string;
  customTitle?: string;
};
export const RemoveModal = ({
  onCancel,
  open,
  onRequest,
  onDone,
  display,
  uniqueKey,
  title,
  body,
  remove,
  cancelTitle,
  customTitle,
  ...rest
}: PropsRemove) => {
  const formRef = useRef<ProFormInstance>();
  const submit = useRequest(
    async () => onRequest && onRequest(uniqueKey ?? 0, body),
    {
      manual: true,
      onSuccess: () => {
        onDone && onDone();
        notification.success({
          message: "Амжилттай",
        });
      },
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );
  return (
    <ModalForm
      {...rest}
      modalProps={{
        onCancel,
        className: "max-w-lg custom-ant-modal-footer-remove ",
      }}
      className="p-5"
      width={400}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={open}
      submitter={{
        render: ({ submit }) => {
          return (
            <div className="flex  justify-between  w-full px-6  pb-6 gap-4">
              <Button
                size="large"
                className="w-1/2 text-sm"
                onClick={() => onCancel && onCancel()}>
                Cancel
              </Button>
              <Button
                size="large"
                className="w-1/2  bg-error-600 text-sm"
                type="primary"
                onClick={submit}>
                {remove ? "Remove" : "Deactivate"}
              </Button>
            </div>
          );
        },
      }}
      onFinish={async () => {
        if (await submit.runAsync()) {
          return true;
        }
        return false;
      }}>
      <img src="/icons/delete.png" width={48} height={48} className="mb-4" />
      <div className=" text-lg font-semibold text-gray-900  mb-2">
        {display}
      </div>
      <Typography.Text className="text-gray-500">
        You are going to {title ? title.toLowerCase() : "Remove"} {display}.
      </Typography.Text>
    </ModalForm>
  );
};
