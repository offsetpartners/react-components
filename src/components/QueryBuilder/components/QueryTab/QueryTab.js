import React, { Fragment } from "react";
import Segment from "../Segment/Segment";
import { useQueryBuilder } from "../../Provider";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col, Button, Typography } from "antd";

export default ({ type, inputs }) => {
  const { getObjectFromType, handleNewSegment } = useQueryBuilder();

  const { object, handlerFunction } = getObjectFromType(type);
  const { title, segments } = object;

  return (
    <Fragment>
      <Row justify="end" gutter={[8, 16]}>
        <Col span={24}>
          <Typography.Title
            ellipsis
            level={4}
            style={{ left: 0 }}
            editable={{
              onChange: (str) => {
                handlerFunction((prevState) => {
                  return { ...prevState, title: str };
                });
              },
            }}
          >
            {title}
          </Typography.Title>
        </Col>
      </Row>

      <Row justify="center" gutter={[8, 16]}>
        {segments.map((segment, index) => {
          const isLastItem = index === segments.length - 1;
          return (
            <Fragment key={`segment-${segment.id}`}>
              <Col span={24}>
                <Segment
                  {...segment}
                  type={type}
                  index={index}
                  inputs={inputs}
                />
              </Col>

              <Col span={24}>
                <Button
                  disabled={!isLastItem}
                  icon={<PlusOutlined />}
                  style={{ marginLeft: 20 }}
                  onClick={() => handleNewSegment(type)}
                >
                  And
                </Button>
              </Col>
            </Fragment>
          );
        })}
      </Row>
    </Fragment>
  );
};
