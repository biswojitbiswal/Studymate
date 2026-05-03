"use client";

import { useAuthStore } from "@/store/auth";
import { FileText, IndianRupee, Landmark, Percent, Tag, Wallet } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// -------------------- STATIC DATA --------------------

const stats = [
  { title: "Total Users", value: "12,450", Icon: { Wallet }, color: "blue", info: "+12.5%" },
  { title: "Students", value: "8,230", Icon: { Wallet }, color: "blue", info: "+10.3%" },
  { title: "Tutors", value: "1,540", Icon: { Wallet }, color: "blue", info: "+8.1%" },
  { title: "Pending Requests", value: "78", Icon: { Wallet }, color: "blue", info: "-5.4%" },
  { title: "Total Classes", value: "2,450", Icon: { Wallet }, color: "blue", info: "+11.2%" },
  { title: "Ongoing Classes", value: "320", Icon: { Wallet }, color: "blue", info: "+7.4%" },
  { title: "Completed Classes", value: "2,130", Icon: { Wallet }, color: "blue", info: "+14.2%" },
  { title: "Total Earning", value: "$24,560", Icon: { Wallet }, color: "blue", info: "+18.6%" },
  { title: "Total Earning", value: "$24,560", Icon: { Wallet }, color: "blue", info: "+18.6%" },
  { title: "Total Earning", value: "$24,560", Icon: { Wallet }, color: "blue", info: "+18.6%" },
  { title: "Total Earning", value: "$24,560", Icon: { Wallet }, color: "blue", info: "+18.6%" },
  { title: "Total Earning", value: "$24,560", Icon: { Wallet }, color: "blue", info: "+18.6%" },
];

const earningData = [
  { day: "1 May", value: 5000 },
  { day: "6 May", value: 8000 },
  { day: "11 May", value: 12000 },
  { day: "16 May", value: 15000 },
  { day: "21 May", value: 14000 },
  { day: "31 May", value: 24560 },
];

const sessionData = [
  { name: "Completed", value: 1650 },
  { name: "Scheduled", value: 720 },
  { name: "Cancelled", value: 280 },
  { name: "No-show", value: 130 },
];

const sessionTypeData = [
  { name: "Regular", value: 1680 },
  { name: "Extra", value: 730 },
  { name: "Doubt", value: 370 },

];

const userOverviewData = [
  { day: "1 May", students: 7000, tutors: 2000 },
  { day: "8 May", students: 7500, tutors: 2200 },
  { day: "15 May", students: 7800, tutors: 2300 },
  { day: "22 May", students: 8200, tutors: 2400 },
  { day: "31 May", students: 8600, tutors: 2600 },
];

const revenueData = [
  {
    label: "Total Earning",
    value: 24560,
    icon: <IndianRupee className="w-4 h-4" />,
  },
  {
    label: "Tax",
    value: 2456,
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "Payout",
    value: 18240,
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    label: "Commission",
    value: 3120,
    icon: <Percent className="w-4 h-4" />,
  },
  {
    label: "Discount",
    value: 1250,
    icon: <Tag className="w-4 h-4" />,
  },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];
const SESSION_COLORS = ["#2563eb", "#16a34a", "#f59e0b"];
// -------------------- COMPONENT --------------------

export default function Dashboard() {
  const [fromDate, setFromDate] = useState("2024-05-01");
  const [toDate, setToDate] = useState("2024-05-31");

  const user = useAuthStore((s) => s.user);

  const netRevenue = 21440;

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="px-6 py-0 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome back, <span>{user.name}</span> 👋
        </h1>

        {/* Date Range */}
        <div className="flex gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {stats.map((item, i) => (
          <Card key={i} title={item.title} value={item.value} color={item.color} info={item.info} Icon={Wallet} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
          <h3 className="mb-4 font-medium">Earning Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="mb-4 font-medium">Session Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={sessionData} dataKey="value">
                {sessionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Session Type */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="mb-4 font-medium">Session Type</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionTypeData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}   // makes it donut
                outerRadius={100}
                paddingAngle={4}
              >
                {sessionTypeData.map((_, i) => (
                  <Cell key={i} fill={SESSION_COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend manually (cleaner than default) */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            {sessionTypeData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SESSION_COLORS[i] }}
                />
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="mb-4 font-medium">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={revenueData} dataKey="value">
                {revenueData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Earning Summary */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">
            Earning Summary
          </h3>

          <div className="border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500">
              <span>Particulars</span>
              <span className="text-right">Amount</span>
            </div>

            {/* Rows */}
            {revenueData.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-2 items-center px-4 py-3 border-t text-sm"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-400">{item.icon}</span>
                  {item.label}
                </div>

                <div className="text-right font-medium text-gray-800">
                  {formatINR(item.value)}
                </div>
              </div>
            ))}

            {/* Net Revenue */}
            <div className="grid grid-cols-2 items-center px-4 py-3 border-t bg-blue-50">
              <span className="font-semibold text-blue-600">
                Net Revenue
              </span>
              <span className="text-right font-bold text-blue-600">
                {formatINR(netRevenue)}
              </span>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* User Overview */}
        <div className="bg-white p-4 rounded-xl shadow-sm col-span-3">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User Overview</h3>

            <div className="text-sm flex gap-4">
              <span className="text-blue-600 font-medium">
                Students: {2300}
              </span>
              <span className="text-green-600 font-medium">
                Tutors: {400}
              </span>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userOverviewData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar dataKey="students" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="tutors" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}



function Card({ title, value = 0, color, info, Icon }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
    orange: "bg-orange-50 text-orange-600",
  };

  const icons = {
    blue: "bg-blue-200 text-blue-700",
    green: "bg-green-200 text-green-700",
    red: "bg-red-200 text-red-700",
    purple: "bg-purple-200 text-purple-700",
    pink: "bg-pink-200 text-pink-700",
    indigo: "bg-indigo-200 text-indigo-700",
    teal: "bg-teal-200 text-teal-700",
    orange: "bg-orange-200 text-orange-700",
  };

  return (
    <div className={`flex items-start gap-2 p-4 rounded-xl shadow-sm ${colors[color]}`}>
      <div className={`p-2.5 rounded-md ${icons[color]}`}>
        {Icon && <Icon size={18} />}
      </div>
      <div className="gap-1">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-xl font-semibold`}>
          {((value || 0))}
        </h2>
        <p className="text-sm text-gray-500">{info}</p>
      </div>
    </div>
  );
}



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg p-2 shadow">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-blue-600">
          Students: {payload[0].value}
        </p>
        <p className="text-green-600">
          Tutors: {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};