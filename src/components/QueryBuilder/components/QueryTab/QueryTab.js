import Segment from "../Segment";
import React, { Fragment } from "react";
import { Edit3, Plus } from "react-feather";
import ResultTable from "components/ResultTable";
import { Row, Col, Button, Typography } from "antd";
import { useQueryBuilder } from "components/QueryBuilder/lib/Provider";

export default ({ type, inputs }) => {
  const { orders, getObjectFromType, handleNewSegment } = useQueryBuilder();

  const { object, handlerFunction } = getObjectFromType(type);
  const { title, segments } = object;

  return (
    <Fragment>
      <Row justify="end" gutter={[8, 16]}>
        <Col span={24}>
          <Typography.Title
            ellipsis
            level={4}
            style={{ left: 0, fontSize: 25 }}
            editable={{
              icon: <Edit3 size={16} />,
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
                  onClick={() => handleNewSegment(type)}
                  className="fig-query-builder-and-button"
                  icon={
                    <span className="anticon">
                      <Plus size="1em" />
                    </span>
                  }
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
          <Button
            type="primary"
            onClick={() => {
              console.log(orders);
            }}
          >
            Save and Preview
          </Button>
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
