import { BsChevronRight } from "react-icons/bs";
import { RiHome6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeLine } from "untitledui-js-base";

export type Props = {
  title?: String;
  subTitle?: String;
};
export const PageHeader = ({ title, subTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pahtName = location.pathname
    .split("/")
    .filter((el: any) => el.length > 0)
    ?.slice(1, 2);
  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <HomeLine
          size={"20"}
          stroke="#667085"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/home")}
        />

        <div className="text-lg text-gray-300">/</div>

        <div className="flex items-center gap-2 ">
          {pahtName.map((el: any, index: number) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <p className="font-medium text-sm text-gray-700 capitalize">
                  {el}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
