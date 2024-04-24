import { Col, Row } from "antd";
import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};
export const SectionContainer = ({ label, children }: Props) => {
  return (
    <Row>
      <Col span={24} md={10}>
        <div className="text-gray-500 text-sm font-medium">{label}</div>
      </Col>
      <Col span={24} md={14}>
        {children}
      </Col>
    </Row>
  );
};

type PropsSection = {
  label?: string;
  children: React.ReactNode;
};
export const SectionField = ({ label, children }: PropsSection) => {
  return (
    <div>
      {label && (
        <div className="mb-2">
          <label className=" text-gray-700 text-sm font-medium ">{label}</label>
        </div>
      )}
      {children}
    </div>
  );
};
