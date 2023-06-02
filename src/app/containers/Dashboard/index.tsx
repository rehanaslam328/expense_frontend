/** @format */

import { AreaChart } from "./AreaChart";
import { Col, Row } from "antd";
import { BarChart } from "./BarChart";
import { ColumnChart } from "./ColumnChart";
import { HistoGramChart } from "./HistogramChart";
import { PieChart } from "./PieChart";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <AreaChart />
        </Col>
        <Col span={8}>
          <BarChart />
        </Col>
        <Col span={8}>
          <ColumnChart />
        </Col>
        <Col span={8}>
          <HistoGramChart />
        </Col>
        <Col span={8}>
          <PieChart />
        </Col>
      </Row>
    </>
  );
};
export default Dashboard;
