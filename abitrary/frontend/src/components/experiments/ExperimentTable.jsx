import { Progress, Switch, Table } from "antd";
import dayjs from "dayjs";
import ExperimentDescription from "./ExperimentDescription";

const ExperimentTable = ({ data, loading, onToggle }) => {
  const getRatio = (from, to) => {
    if (!(from && to)) return 0;
    const now = dayjs();
    const total = dayjs(to) - dayjs(from);
    const current = now - dayjs(from);
    return total < current ? 100 : Math.round((current / total) * 100);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Progress",
      key: "progress",
      responsive: ["md"],
      width: "30%",
      render: (text, record) => (
        <Progress
          percent={getRatio(record.start_date, record.end_date)}
          size="small"
        />
      ),
    },
    {
      title: "Start date",
      key: "start_date",
      dataIndex: "start_date",
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "End date",
      key: "end_date",
      width: "15%",
      dataIndex: "end_date",
      responsive: ["md"],
    },
    {
      title: "Running State",
      key: "state",
      dataIndex: "is_running",
      align: "center",
      render: (text) => <Switch defaultChecked={text} onChange={onToggle} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      expandable={{
        expandedRowRender: (record) => (
          <ExperimentDescription record={record} />
        ),
      }}
      rowKey="id"
    />
  );
};

export default ExperimentTable;
