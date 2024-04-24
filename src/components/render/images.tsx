import file from "service/file";
import { Image } from "antd";

type Props = {
  values?: string[];
  imageHeight?: number;
  imageWidth?: number;
};
export const ImageList = ({ values, imageHeight = 50, imageWidth }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {values?.map((el, index) => {
        return (
          <Image
            key={"image-" + index}
            src={el ? file.fileToUrl(el) : "/background/login.png"}
            className="rounded"
            height={imageHeight}
            width={imageWidth ?? "auto"}
          />
        );
      })}
    </div>
  );
};
