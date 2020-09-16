import Segment from "../Segment";
import { Edit3 } from "react-feather";
import React, { Fragment } from "react";
import { Row, Col, Button, Typography } from "antd";
import Icon, { PlusOutlined } from "@ant-design/icons";
import { ResultTable } from "@offsetpartners/react-components";
import { useQueryBuilder } from "components/QueryBuilder/provider";

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
              icon: (
                <Icon
                  component={() => (
                    <Edit3 width={16} height={16} type="outlined" />
                  )}
                />
              ),
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
                  type="ghost"
                  disabled={!isLastItem}
                  icon={<PlusOutlined />}
                  onClick={() => handleNewSegment(type)}
                  className="fig-query-builder-and-button"
                >
                  And
                </Button>
              </Col>
            </Fragment>
          );
        })}
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col>
          <Button type="primary">Save and Preview</Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col span={24}>
          <ResultTable type={type} />
        </Col>
      </Row>
    </Fragment>
  );
};
