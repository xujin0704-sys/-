import React from "react";
import {
  Activity,
  ArrowRightLeft,
  Database,
  SearchCheck,
  TrendingUp,
  ShieldAlert,
  FileSignature,
  ArrowRight,
  Clock,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../lib/utils";

const trendData = [
  { date: "06-10", B1物流: 120, B2企服: 45, G1公安: 180, G2城管: 65 },
  { date: "06-11", B1物流: 132, B2企服: 52, G1公安: 210, G2城管: 78 },
  { date: "06-12", B1物流: 185, B2企服: 85, G1公安: 190, G2城管: 110 },
  { date: "06-13", B1物流: 240, B2企服: 90, G1公安: 260, G2城管: 140 },
  { date: "06-14", B1物流: 310, B2企服: 115, G1公安: 285, G2城管: 105 },
  { date: "06-15", B1物流: 380, B2企服: 140, G1公安: 320, G2城管: 160 },
  { date: "06-16", B1物流: 482, B2企服: 198, G1公安: 400, G2城管: 215 },
];

export function OperationsMonitoring() {
  return (
    <div className="flex flex-col gap-6 h-full p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
          运营动态监控
        </h1>
        <p className="text-sm text-slate-500">
          运营视角下的各部门数据流入流出、新签赋能场景与合规基线变更动态。
        </p>
      </div>

      {/* 7-Day Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />近 7
            天数据资产流转负载趋势 (万次)
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
            全局流出与流入监控
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ fontSize: "13px", fontWeight: 500 }}
                labelStyle={{
                  fontSize: "12px",
                  color: "#64748B",
                  marginBottom: "4px",
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="B1物流"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="B2企服"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="G1公安"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="G2城管"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 部门数据接入与回流 (总分结构) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            部门数据接入与回流动向 (总分览)
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            本月指标与今日同步明细
          </span>
        </div>
        
        {/* 总：指标卡片 */}
        <div className="p-5 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
          {[
            {
              id: "d1",
              bg: "B1物流",
              in: "124",
              out: "358",
              color: "indigo",
              desc: "路由宽表核心覆盖",
            },
            {
              id: "d2",
              bg: "B2企服",
              in: "56",
              out: "142",
              color: "blue",
              desc: "客流画像支持商业选址",
            },
            {
              id: "d3",
              bg: "G1公安",
              in: "320",
              out: "80",
              color: "emerald",
              desc: "主要为接报事件地址库供给",
            },
            {
              id: "d4",
              bg: "G2城管",
              in: "150",
              out: "65",
              color: "amber",
              desc: "违建重点区域遥感数据",
            },
          ].map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-bold text-${dept.color}-700 bg-${dept.color}-50 px-2 py-0.5 rounded text-xs`}
                >
                  {dept.bg}
                </span>
                <span className="text-[11px] text-slate-400">
                  {dept.desc}
                </span>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3" /> 新增接入
                  </div>
                  <div className="text-lg font-black text-slate-700">
                    +{dept.in}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />{" "}
                    赋能场景
                  </div>
                  <div className="text-lg font-black text-emerald-600">
                    {dept.out}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 分：动态详情日志 */}
        <div className="p-0 overflow-x-auto rounded-b-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">执行时间</th>
                <th className="px-6 py-3">业务部门</th>
                <th className="px-6 py-3">接口拉取源 (API)</th>
                <th className="px-6 py-3">更新资产项</th>
                <th className="px-6 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { time: '10分钟前', dept: '顺丰同城', api: 'https://api.sf-city.com/v1/assets/stats', records: '+12项资产变动', status: 'success' },
                { time: '2小时前', dept: '丰巢科技', api: 'https://data.fcbox.com/openapi/assets/sync', records: '无变更', status: 'success' },
                { time: '昨天', dept: 'B2企服', api: 'https://b2b.sz.corp/sync', records: '+5项资产变动', status: 'success' },
                { time: '昨天', dept: '顺丰同城', api: 'https://api.sf-city.com/v1/assets/stats', records: '拉取超时', status: 'error' },
              ].map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {log.time}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{log.dept}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-[11px] truncate max-w-xs">{log.api}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{log.records}</td>
                  <td className="px-6 py-4">
                    {log.status === 'success' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">同步成功</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">执行失败</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 场景赋能新增 (总分结构) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <SearchCheck className="w-5 h-5 text-emerald-600" />
            数据资产场景赋能新增 (总分览)
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            最近7天指标与赋能明细
          </span>
        </div>

        {/* 总：指标卡片 */}
        <div className="p-5 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
          {[
            { type: "重大赋能", count: "15", active: "3", color: "indigo", text: "核心业务应用" },
            { type: "实验孵化", count: "24", active: "5", color: "blue", text: "创新场景测试" },
            { type: "商业产出", count: "8", active: "2", color: "emerald", text: "对外商业变现" },
            { type: "模型上线", count: "12", active: "4", color: "amber", text: "算法模型投产" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold text-${item.color}-700 bg-${item.color}-50 px-2 py-0.5 rounded text-xs`}>
                  {item.type}
                </span>
                <span className="text-[11px] text-slate-400">{item.text}</span>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3" /> 累计赋能
                  </div>
                  <div className="text-lg font-black text-slate-700">{item.count}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-500" /> 近7日新增
                  </div>
                  <div className="text-lg font-black text-emerald-600">+{item.active}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 分：动态详情日志 */}
        <div className="p-0 overflow-x-auto rounded-b-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">时间</th>
                <th className="px-6 py-3">赋能级别</th>
                <th className="px-6 py-3">应用场景目标</th>
                <th className="px-6 py-3">引入资产/源头</th>
                <th className="px-6 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { time: "10分钟前", level: "重大赋能", color: "indigo", target: "某互联网出行特批接口", src: "顺丰内部POI底库", status: "已打通" },
                { time: "2小时前", level: "实验孵化", color: "blue", target: "城市内涝预测辅助", src: "高程与三维模型库", status: "沙箱内" },
                { time: "昨天", level: "商业产出", color: "emerald", target: "外部连锁咖啡选址", src: "商业网点分布属性", status: "履约中" },
                { time: "昨天", level: "模型上线", color: "amber", target: "重卡疲劳驾驶风控模型", src: "高速慧眼轨迹集", status: "已打通" },
                { time: "2天前", level: "合规入库", color: "purple", target: "金融征信补充库", src: "外部联名三方数据", status: "待清洗" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {item.time}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold text-${item.color}-600 bg-${item.color}-50 border border-${item.color}-100 px-2 py-1 rounded`}>
                      {item.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">「{item.target}」</td>
                  <td className="px-6 py-4 text-slate-600 text-xs flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-slate-400" /> {item.src}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-semibold",
                      item.status === "已打通" ? "text-emerald-600" : "text-amber-600"
                    )}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 合规管控基线变化 (总分结构) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0 mb-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            合规管控基线变化 (总分览)
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            本月指标与合规审计流明细
          </span>
        </div>

        {/* 总：指标卡片 */}
        <div className="p-5 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
          {[
            { type: "总变更数量", count: "110", active: "15", color: "slate", text: "较上月 +15%" },
            { type: "密级上调", count: "45", active: "12", color: "rose", text: "涉及核心资产" },
            { type: "对外权限收紧", count: "18", active: "5", color: "amber", text: "影响下游API" },
            { type: "白名单特批", count: "15", active: "2", color: "emerald", text: "已走特批流程" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold text-${item.color}-700 bg-${item.color}-50 px-2 py-0.5 rounded text-xs`}>
                  {item.type}
                </span>
                <span className="text-[11px] text-slate-400">{item.text}</span>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3" /> 累计变更
                  </div>
                  <div className="text-lg font-black text-slate-700">{item.count}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" /> 本月新增
                  </div>
                  <div className="text-lg font-black text-emerald-600">+{item.active}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 分：动态详情日志 */}
        <div className="p-0 overflow-x-auto rounded-b-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">动作</th>
                <th className="px-6 py-3">影响字段/资产</th>
                <th className="px-6 py-3">变更细节</th>
                <th className="px-6 py-3">管控原因</th>
                <th className="px-6 py-3">执行时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { action: "密级上调", field: "收件人脱敏手机号", old: "L2-秘密", new: "L3-机密", reason: "集团隐私红线新规", time: "1小时前", type: "warn" },
                { action: "对外属性收紧", field: "区域客流热力(100m)", old: "公开商业可用", new: "需审批", reason: "政策管控要求", time: "昨天", type: "error" },
                { action: "权属变更", field: "网约车OD流向", old: "B1-物流", new: "集团公共安全部", reason: "架构调整合并管理", time: "前天", type: "info" },
                { action: "白名单特批", field: "物流节点坐标", old: "内部可用", new: "脱敏对外可用", reason: "支持核心大客户供应链透明", time: "3天前", type: "success" },
              ].map((audit, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                      <FileSignature className="w-4 h-4 text-slate-400" /> {audit.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 text-xs">{audit.field}</td>
                  <td className="px-6 py-4 flex items-center gap-2 text-xs">
                    <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 line-through opacity-70">{audit.old}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                    <span className={cn(
                      "px-1.5 py-0.5 rounded border font-semibold",
                      audit.type === "warn" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      audit.type === "error" ? "bg-rose-50 text-rose-700 border-rose-200" :
                      audit.type === "info" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-emerald-50 text-emerald-700 border-emerald-200"
                    )}>
                      {audit.new}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs max-w-[200px] truncate" title={audit.reason}>{audit.reason}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {audit.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
