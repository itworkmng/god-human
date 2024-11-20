import { Divider, Tag } from "antd";
import { SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { IClient } from "service/client/type";
import { ActionComponentProps } from "types";
const ClientDetail = ({
  onCancel,
  detail,
  open,
}: ActionComponentProps<IClient>) => {
  return (
    <IModalForm
      title={`Байгуулага - (${detail?.company_register})`}
      noButton
      closeButton
      open={open}
      modalProps={{ onCancel }}
    >
      <div className="space-y-5">
        <>
          <div className="font-bold text-sm">Байгууллагын мэдээлэл</div>
          <Divider />
          <SectionContainer
            label="Байгууллагын Нэр"
            children={detail?.company_name || "-"}
          />
          <SectionContainer
            label="Байгууллагын хаяг"
            children={detail?.province || "-"}
          />
          <div className="font-bold text-sm">Хувийн мэдээлэл</div>
          <Divider />
          <SectionContainer
            label="Овог нэр"
            children={
              detail?.last_name.charAt(0) + ". " + detail?.first_name || "-"
            }
          />
          <SectionContainer
            label="Албан тушаал"
            children={detail?.position || "-"}
          />
        </>
        <div className="font-bold text-sm">Холбоо барих мэдээлэл</div>
        <Divider />
        <SectionContainer
          label="Утасны дугаар"
          children={
            (
              <>
                <Tag color="pink">{detail?.phone_number}</Tag>
              </>
            ) || "-"
          }
        />
        <SectionContainer label="Имейл хаяг" children={detail?.email || "-"} />
      </div>
    </IModalForm>
  );
};

export default ClientDetail;
