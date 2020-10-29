import Segment from "../Segment";
import { Fragment } from "react";
import { Edit3, Plus } from "react-feather";
import ResultTable from "components/ResultTable";
import { Row, Col, Button, Typography, Skeleton } from "antd";
import { useQueryBuilder } from "components/QueryBuilder/lib/Provider";

export default ({ type, inputs }) => {
  const {
    result,
    loading,
    disabled,
    handleSave,
    getObjectFromType,
    handleNewSegment,
  } = useQueryBuilder();

  const { object, handlerFunction } = getObjectFromType(type);
  const { title, segments } = object;

  return (
    <Fragment>
      <Typography.Title
        ellipsis
        level={4}
        disabled={loading || disabled}
        style={{ left: 0, fontSize: 25 }}
        editable={{
          icon: <Edit3 size={16} />,
          onChange: (str) => {
            (!loading && !disabled) &&
              handlerFunction((prevState) => {
                return { ...prevState, title: str };
              });
          },
        }}
      >
        {title}
      </Typography.Title>

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
                  onClick={() => handleNewSegment(type)}
                  className="fig-query-builder-and-button"
                  disabled={loading || disabled || !isLastItem}
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

      <Row className="fig-query-builder-save-row">
        <Col>
          <Button
            type="primary"
            disabled={loading || disabled}
            onClick={() => handleSave(type)}
          >
            Save and Preview
          </Button>
        </Col>
      </Row>

      {/* {result[type] && ( */}
      <Row className="fig-query-builder-result-row">
        <Col span={24}>
          {loading ? (
            <Skeleton
              active
              loading
              title={{
                width: "100%",
                className: "fig-query-builder-skeleton-head",
              }}
              paragraph={{
                rows: 2,
                width: "100%",
                className: "fig-query-builder-skeleton-body",
              }}
            />
          ) : (
            result[type] && <ResultTable type={type} data={result[type]} />
          )}
        </Col>
      </Row>
      {/* )} */}
    </Fragment>
  );
};
