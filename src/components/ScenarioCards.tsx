import React from 'react';
import { cn } from '@/lib/utils';
import { Activity, ArrowRight, CheckCircle2, ChevronRight, Puzzle, Plus, Edit2, Database, Workflow } from 'lucide-react';

export interface Scenario {
  id: string;
  name: string;
  category: string;
  bg: string;
  status: '运营中' | '开发中' | '规划中';
  coreValue: string;
  coreMoat?: string;
  metrics: { label: string; value: string }[];
  assets: { name: string; level: string; type?: string }[];
  capabilities?: string[];
  complianceStatus?: '🟢 全合规' | '🟡 部分受限' | '🔴 存在禁止';
  
  maturityLevel: string;
  businessValue: string;
  coverageDetailed?: { label: string; value: string }[];
  healthScore: number;
  healthStatus: '健康' | '风险' | '异常';
  reusability?: string[];
  owner?: string;
  recentUpdate?: string;
  competitor?: string;
  competitorPrice?: string;
  ourPrice?: string;
}

const mockScenarios: Scenario[] = [
  {
    id: 's-1',
    name: '路由分单',
    category: '物流场景（核心）',
    bg: 'B1-顺丰物流',
    status: '运营中',
    coreValue: '解决末端配送中因地址模糊导致的派送异常与人工分拣成本过高问题，实现自动准确分单。',
    coreMoat: '依托十亿级真实运单数据反馈库，结合独有的小区级精细化路网关联算法。',
    metrics: [
      { label: '日均调用', value: '1000万+' },
      { label: '解析准确率', value: '99%' },
    ],
    assets: [
      { name: '地址库', level: '' },
      { name: 'AOI库', level: '' },
      { name: '路网库', level: '' },
    ],
    capabilities: ['地址解析', '语义匹配', '实时分单'],
    complianceStatus: '🟢 全合规',

    maturityLevel: 'L5产品化',
    businessValue: '年降本2300万',
    coverageDetailed: [
      { label: '覆盖城市', value: '340' },
      { label: '服务客户', value: '120' },
    ],
    healthScore: 92,
    healthStatus: '健康',
    reusability: ['物流', '外卖', '即配'],
    owner: '数据产品处',
    recentUpdate: '2026-06-01',
    competitor: '百度地图API',
    competitorPrice: '0.012元/次',
    ourPrice: '0.008元/次'
  },
  {
    id: 's-2',
    name: '城管环卫',
    category: '城市治理',
    bg: 'G2-城市运营',
    status: '运营中',
    coreValue: '解决城市环卫运营中基础台账不清、计费面积漏报的问题，实现精准计收。',
    coreMoat: '基于全量高频更新的底层楼盘字典体系与多源时空数据的跨模态校验闭环。',
    metrics: [
      { label: '底数准确率', value: '96%' },
      { label: '数据鲜活度', value: 'T+1' },
    ],
    assets: [
      { name: '楼盘字典', level: '' },
      { name: '位置大数据', level: '' },
      { name: '城运API', level: '' },
    ],
    capabilities: ['空间检索', '对象识别', '底数清查'],
    complianceStatus: '🟢 全合规',

    maturityLevel: 'L4全国运行',
    businessValue: '年增收1800万',
    coverageDetailed: [
      { label: '覆盖城市', value: '120' },
      { label: '覆盖车辆', value: '3.8万' },
    ],
    healthScore: 88,
    healthStatus: '健康',
    reusability: ['城运', '环保', '政务'],
    owner: '智慧城服业务部',
    recentUpdate: '2026-05-20',
    competitor: '高德政企版',
    competitorPrice: '80万/年',
    ourPrice: '50万/年'
  },
  {
    id: 's-3',
    name: '企业风控',
    category: '经营场景',
    bg: 'B2-对外企服',
    status: '运营中',
    coreValue: '解决中小物流企业因缺乏传统信贷记录而导致的融资难和银行金融系统坏账高的问题。',
    coreMoat: '深耕物流供应链行业多年的运力交易行为特征库以及高维度的商流信用图谱算子。',
    metrics: [
      { label: '坏账降低率', value: '18%' },
      { label: '欺诈拦截', value: '1.2亿' },
    ],
    assets: [
      { name: '企业画像特征', level: '' },
      { name: '高危监控流水', level: '' },
    ],
    capabilities: ['信用画像', '特征工程', '业务分析'],
    complianceStatus: '🟡 部分受限',

    maturityLevel: 'L3区域推广',
    businessValue: '保护金额15亿',
    coverageDetailed: [
      { label: '付费客户', value: '18家' },
      { label: '日均查询', value: '500万次' },
    ],
    healthScore: 75,
    healthStatus: '风险',
    reusability: ['保险', '银行', '供应链'],
    owner: '金融风控处',
    recentUpdate: '2026-06-10',
    competitor: '企查查数据包',
    competitorPrice: '0.05元/次',
    ourPrice: '0.03元/次'
  },
  {
    id: 's-4',
    name: '智驾合规',
    category: '合规场景',
    bg: '通用/跨BG',
    status: '开发中',
    coreValue: '解决智能车企在数据采集、流转与云端训练过程中的数据高度敏感与合规审批难痛点。',
    coreMoat: '业内领先的高清地理脱敏流水线，并具备业内稀缺的高级别保密合规资质加持。',
    metrics: [
      { label: '合规通过率', value: '100%' },
      { label: '并发脱敏', value: '5万条/秒' },
    ],
    assets: [
      { name: '测绘合规服务', level: '' },
      { name: '隐私脱敏API', level: '' },
    ],
    capabilities: ['人脸抹除', '车牌模糊', '合规分发'],
    complianceStatus: '🔴 存在禁止',

    maturityLevel: 'L2试点验证',
    businessValue: '预期创收500万',
    coverageDetailed: [
      { label: '合作车企', value: '4家' },
      { label: '测绘路段', value: '1.2万公里' },
    ],
    healthScore: 60,
    healthStatus: '异常',
    reusability: ['车企', 'Tier1', '图商'],
    owner: '智驾数安部',
    recentUpdate: '2026-06-12',
    competitor: '四维图新合规云',
    competitorPrice: '150万/年',
    ourPrice: '120万/年'
  },
  {
    id: 's-5',
    name: '选址参谋',
    category: '增值场景',
    bg: '通用/跨BG',
    status: '运营中',
    coreValue: '解决品牌零售连锁店在开店选址时信息闭塞、过度依赖人工经验以及决策周期较长的问题。',
    coreMoat: '将海量实时的大包裹物流客流模型与丰富的基础设施POI体系相耦合。',
    metrics: [
      { label: '分析维度', value: '120+' },
      { label: '报告响应', value: '秒级' },
    ],
    assets: [
      { name: '商业网点专题', level: '' },
      { name: '时空客流模型', level: '' },
    ],
    capabilities: ['区域洞察', '客流预测', '商业分析'],
    complianceStatus: '🟡 部分受限',

    maturityLevel: 'L5产品化',
    businessValue: '年增收1200万',
    coverageDetailed: [
      { label: '活跃客户', value: '35家' },
      { label: '历史分析', value: '1.2万次' },
    ],
    healthScore: 95,
    healthStatus: '健康',
    reusability: ['零售', '餐饮', '广告'],
    owner: '位置智能业务部',
    recentUpdate: '2026-05-28',
    competitor: '极光大数据',
    competitorPrice: '8,000元/份',
    ourPrice: '5,000元/份'
  }
];

