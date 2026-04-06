import { useState } from "react";
import {
  LayoutGrid,
  Users,
  Heart,
  Award,
  Download,
  ExternalLink,
  TrendingDown,
  ArrowLeft,
} from "lucide-react";

import { TrendingUp, FileText, ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CompletionChart from "./CompletionChart";
import { Icon } from "../../../../assets";

export const peopleAnalyticsData = [
  {
    type: "engagement",
    title: "Engagement & Sentiment",
    subtitle:
      "How individuals connect, feel appreciated, and express themselves",
    color: {
      border: "border-[#34C759]",
      bg: "bg-[#34C7591A]",
      text: "text-[#34C759]",
      icon: "text-[#34C759]",
    },
    items: [
      {
        label: "Employee Engagement",
        description: "eNPS rating",
        value: "89%",
        change: "-7%",
        negative: true,
        icon: Users,
      },
      {
        label: "Recognition Frequency",
        description: "This month",
        value: "247",
        change: "+5%",
        icon: Users,
      },
      {
        label: "Sentiment Analysis",
        description: "Positive sentiment",
        value: "82%",
        change: "+31%",
        icon: Users,
      },
      {
        label: "Emotional Well-being",
        description: "Average score",
        value: "43",
        change: "-19%",
        negative: true,
        icon: Users,
      },
    ],
  },
  {
    type: "performance",
    title: "Performance & Growth",
    subtitle: "How individuals develop skills and advance their careers",
    color: {
      border: "border-[#3275F1]",
      bg: "bg-[#3275F11A]",
      text: "text-[#3275F1]",
      icon: "text-[#3275F1]",
    },
    items: [
      {
        label: "Skill Utilization Rate",
        description: "Role-aligned skills",
        value: "4.6/5",
        change: "+8%",
        icon: FileText,
      },
      {
        label: "Career Progression",
        description: "Promotions this quarter",
        value: "67",
        change: "+12%",
        icon: FileText,
      },
      {
        label: "Learning Completion",
        description: "Course completion rate",
        value: "91%",
        change: "+6%",
        icon: FileText,
      },
      {
        label: "Learning Participation",
        description: "Active participants",
        value: "156",
        change: "+4%",
        icon: FileText,
      },
    ],
  },
  {
    type: "wellness",
    title: "Wellness & Resilience",
    subtitle: "How individuals maintain balance and well-being",
    color: {
      border: "border-[#945EEB]",
      bg: "bg-purple-50",
      text: "text-[#945EEB]",
      icon: "text-[#945EEB]",
    },
    items: [
      {
        label: "Workload Balance",
        description: "Capacity alignment",
        value: "87.4%",
        change: "+4%",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Burnout Risk Index",
        description: "18% flagged",
        value: "Low",
        change: "-22%",
        negative: true,
        icon: ChartNoAxesCombined,
      },
      {
        label: "Absenteeism Rate",
        description: "Below target",
        value: "2.1%",
        change: "+9%",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Wellness Program",
        description: "Participation rate",
        value: "87.4%",
        change: "+9%",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

export const cultureAnalyticsData = [
  {
    type: "trust",
    title: "Trust & Inclusion",
    subtitle: "How teams build trust and create belonging",
    color: {
      border: "border-[#34C759]",
      bg: "bg-[#34C7591A]",
      text: "text-[#34C759]",
      icon: "text-[#34C759]",
    },
    items: [
      {
        label: "Organizational Trust",
        description: "Survey-based score",
        value: "92%",
        change: "7%",
        icon: Users,
      },
      {
        label: "Inclusion & Belonging",
        description: "Feel included",
        value: "247",
        change: "+5%",
        icon: Users,
      },
      {
        label: "Psychological Safety",
        description: "Team feedback",
        value: "82%",
        change: "+31%",
        icon: Users,
      },
      {
        label: "Emotional Well-being",
        description: "Average score",
        value: "43",
        change: "-19%",
        negative: true,
        icon: Users,
      },
    ],
  },
  {
    type: "collaboration",
    title: "Collaboration & Team Dynamics",
    subtitle: "How teams connect and work together effectively",
    color: {
      border: "border-[#3275F1]",
      bg: "bg-[#3275F11A]",
      text: "text-[#3275F1]",
      icon: "text-[#3275F1]",
    },
    items: [
      {
        label: "Skill Utilization Rate",
        description: "Role-aligned skills",
        value: "4.6/5",
        change: "+8%",
        icon: FileText,
      },
      {
        label: "Learning Completion",
        description: "Course completion rate",
        value: "91%",
        change: "+6%",
        icon: FileText,
      },
      {
        label: "Learning Participation",
        description: "Active participants",
        value: "156",
        change: "+4%",
        icon: FileText,
      },
    ],
  },
  {
    type: "valuesalignment",
    title: "Values Alignment",
    subtitle: "How teams embody organizational mission and values",
    color: {
      border: "border-[#945EEB]",
      bg: "bg-purple-50",
      text: "text-[#945EEB]",
      icon: "text-[#945EEB]",
    },
    items: [
      {
        label: "Workload Balance",
        description: "Capacity alignment",
        value: "87.4%",
        change: "+4%",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Burnout Risk Index",
        description: "18% flagged",
        value: "Low",
        change: "-22%",
        negative: true,
        icon: ChartNoAxesCombined,
      },
      {
        label: "Absenteeism Rate",
        description: "Below target",
        value: "2.1%",
        change: "+9%",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Wellness Program",
        description: "Participation rate",
        value: "87.4%",
        change: "+9%",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];
export const excellenceAnalyticsData = [
  {
    type: "trust",
    title: "Operational Performance",
    subtitle: "How teams perceive, prepare, and persist to achieve results",
    color: {
      border: "border-[#34C759]",
      bg: "bg-[#34C7591A]",
      text: "text-[#34C759]",
      icon: "text-[#34C759]",
    },
    items: [
      {
        label: "Organizational Trust",
        description: "Survey-based score",
        value: "92%",
        change: "7%",
        icon: Users,
      },
      {
        label: "Inclusion & Belonging",
        description: "Feel included",
        value: "247",
        change: "+5%",
        icon: Users,
      },
      {
        label: "Psychological Safety",
        description: "Team feedback",
        value: "82%",
        change: "+31%",
        icon: Users,
      },
      {
        label: "Emotional Well-being",
        description: "Average score",
        value: "43",
        change: "-19%",
        negative: true,
        icon: Users,
      },
    ],
  },
  {
    type: "Customer & Stakeholder Impact",
    title: "Customer & Stakeholder Impact",
    subtitle: "How teams connect and work together effectively",
    color: {
      border: "border-[#3275F1]",
      bg: "bg-[#3275F11A]",
      text: "text-[#3275F1]",
      icon: "text-[#3275F1]",
    },
    items: [
      {
        label: "Skill Utilization Rate",
        description: "Role-aligned skills",
        value: "4.6/5",
        change: "+8%",
        icon: FileText,
      },
      {
        label: "Career Progression",
        description: "Promotions this quarter",
        value: "67",
        change: "+12%",
        icon: FileText,
      },
      {
        label: "Learning Completion",
        description: "Course completion rate",
        value: "91%",
        change: "+6%",
        icon: FileText,
      },
      {
        label: "Learning Participation",
        description: "Active participants",
        value: "156",
        change: "+4%",
        icon: FileText,
      },
    ],
  },
  {
    type: "Resilience & Adaptability",
    title: "Resilience & Adaptability",
    subtitle: "How teams adapt and thrive through change",
    color: {
      border: "border-[#945EEB]",
      bg: "bg-purple-50",
      text: "text-[#945EEB]",
      icon: "text-[#945EEB]",
    },
    items: [
      {
        label: "Workload Balance",
        description: "Capacity alignment",
        value: "87.4%",
        change: "+4%",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Burnout Risk Index",
        description: "18% flagged",
        value: "Low",
        change: "-22%",
        negative: true,
        icon: ChartNoAxesCombined,
      },
      {
        label: "Absenteeism Rate",
        description: "Below target",
        value: "2.1%",
        change: "+9%",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

const MetricCard = ({ item, colors }) => {
  const Icon = item.icon;

  return (
    <div
      className={`rounded-xl border border-gray-200 p-2 ${colors.border} ${colors.bg}`}
    >
      {/* Icon */}
      <div className={`mb-2 ${colors.icon}`}>
        <Icon size={18} />
      </div>

      {/* Title */}
      <p className="text-lg font-medium text-gray-800">{item.label}</p>

      {/* Subtitle */}
      <p className=" mt-1 text-sm">{item.description}</p>

      {/* Value */}
      <div className="mt-2 text-2xl font-bold text-gray-900">{item.value}</div>

      {/* Change */}
      <p
        className={`text-sm mt-1 flex items-center gap-2 ${
          item.negative ? "text-red-500" : "text-green-600"
        }`}
      >
        {item.change}{" "}
        {item.negative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
      </p>
    </div>
  );
};

/* =======================
   TAB CONTENT COMPONENTS
======================= */

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="border rounded-xl bg-sidebar border-gray-200 p-2 md:p-6">
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-4 md:gap-0 mb-2">
          <div>
            <h3 className="font-semibold text-xl flex items-center gap-2">
              Assessment Overview <ExternalLink size={14} />
            </h3>
          </div>
          <div className="flex justify-end gap-3">
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 md:py-2 rounded-lg text-sm font-medium">
              <img src={Icon.Filter} alt="" className="w-3 h-3" /> Filters
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-1 md:py-2 rounded-lg text-sm font-medium">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-4 gap-2 md:px-0 md:gap-0 py-4 mt-4 items-start">
          <StatCard
            title="High Engagement Departments"
            value="94.5%"
            desc="Design and Marketing show highest completion rates"
          />
          <StatCard
            title="Completion Time"
            value="185"
            desc="Average assessment completion time"
          />
          <StatCard
            title="Monthly Growth"
            value="+23%"
            desc="Assessment completions vs last month"
          />
        </div>
      </div>
      {/* Line chart placeholder */}
      <div className="bg-sidebar rounded-xl md:border border-gray-200 p-2 md:p-4">
        <CompletionChart />

        {/* Department completion */}
        <h3 className="font-semibold text-xl mb-2 flex items-center gap-2 py-2">
          Departments Completion Rates <ExternalLink size={14} />
        </h3>
        <div className="space-y-4">
          <div className=" rounded-xl border border-gray-200 px-4 py-2">
            <DepartmentRow name="Design" users={145} percent={92} />
          </div>
          <div className=" rounded-xl border border-gray-200 px-4 py-2">
            <DepartmentRow name="Sales" users={52} percent={87} />
          </div>
          <div className=" rounded-xl border border-gray-200 px-4 py-2">
            <DepartmentRow name="Engineering" users={36} percent={94} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PeopleTab = () => {
  return (
    <div className="space-y-6">
      {peopleAnalyticsData.map((section) => (
        <div key={section.type} className="space-y-2">
          {/* Section header */}
          <div>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="text-sm mt-1">{section.subtitle}</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            {section.items.map((item, index) => (
              <MetricCard key={index} item={item} colors={section.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CultureTab = () => {
  return (
    <div className="space-y-6">
      {cultureAnalyticsData.map((section) => (
        <div key={section.type} className="space-y-2">
          {/* Section header */}
          <div>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="text-sm mt-1">{section.subtitle}</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            {section.items.map((item, index) => (
              <MetricCard key={index} item={item} colors={section.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ExcellenceTab = () => {
  return (
    <div className="space-y-6">
      {excellenceAnalyticsData.map((section) => (
        <div key={section.type} className="space-y-2">
          {/* Section header */}
          <div>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="text-sm mt-1">{section.subtitle}</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            {section.items.map((item, index) => (
              <MetricCard key={index} item={item} colors={section.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */

const CompanyData = () => {
  const [activeTab, setActiveTab] = useState("overview");
   const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // go back
    } else {
      navigate("/super-admin/data-analytics"); // fallback
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "people":
        return <PeopleTab />;
      case "culture":
        return <CultureTab />;
      case "excellence":
        return <ExcellenceTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 space-y-2 ">
      {/* Header */}
      <div>
        <button
          onClick={handleBack}
          className="flex items-center gap-3 text-left text-lg hover:cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Company</span>
        </button>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 justify-center py-1 bg-white ">
        <TabButton
          icon={<LayoutGrid size={16} />}
          label="Overview"
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <TabButton
          icon={<Users size={16} />}
          label="People"
          active={activeTab === "people"}
          onClick={() => setActiveTab("people")}
        />
        <TabButton
          icon={<Heart size={16} />}
          label="Culture"
          active={activeTab === "culture"}
          onClick={() => setActiveTab("culture")}
        />
        <TabButton
          icon={<Award size={16} />}
          label="Excellence"
          active={activeTab === "excellence"}
          onClick={() => setActiveTab("excellence")}
        />
      </div>

      {/* Action buttons */}

      {/* Tab Content */}
      {renderTab()}
    </div>
  );
};

export default CompanyData;

/* =======================
   REUSABLE UI COMPONENTS
======================= */

const TabButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-2 py-2 text-xs md:text-base md:px-4 md:py-2 rounded-lg font-medium ${
      active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, desc }) => (
  <div className="flex flex-col justify-between items-start ">
    <p>{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
    <p className="text-sm  mt-1 max-w-xs">{desc}</p>
  </div>
);

const DepartmentRow = ({ name, users, percent }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-primary font-medium text-lg">
        {name}{" "}
        <span className="text-sm font-normal text-primary bg-primary/10 px-2 rounded-full">
          {users} Users
        </span>
      </span>
      <span className="text-primary font-medium">{percent}%</span>
    </div>
    <div className="h-2 rounded-full bg-primary/20">
      <div
        className="h-2 rounded-full bg-primary"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);
