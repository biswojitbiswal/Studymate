"use client";

import { WalletCardSkeleton } from "@/components/skeleton/admin/WalletSkeleton";
import { useAdminAnalytics } from "@/hooks/admin/useDashboard";
import { useAuthStore } from "@/store/auth";
import {
  Wallet, GraduationCap, UserCheck, Hourglass, BookOpen, Clock, CheckCircle, IndianRupee, Receipt, Banknote, Percent, Tag, FileText, Landmark
} from "lucide-react";
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

const revenueIcons = {
  "Total Earning": <IndianRupee className="w-4 h-4" />,
  Tax: <FileText className="w-4 h-4" />,
  Payout: <Landmark className="w-4 h-4" />,
  Commission: <Percent className="w-4 h-4" />,
  Discount: <Tag className="w-4 h-4" />,
};

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];
const SESSION_COLORS = ["#2563eb", "#16a34a", "#f59e0b"];
// -------------------- COMPONENT --------------------

export default function Dashboard() {
  const today = new Date();

  const lastyear = new Date();
  lastyear.setFullYear(lastyear.getFullYear() - 1);


  const [fromDate, setFromDate] = useState(lastyear);
  const [toDate, setToDate] = useState(today);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const user = useAuthStore((s) => s.user);

  const netRevenue = 21440;

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
  } = useAdminAnalytics({
    fromDate: formatDate(fromDate),
    toDate: formatDate(toDate),
  });

  const sessionOverviewData = Object.entries(
    analyticsData?.sessionOverview ?? {}
  ).map(([name, value]) => ({
    name,
    value,
  }));
  console.log(sessionOverviewData);


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-semibold">
          Welcome back, <span>{user?.name}</span> 👋
        </h1>

        {/* Date Range */}
        <div className="flex gap-3">
          <input
            type="date"
            value={formatDate(fromDate)}
            onChange={(e) => setFromDate(new Date(e.target.value))}
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            value={formatDate(toDate)}
            onChange={(e) => setToDate(new Date(e.target.value))}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        {analyticsLoading ? (
          <>
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </>
        ) : (
          <>
            <Card
              title="Total Users"
              value={String(analyticsData?.totalUser ?? 0).padStart(2, "0")}
              color="purple"
              Icon={Wallet}
              info="Registered users"
            />

            <Card
              title="Total Students"
              value={String(analyticsData?.totalStudent ?? 0).padStart(2, "0")}
              color="green"
              Icon={GraduationCap}
              info="Enrolled students"
            />

            <Card
              title="Total Tutors"
              value={String(analyticsData?.totalTutor ?? 0).padStart(2, "0")}
              color="blue"
              Icon={UserCheck}
              info="Approved tutors"
            />

            <Card
              title="Pending Requests"
              value={String(analyticsData?.totalTutorReq ?? 0).padStart(2, "0")}
              color="orange"
              Icon={Hourglass}
              info="Awaiting approval"
            />

            <Card
              title="Total Classes"
              value={String(analyticsData?.totalClasses ?? 0).padStart(2, "0")}
              color="pink"
              Icon={BookOpen}
              info="Classes created"
            />

            <Card
              title="Ongoing Classes"
              value={String(analyticsData?.ongoingClasses ?? 0).padStart(2, "0")}
              color="indigo"
              Icon={Clock}
              info="Currently active"
            />

            <Card
              title="Completed Classes"
              value={String(analyticsData?.completedClasses ?? 0).padStart(2, "0")}
              color="teal"
              Icon={CheckCircle}
              info="Successfully finished"
            />

            <Card
              title="Total Earnings"
              value={`₹${(analyticsData?.totalEarning ?? 0).toFixed(2)}`}
              color="emerald"
              Icon={IndianRupee}
              info="Gross revenue"
            />

            <Card
              title="Total Tax"
              value={`₹${(analyticsData?.totalTaxes ?? 0).toFixed(2)}`}
              color="red"
              Icon={Receipt}
              info="Collected tax"
            />

            <Card
              title="Total Payouts"
              value={`₹${(analyticsData?.totalPayouts ?? 0).toFixed(2)}`}
              color="cyan"
              Icon={Banknote}
              info="Tutor payouts"
            />

            <Card
              title="Commission"
              value={`₹${(analyticsData?.totalCommission ?? 0).toFixed(2)}`}
              color="yellow"
              Icon={Percent}
              info="Platform commission"
            />

            <Card
              title="Discount"
              value={`₹${(analyticsData?.totalDiscount ?? 0).toFixed(2)}`}
              color="lime"
              Icon={Tag}
              info="Discounts applied"
            />

          </>
        )}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
          <h3 className="mb-4 font-medium">Earning Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData?.earnings}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earning"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        {/* <div className="bg-white p-4 rounded-xl shadow-sm">
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
        </div> */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="mb-4 font-medium">Session Type</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionOverviewData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {sessionOverviewData?.map((_, i) => (
                  <Cell
                    key={i}
                    fill={SESSION_COLORS[i % SESSION_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend manually (cleaner than default) */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            {sessionOverviewData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SESSION_COLORS[i] }}
                />
                {item?.name} ({item?.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Session Type */}
        {/* <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="mb-4 font-medium">Session Type</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionTypeData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
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

          <div className="flex justify-center gap-6 mt-4 text-sm">
            {sessionTypeData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SESSION_COLORS[i] }}
                />
                {item?.name} ({item?.value})
              </div>
            ))}
          </div>
        </div> */}

        {/* Revenue Breakdown */}
        {/* <div className="bg-white p-4 rounded-xl shadow-sm">
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
        </div> */}

        {/* User Overview */}
        <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User Overview</h3>

            <div className="text-sm flex gap-4">
              <span className="text-blue-600 font-medium">
                Students: {String(analyticsData?.totalStudent ?? 0).padStart(2, "0") ?? 0}
              </span>
              <span className="text-green-600 font-medium">
                Tutors: {String(analyticsData?.totalTutor ?? 0).padStart(2, "0") ?? 0}
              </span>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData?.userOverview ?? []}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar
                dataKey="Student"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="Tutor"
                fill="#16a34a"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Earning Summary */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">
            Earning Summary
          </h3>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500">
              <span>Particulars</span>
              <span className="text-right">Amount</span>
            </div>

            {analyticsLoading
              ? [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 items-center px-4 py-3 border-t"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  </div>

                  <div className="flex justify-end">
                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              ))
              : analyticsData?.revenueSummary?.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 items-center px-4 py-3 border-t text-sm"
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">
                      {revenueIcons[item.label]}
                    </span>
                    {item.label}
                  </div>

                  <div className="text-right font-medium text-gray-800">
                    {`₹${Number(item.value ?? 0).toFixed(2)}`}
                  </div>
                </div>
              ))}

            {/* Net Revenue */}
            <div className="grid grid-cols-2 items-center px-4 py-3 border-t bg-blue-50">
              <span className="font-semibold text-blue-600">
                Net Revenue
              </span>

              {analyticsLoading ? (
                <div className="flex justify-end">
                  <div className="h-5 w-24 rounded bg-blue-200 animate-pulse" />
                </div>
              ) : (
                <span className="text-right font-bold text-blue-600">
                  {formatINR(analyticsData?.netPlatformRevenue ?? 0)}
                </span>
              )}
            </div>
          </div>
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

    yellow: "bg-yellow-50 text-yellow-600",
    cyan: "bg-cyan-50 text-cyan-600",
    emerald: "bg-emerald-50 text-emerald-600",
    lime: "bg-lime-50 text-lime-600",
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

    yellow: "bg-yellow-200 text-yellow-700",
    cyan: "bg-cyan-200 text-cyan-700",
    emerald: "bg-emerald-200 text-emerald-700",
    lime: "bg-lime-200 text-lime-700",
  };

  return (
    <div className={`flex items-start gap-2 p-4 rounded-xl shadow-sm ${colors[color]}`}>
      <div className={`p-3 rounded-md ${icons[color]}`}>
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