import { mockBusinessDomains } from '@/lib/mockData';
import { Network, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function BusinessDomainMatrix() {
  const [viewMode, setViewMode] = useState<'business' | 'asset'>('business');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
         <div className="flex items-center gap-2">
           <Network className="w-5 h-5 text-indigo-500" />
           <h3 className="text-base font-semibold text-slate-800">业务应用全景</h3>
         </div>
         <div className="flex items-center bg-slate-100 p-0.5 rounded-md">
           <button 
             onClick={() => setViewMode('business')}
             className={cn("text-xs font-semibold px-3 py-1 rounded-sm transition-colors", viewMode === 'business' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700")}
           >
             业务视角
           </button>
           <button 
             onClick={() => setViewMode('asset')}
             className={cn("text-xs font-semibold px-3 py-1 rounded-sm transition-colors", viewMode === 'asset' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700")}
           >
             资产视角
           </button>
         </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4">
        {viewMode === 'business' ? (
          // Business Perspective
          mockBusinessDomains.map(domain => (
            <div key={domain.id} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all group bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-2 relative">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    {domain.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[85%] leading-relaxed">{domain.description}</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded font-semibold whitespace-nowrap">
                  {domain.revenueStatus}
                </span>
              </div>
              
              <div className="flex gap-4 mt-4 mb-3 py-2 border-y border-dashed border-slate-200 relative">
                {domain.coreMetrics.map((m, i) => (
                  <div key={i} className="flex-1">
                    <p className="text-[10px] text-slate-400 font-medium mb-0.5">{m.label}</p>
                    <p className="text-sm font-bold text-slate-700">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="relative">
                <p className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">支撑此业务的资产 <ArrowRightLeft className="w-3 h-3 text-slate-300"/></p>
                <div className="flex flex-wrap gap-1.5">
                  {domain.assetsUsed.map(assetId => (
                    <span key={assetId} className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-[10px] text-indigo-700 font-medium rounded hover:bg-indigo-100 cursor-pointer transition-colors">
                      {assetId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Asset Perspective (Mocked derived view focusing on assets serving businesses)
          <div className="space-y-4">
             <div className="border border-slate-200 rounded-lg p-4 relative overflow-hidden bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">A1001 · 全国路网高精地图</h4>
                    <span className="text-[10px] text-slate-500">S核心 | 日更 | 矢量地图</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">赋能 2 个业务</span>
                </div>
                <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                   <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-100">
                     <span className="font-semibold text-slate-700">智驾数据服务</span>
                     <span className="text-slate-400">依赖路径规划能力</span>
                   </div>
                   <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-100">
                     <span className="font-semibold text-slate-700">物流履约核验</span>
                     <span className="text-slate-400">依赖时空计算能力</span>
                   </div>
                </div>
             </div>

             <div className="border border-slate-200 rounded-lg p-4 relative overflow-hidden bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">B2001 · 商用车轨迹合规校验</h4>
                    <span className="text-[10px] text-slate-500">S核心 | 实时 | API接口</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">赋能 2 个业务</span>
                </div>
                <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                   <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-100">
                     <span className="font-semibold text-slate-700">物流履约核验</span>
                     <span className="text-slate-400">依赖查询服务</span>
                   </div>
                   <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-100">
                     <span className="font-semibold text-slate-700">保险科技风控</span>
                     <span className="text-slate-400">依赖轨迹特征提取</span>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
