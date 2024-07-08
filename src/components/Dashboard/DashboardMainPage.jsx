import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardMainPage() {
  const data = [
    { name: "Page A", uv: 4021, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 64321, pv: 2600, amt: 2600 },
    { name: "Page C", uv: 8010, pv: 2800, amt: 2800 },
    { name: "Page D", uv: 112000, pv: 3000, amt: 3000 },
  ];

  return (
    <div className="m-10">
      <AreaChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Area type="monotone" dataKey="uv" stroke="rgb(59,130,246)" />
        <CartesianGrid stroke="#fff4" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          labelStyle={{ color: "#fff" }}
          itemStyle={{
            textShadow: "0 0 5px rgb(59,130,246), 0 0 5px rgb(59,130,246)",
            color: "#fff",
          }}
          contentStyle={{ background: "#fff4", border: 0, borderRadius: "5px" }}
        />
      </AreaChart>
    </div>
  );
}
