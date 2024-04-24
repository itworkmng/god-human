import { PageLoading } from "@ant-design/pro-layout";
import React from "react";

type Props = {
  condition: boolean;
  whenTrue?: any;
  whenFalse?: any;
};
export const IfCondition = ({ condition, whenTrue, whenFalse }: Props) => {
  if (condition) return <>{whenTrue}</>;
  if (!condition && !!whenFalse) return <>{whenFalse}</>;
  return <></>;
};
type PropsPageLoad = {
  condition: boolean;
  children?: React.ReactNode;
};
export const IfPageLoad = ({ condition, children }: PropsPageLoad) => {
  return condition ? <PageLoading /> : { children };
};
