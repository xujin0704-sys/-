import React from 'react';
import { Database, Zap, ShieldAlert, Activity, ArrowRight, LayoutDashboard, Layers, ShieldCheck, Box, Network } from 'lucide-react';

interface OverviewDashboardProps {
  onNavigate: (view: string) => void;
}

export function OverviewDashboard({ onNavigate }: OverviewDashboardProps) {
  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between mb-2">
         <div>
           <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">全域数据要素概览</h1>
           <p className="text-sm text-slate-500">连接数据资产、场景赋能、合规管控与运行监控的一体化管控中枢。</p>
         </div>
         <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2">
             <div className="flex h-2.5 w-2.5 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
             </div>
             <span className="text-xs font-bold text-slate-600">全域系统运行监控中</span>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {/* 数据资产概览 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">数据资产盘点</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">跨域业务数据资产汇聚与治理</p>
              </div>
            </div>
            <button onClick={() => onNavigate('discovery')} className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-700 transition-colors">
              详情 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">已注册资产总数</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-800">1,248</span>
                    <span className="text-sm font-medium text-slate-500">项</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-200"></div>
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">物理数据体量</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-indigo-600">3.2</span>
                    <span className="text-sm font-medium text-indigo-500">PB</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-200"></div>
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">周环比增长</p>
                  <div className="flex items-baseline gap-1 relative">
                    <span className="text-2xl font-extrabold text-emerald-500">+12</span>
                    <span className="text-xs font-medium text-emerald-600">%</span>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">时空资产分布</span>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">45% 占比</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">业务域分布</span>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">35% 占比</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">三方公共数据</span>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">20% 占比</span>
               </div>
            </div>
          </div>
        </div>

        {/* 场景赋能概览 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-teal-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-100 text-teal-600 rounded-xl">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">业务场景赋能</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">数据资产业务价值转化与闭环</p>
              </div>
            </div>
            <button onClick={() => onNavigate('scenario')} className="text-teal-600 text-sm font-semibold flex items-center gap-1 hover:text-teal-700 transition-colors">
              详情 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
             <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">支撑业务场景</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-800">45</span>
                    <span className="text-sm font-medium text-slate-500">个</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-200"></div>
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">月均API调用量</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-teal-600">12.5</span>
                    <span className="text-sm font-medium text-teal-500">亿次</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-200"></div>
               <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">覆盖行业</p>
                  <div className="flex items-baseline gap-1 relative">
                    <span className="text-2xl font-extrabold text-slate-800">12</span>
                    <span className="text-xs font-medium text-slate-500">个</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                     <Layers className="w-4 h-4" />
                   </div>
                   <span className="text-xs font-bold text-slate-600">L5 产品化场景</span>
                 </div>
                 <span className="text-lg font-black text-slate-800">12</span>
              </div>
              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                     <Box className="w-4 h-4" />
                   </div>
                   <span className="text-xs font-bold text-slate-600">L4 方案化场景</span>
                 </div>
                 <span className="text-lg font-black text-slate-800">18</span>
              </div>
            </div>
          </div>
        </div>

        {/* 合规管控概览 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">安全与合规管控</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">实时保障数据流转的全链路安全</p>
              </div>
            </div>
            <button onClick={() => onNavigate('governance')} className="text-rose-600 text-sm font-semibold flex items-center gap-1 hover:text-rose-700 transition-colors">
              详情 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50/50 border border-rose-100/50 rounded-xl p-4 flex flex-col gap-2">
                 <span className="text-xs font-bold text-rose-600/80 uppercase">今日高危访问拦截</span>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-rose-600 tracking-tight">1,029</span>
                    <span className="text-sm font-semibold text-rose-500">次</span>
                 </div>
                 <div className="w-full h-1.5 bg-rose-100 rounded-full mt-1">
                   <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }}></div>
                 </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                 <span className="text-xs font-bold text-slate-500 uppercase">数据分类分级</span>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800 tracking-tight">3,256</span>
                    <span className="text-sm font-semibold text-slate-500">涉密字段</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 flex">
                   <div className="h-full bg-red-400 rounded-l-full" style={{ width: '15%' }}></div>
                   <div className="h-full bg-amber-400" style={{ width: '35%' }}></div>
                   <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '50%' }}></div>
                 </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between text-sm">
               <span className="font-semibold text-slate-600">API 合规审计通过率</span>
               <span className="font-black text-emerald-600">99.8%</span>
            </div>
          </div>
        </div>

        {/* 运行监控概览 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">资产运行监控</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">跨域节点负载质量与异动监控</p>
              </div>
            </div>
            <button onClick={() => onNavigate('monitoring')} className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700 transition-colors">
              详情 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
               <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">全局接口可用性</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-800">99.98</span>
                    <span className="text-sm font-medium text-slate-500">%</span>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-200 mx-4"></div>
               <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">网关异常告警</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-amber-500">2</span>
                    <span className="text-sm font-medium text-amber-600">项</span>
                  </div>
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center justify-between text-xs">
                 <span className="font-bold text-slate-600 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   T1时空网关节点
                 </span>
                 <span className="font-mono text-slate-500">2ms 延迟 - 42k QPS</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                 <span className="font-bold text-slate-600 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   T2合规脱敏集群
                 </span>
                 <span className="font-mono text-slate-500">8ms 延迟 - 15k QPS</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                 <span className="font-bold text-slate-600 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                   B1核心物流中台
                 </span>
                 <span className="font-mono text-amber-600">120ms 延迟 - 8.5k QPS</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