export function ScenarioCards({ 
  activeSecondary, 
  selectedTags,
  onComplianceClick,
  onAddScenario,
  onEditScenario,
  onViewScenario
}: { 
  activeSecondary: string; 
  selectedTags?: import('./FilterPanel').SelectedTags;
  onComplianceClick?: () => void;
  onAddScenario?: () => void;
  onEditScenario?: (scenario: Scenario, e: React.MouseEvent) => void;
  onViewScenario?: (scenario: Scenario) => void;
}) {
  // Filter by category
  const filteredScenarios = mockScenarios.filter(s => {
    let matchCat = true;
    if (activeSecondary && activeSecondary !== '全部场景') {
      // Clicked on a Parent Category
      if (['物流场景（核心）', '经营场景', '增值场景', '城市治理', '合规场景'].includes(activeSecondary)) {
        matchCat = s.category === activeSecondary;
      } else {
        // Clicked on a specific Child
        matchCat = s.name === activeSecondary;
      }
    }
    
    if (!matchCat) return false;

    // Filter by tags
    if (selectedTags) {
      const bgTags = selectedTags.bg || [];
      const categoryTags = selectedTags.category || [];
      const goalTags = selectedTags.goal || [];
      const capabilityTags = selectedTags.capability || [];
      const statusTags = selectedTags.status || [];

      if (bgTags.length === 0 && categoryTags.length === 0 && goalTags.length === 0 && capabilityTags.length === 0 && statusTags.length === 0) return true;

      const scenarioText = [
        s.name,
        s.category,
        s.bg,
        s.coreValue,
        s.status,
        ...(s.capabilities || []),
        ...s.assets.map(a => a.name)
      ].join(' ').toLowerCase();

      // Helper for fuzzy match
      const isMatch = (tag: string) => {
        const lowerTag = tag.toLowerCase();
        if (scenarioText.includes(lowerTag)) return true;
        
        // special bg prefix matches
        const prefixes = ['b1', 'b2', 'g1', 'g2'];
        for (const p of prefixes) {
          if (lowerTag.includes(p) && scenarioText.includes(p)) return true;
        }
        return false;
      };

      if (bgTags.length > 0 && !bgTags.some(a => s.bg.toLowerCase().includes(a.toLowerCase()) || isMatch(a))) return false;
      if (categoryTags.length > 0 && !categoryTags.some(isMatch)) return false;
      if (goalTags.length > 0 && !goalTags.some(isMatch)) return false;
      if (capabilityTags.length > 0 && !capabilityTags.some(isMatch)) return false;
      if (statusTags.length > 0 && !statusTags.some(isMatch)) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-12 pt-0 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-slate-50/80 backdrop-blur pb-2 z-10 pt-2">
         <h2 className="text-sm font-semibold text-slate-500">
           为您推荐了 <span className="font-bold text-slate-800">{filteredScenarios.length}</span> 个场景
         </h2>
         <button 
           onClick={onAddScenario}
           className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-colors shadow-sm"
         >
           <Plus className="w-3.5 h-3.5" />
           新增业务场景
         </button>
      </div>

      {filteredScenarios.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-32 text-slate-400">
           <Puzzle className="w-16 h-16 text-slate-200 mb-4" />
           <p className="text-sm">该场景目录下暂无收录案例</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
          {filteredScenarios.map(scenario => (
             <div 
               key={scenario.id} 
               onClick={() => onViewScenario?.(scenario)}
               className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-0.5 transition-all duration-300 p-0 flex flex-col overflow-hidden group cursor-pointer"
             >
               
               {/* Head Section */}
               <div className="px-6 py-6 border-b border-slate-100 bg-white relative">
                 <button 
                   onClick={(e) => onEditScenario?.(scenario, e)}
                   className="absolute top-5 right-5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                   title="维护场景信息"
                 >
                   <Edit2 className="w-4 h-4" />
                 </button>
                 <div className="flex items-start justify-between mb-2 pr-8 w-full">
                    <div className="w-full relative">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{scenario.name}</h3>
                        <div className="flex items-center gap-2">
                           <span className={cn(
                              "px-2.5 py-0.5 rounded text-[11px] font-bold border",
                              scenario.maturityLevel.includes('L5') ? "bg-amber-50 text-amber-700 border-amber-200" :
                              scenario.maturityLevel.includes('L4') ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-slate-50 text-slate-600 border-slate-200"
                           )}>{scenario.maturityLevel}</span>
                           <span className={cn(
                             "text-[10px] uppercase font-bold px-2.5 py-0.5 rounded flex items-center gap-1",
                             scenario.status === '运营中' ? 'bg-emerald-500 text-white' : 
                             scenario.status === '开发中' ? 'bg-indigo-500 text-white' :
                             'bg-slate-400 text-white'
                           )}>
                             {scenario.status}
                           </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col w-full rounded-xl overflow-hidden border border-slate-100">
                        <div className="flex items-start gap-4 bg-slate-50 p-4">
                           <span className="text-[12px] font-extrabold text-slate-700 whitespace-nowrap shrink-0 mt-px tracking-widest">业务价值</span>
                           <p className="text-[13px] text-slate-600 font-medium leading-relaxed m-0 flex-1">
                             {scenario.coreValue}
                           </p>
                        </div>
                        {scenario.coreMoat && (
                          <div className="flex items-start gap-4 bg-amber-50/40 p-4 border-t border-amber-100/40">
                             <span className="text-[12px] font-extrabold text-amber-700/80 whitespace-nowrap shrink-0 mt-px tracking-widest">核心壁垒</span>
                             <p className="text-[13px] text-amber-900/70 font-medium leading-relaxed m-0 flex-1">
                               {scenario.coreMoat}
                             </p>
                          </div>
                        )}
                      </div>
                    </div>
                 </div>
                 
                 {/* 竞对分析 */}
                 {(scenario.competitor || scenario.competitorPrice || scenario.ourPrice) && (
                   <div className="mt-4 border border-rose-100 bg-gradient-to-r from-rose-50/50 to-white rounded-xl p-4 flex flex-col gap-2">
                     <div className="flex items-center justify-between">
                       <span className="text-[11px] font-extrabold text-rose-600/80 uppercase tracking-widest flex items-center gap-1.5">
                         <Activity className="w-3.5 h-3.5" /> 竞对方案对比
                       </span>
                     </div>
                     <div className="grid grid-cols-3 gap-4 mt-1">
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 mb-0.5">主力竞品</span>
                         <span className="text-sm font-bold text-slate-800">{scenario.competitor || '-'}</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 mb-0.5">竞品报价</span>
                         <span className="text-sm font-bold text-rose-600 line-through decoration-rose-300">{scenario.competitorPrice || '-'}</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 mb-0.5">我司成交价</span>
                         <span className="text-sm font-bold text-teal-600">{scenario.ourPrice || '-'}</span>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* 四行指标区（CTO视角） */}
                 <div className="mt-4 bg-slate-50/50 border border-slate-100 rounded-xl p-5">
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                     {[...(scenario.coverageDetailed || []), ...scenario.metrics].map((item, i) => (
                       <div key={i} className="flex flex-col relative px-2">
                         {i !== 0 && i !== 2 && <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-200 hidden lg:block" />}
                         {i === 1 && <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-200 block lg:hidden" />}
                         {i === 3 && <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-200 block lg:hidden" />}
                         <span className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">{item.label}</span>
                         <span className="text-[20px] font-extrabold text-slate-800 tracking-tight">{item.value}</span>
                       </div>
                     ))}
                   </div>
                   <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                         <span className="text-[11px] font-extrabold text-teal-700/80 uppercase tracking-widest">价值贡献</span>
                         <span className="text-[15px] font-extrabold text-teal-600 tracking-tight">{scenario.businessValue}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                           健康度
                           <span className={cn(
                            "w-2 h-2 rounded-full",
                            scenario.healthStatus === '健康' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                            scenario.healthStatus === '风险' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 
                            'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                           )}></span>
                         </span>
                         <span className="text-[15px] font-extrabold text-slate-800 tracking-tight">{scenario.healthScore}</span>
                      </div>
                   </div>
                 </div>
               </div>
               
               {/* Body */}
               <div className="p-6 flex-1 flex flex-col gap-6 bg-slate-50/40 border-t border-slate-100/50">
                 <div className="flex items-start gap-4">
                   <div className="flex flex-col items-center gap-1.5 pt-0.5 shrink-0">
                     <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-500 shadow-sm">
                       <Database className="w-3.5 h-3.5" />
                     </div>
                     {scenario.capabilities && scenario.capabilities.length > 0 && (
                       <>
                         <div className="w-px h-6 bg-slate-200/60"></div>
                         <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100/60 flex items-center justify-center text-blue-500 shadow-sm">
                           <Workflow className="w-3.5 h-3.5" />
                         </div>
                       </>
                     )}
                   </div>

                   <div className="flex flex-col gap-6 flex-1 pt-0.5">
                     <div>
                       <h4 className="text-[11px] font-extrabold text-slate-500 mb-2.5 uppercase tracking-widest">资产底座</h4>
                       <div className="flex flex-wrap gap-2">
                         {scenario.assets.map((asset, i) => (
                           <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-[11px] font-bold text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)] group-hover:border-indigo-200 group-hover:text-indigo-800 transition-colors cursor-default">
                             <Database className="w-3 h-3 text-indigo-400" />
                             {asset.name}
                           </span>
                         ))}
                       </div>
                     </div>
                     
                     {scenario.capabilities && scenario.capabilities.length > 0 && (
                       <div className="pb-1">
                         <h4 className="text-[11px] font-extrabold text-slate-500 mb-2.5 uppercase tracking-widest">核心能力组件</h4>
                         <div className="flex flex-wrap gap-1.5">
                           {scenario.capabilities.map((tech, i) => (
                             <span key={i} className="inline-flex items-center px-2.5 py-1 bg-white border border-slate-200/80 rounded text-[10px] font-bold text-slate-500 group-hover:text-blue-700 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-colors cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                               {tech}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </div>

               {/* Footer */}
               <div className="bg-slate-50/50 px-6 py-3.5 flex items-center justify-between border-t border-slate-100 mt-auto text-[11px]">
                 <div className="flex gap-6">
                   <div className="flex flex-col">
                     <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Owner</span>
                     <span className="font-semibold text-slate-700">{scenario.owner}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">可复用行业</span>
                     <span className="font-semibold text-slate-700">{scenario.reusability?.join(' / ')}</span>
                   </div>
                 </div>
                 <div className="flex flex-col items-end gap-1.5">
                    <button 
                      onClick={(e) => {
                         e.stopPropagation();
                         onComplianceClick?.();
                      }}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      合规详情
                    </button>
                    <span className="text-[9px] text-slate-400 font-medium">更新于 {scenario.recentUpdate}</span>
                 </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
