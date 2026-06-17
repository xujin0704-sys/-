import React from 'react';
import { X, Database, Workflow, ShieldCheck, Copy, Sparkles, FileJson, Puzzle, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export function ScenarioDetailDrawer({
  isOpen,
  onClose,
  scenario,
}: {
  isOpen: boolean;
  onClose: () => void;
  scenario: any | null;
}) {
  if (!isOpen || !scenario) return null;

  return (
    <div className="absolute inset-y-0 right-0 w-[800px] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 border-l border-slate-200">
      {/* Header */}
      <div className="h-[88px] px-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Puzzle className="w-32 h-32" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{scenario.name}</h2>
            <span className={cn(
               "px-2 py-0.5 rounded text-[11px] font-bold border",
               scenario.maturityLevel?.includes('L5') ? "bg-amber-50 text-amber-700 border-amber-200" :
               scenario.maturityLevel?.includes('L4') ? "bg-blue-50 text-blue-700 border-blue-200" :
               "bg-slate-50 text-slate-600 border-slate-200"
            )}>{scenario.maturityLevel}</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">场景复用与资产组合参考明细</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
        
        {/* Core Value */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 flex items-start gap-4">
           <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
           <div>
              <h3 className="text-sm font-bold text-indigo-900 mb-1">核心价值与业务场景</h3>
              <p className="text-sm text-indigo-700/80 leading-relaxed">{scenario.coreValue}</p>
           </div>
        </div>

        {/* 竞品分析 */}
        {(scenario.competitor || scenario.competitorPrice || scenario.ourPrice) && (
          <div className="border border-rose-100 bg-gradient-to-r from-rose-50/50 to-white rounded-xl p-5 flex flex-col gap-3">
             <div className="flex items-center gap-2">
               <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2 uppercase tracking-wide"><Activity className="w-4 h-4 text-rose-500" /> 竞对方案与商业对比</h3>
             </div>
             <div className="grid grid-cols-3 gap-6 mt-1">
               <div className="flex flex-col bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                 <span className="text-xs text-slate-400 mb-1 font-semibold uppercase">主力竞品</span>
                 <span className="text-base font-extrabold text-slate-800">{scenario.competitor || '-'}</span>
               </div>
               <div className="flex flex-col bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                 <span className="text-xs text-slate-400 mb-1 font-semibold uppercase">竞品报价</span>
                 <span className="text-base font-extrabold text-rose-600 line-through decoration-rose-300">{scenario.competitorPrice || '-'}</span>
               </div>
               <div className="flex flex-col bg-white border border-slate-100 p-3 rounded-lg shadow-[0_0_10px_rgba(20,184,166,0.1)] border-teal-100">
                 <span className="text-xs text-teal-600/70 mb-1 font-semibold uppercase">我司成交标品价</span>
                 <span className="text-base font-extrabold text-teal-600">{scenario.ourPrice || '-'}</span>
               </div>
             </div>
          </div>
        )}

        {/* Assets & Fields */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-800">依赖数据资产与核心字段</h3>
          </div>
          <div className="space-y-4">
             {scenario.assets?.map((asset: any, i: number) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                   <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                      <span className="font-bold text-sm text-slate-800">{asset.name}</span>
                      <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 uppercase tracking-wider">
                        核心数据表
                      </span>
                   </div>
                   
                   <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-teal-50/30 to-white">
                      <h4 className="text-xs font-bold text-teal-800 mb-1.5 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-teal-500"/> 核心壁垒与竞品对比</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        该资产兼具极高的时效性与立体覆盖维度。相比外部竞品通常的 T+7 延迟，本项目实现了 <strong className="text-teal-700 font-semibold">T+1 级别高频更新</strong>，长尾下沉商圈覆盖率高出20%。独家沉淀的衍生评价与风控探针标签，构成支撑场景精准决策的关键数据护城河。
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                     <div className="p-4">
                       <h4 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">包含的核心字段</h4>
                       <div className="flex flex-col gap-1.5">
                          {['id', 'created_at', 'status', 'poi_name', 'address_detail', 'lng_lat', 'grid_code', 'risk_score', 'confidence'].slice(0, 4 + (i % 4)).map((field, j) => (
                             <div key={j} className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 transition-colors">
                                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">string</span>
                                <span className="text-xs font-semibold text-slate-700">{field}</span>
                             </div>
                          ))}
                       </div>
                     </div>
                     <div className="p-4 bg-slate-50/50">
                       <h4 className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-1.5"><FileJson className="w-3.5 h-3.5 text-slate-400"/> 线上真实样例抽样</h4>
                       <div className="bg-[#0D1117] rounded-lg p-3.5 overflow-x-auto border border-slate-800 shadow-inner h-full">
                          <pre className="text-[11px] text-slate-300 font-mono leading-relaxed">
{`{
  "id": "A10${i}x${i*3}99",
  "poi_name": "核心商圈综合体(东门)",
  "lng_lat": "113.943,22.548",
  "grid_code": "grid_lvl4_019",
  "status": "ACTIVE",
  "risk_score": 0.${i + 3}5,
  "confidence": 0.9${i + 1}
}`}
                          </pre>
                       </div>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* API Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-800">服务编排与API组合</h3>
          </div>
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 space-y-4">
             <div className="flex flex-col gap-4">
               {[1, 2].map((step) => (
                 <div key={step} className="flex items-start gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm relative group hover:border-blue-300 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {step}
                    </div>
                    {step === 1 && <div className="absolute left-[27px] top-11 bottom-[-24px] border-l-2 border-dashed border-slate-200 group-hover:border-blue-200 transition-colors"></div>}
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-2">
                         <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            {step === 1 ? '基础数据获取与校验' : '业务逻辑融合计算'}
                            <span className="text-[10px] font-mono text-slate-400 font-normal">
                              {step === 1 ? '/api/v2/verify' : '/api/v2/compute'}
                            </span>
                         </h4>
                         <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">POST</span>
                       </div>
                       <p className="text-xs text-slate-500 mb-4 leading-relaxed max-w-[90%]">
                         {step === 1 ? '调用标准化接口，获取基础网格与AOI信息，执行参数合规校验。' : '基于获取的基础特征，融合实时业务流进行置信度计算。'}
                       </p>
                       <div className="bg-[#0D1117] rounded-md p-4 overflow-x-auto border border-slate-800">
                          <pre className="text-[11px] text-slate-300 font-mono leading-relaxed flex gap-3">
                             <div className="flex flex-col text-slate-600 select-none">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                             </div>
                             <div>
                               {step === 1 
                                 ? '{\n  "payload": { "address": "...", "client_id": "sys_crm" },\n  "require_cert": true\n}' 
                                 : '{\n  "match_mode": "strict",\n  "use_cache": true,\n  "stream_response": false\n}'}
                             </div>
                          </pre>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Compliance Guidelines */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-800">合规使用指引</h3>
          </div>
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-lg p-5">
             <div className="flex items-center justify-between mb-5 pb-5 border-b border-amber-200/50">
                <div className="flex items-center gap-2.5">
                   <div className={cn(
                     "w-2.5 h-2.5 rounded-full shadow-sm",
                     scenario.complianceStatus?.includes('🟢') ? 'bg-emerald-500' :
                     scenario.complianceStatus?.includes('🟡') ? 'bg-amber-500' : 'bg-red-500'
                   )}></div>
                   <span className="text-sm font-bold text-slate-800">合规状态：{scenario.complianceStatus}</span>
                </div>
                <button className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded transition-colors uppercase tracking-wider">
                  申请豁免 / 审批
                </button>
             </div>
             
             <ul className="space-y-4 text-[13px] text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                   <span className="leading-relaxed">该场景涉及的地理位置和业务画像数据，<strong className="text-amber-900 border-b border-amber-200">必须在公司内网环境下调用</strong>，严禁向外网暴露直连接口。</span>
                </li>
                <li className="flex items-start gap-3">
                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                   <span className="leading-relaxed">如有外部商业化诉求，必须接入统一的<strong className="text-amber-900 border-b border-amber-200">脱敏API网关</strong>，确保隐私字段（如明文手机号、高精度坐标）已被清洗。</span>
                </li>
                <li className="flex items-start gap-3">
                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                   <span className="leading-relaxed">研发环节如果需要使用真实数据验证，请提前提交「数安办」申请《临时数据使用许可》。</span>
                </li>
             </ul>
          </div>
        </div>
        
      </div>

      <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
         <div className="text-xs text-slate-500 font-medium">
           最后维护者: <span className="font-bold text-slate-700">{scenario.owner}</span> <span className="mx-2 text-slate-300">|</span> 更新于 {scenario.recentUpdate}
         </div>
         <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
            <Copy className="w-4 h-4" />
            一键复用场景架构
         </button>
      </div>
    </div>
  );
}
