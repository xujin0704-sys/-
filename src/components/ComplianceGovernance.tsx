import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, FileText, CheckCircle2, AlertCircle, Lock, Globe, Building, LayoutGrid, ListTodo, Download, Settings, ChevronRight, XCircle, FileSpreadsheet, KeyRound, CheckSquare, Shield, Activity, FileWarning, EyeOff, Scale, TrendingUp, Clock, Database } from 'lucide-react';
import { cn } from '../lib/utils';

// --- DATA MODELS & MOCKS ---

type ConfidentialityLevel = 'L4-绝密' | 'L3-机密' | 'L2-秘密' | 'L1-内部' | 'L0-公开';
type ProcessMethod = '原样输出' | '坐标降精度' | '数据脱敏' | '统计聚合' | '阻断不导出';

interface AssetField {
  id: string;
  assetName: string;
  category: string;
  fieldName: string;
  meaning: string;
  confLevel: ConfidentialityLevel;
  isRedline: boolean;
  redlineMsg?: string;
  basicExternal: string;
}

const mockAssets: AssetField[] = [
  { id: 'a1', assetName: '商用车轨迹库', category: '空间坐标', fieldName: '经纬度序列', meaning: '车辆高频行驶轨迹点', confLevel: 'L3-机密', isRedline: false, basicExternal: '禁止对外' },
  { id: 'a2', assetName: '运单基础信息', category: '个人隐私', fieldName: '收发件人电话', meaning: '真实联系方式', confLevel: 'L4-绝密', isRedline: true, redlineMsg: '含高危个人隐私，禁止明文', basicExternal: '禁止对外' },
  { id: 'a3', assetName: '运单基础信息', category: '个人隐私', fieldName: '详细住址', meaning: '门牌号与房号', confLevel: 'L4-绝密', isRedline: true, redlineMsg: '含高危个人隐私，禁止明文', basicExternal: '禁止对外' },
  { id: 'a4', assetName: '全国POI底库', category: '空间坐标', fieldName: 'POI精确坐标', meaning: '商铺/建筑高精坐标', confLevel: 'L3-机密', isRedline: false, basicExternal: '条件开放' },
  { id: 'a5', assetName: '全国POI底库', category: '数据标记', fieldName: '合规埋雷点', meaning: '防爬虫测试锚点', confLevel: 'L4-绝密', isRedline: true, redlineMsg: '涉保密工艺标识禁止泄露', basicExternal: '禁止对外' },
  { id: 'a6', assetName: '统一地址库', category: '基础属性', fieldName: '五级网格地址', meaning: '省市区街道社区', confLevel: 'L1-内部', isRedline: false, basicExternal: '商业授权可用' },
  { id: 'a7', assetName: '驾驶风险画像', category: '分析特征', fieldName: '急刹/超速特征', meaning: '驾驶行为模型评分', confLevel: 'L2-秘密', isRedline: false, basicExternal: '条件开放' },
];

interface ScenarioDraft {
  id: string;
  name: string;
  bg: string;
  customers: string;
  fields: { fieldId: string; process: ProcessMethod }[];
  status: '待审批' | '已打回' | '已特批' | '合规通行';
  submitTime: string;
}

const mockScenarios: ScenarioDraft[] = [
  {
    id: 's1',
    name: '动态核保风控分',
    bg: '保险科技事业部',
    customers: '平安保险、太平洋保险',
    status: '待审批',
    submitTime: '2小时前',
    fields: [
      { fieldId: 'a1', process: '坐标降精度' },
      { fieldId: 'a7', process: '原样输出' },
      { fieldId: 'a2', process: '数据脱敏' }
    ]
  },
  {
    id: 's2',
    name: '高速慧眼-路况分析',
    bg: '城市治理先锋组',
    customers: '多地交警大队',
    status: '合规通行',
    submitTime: '昨天',
    fields: [
      { fieldId: 'a1', process: '统计聚合' },
      { fieldId: 'a4', process: '坐标降精度' },
    ]
  },
  {
    id: 's3',
    name: '实时物流轨迹API',
    bg: '外部开放平台',
    customers: '通用SaaS服务商',
    status: '已打回',
    submitTime: '2天前',
    fields: [
      { fieldId: 'a1', process: '原样输出' },
      { fieldId: 'a2', process: '原样输出' },
      { fieldId: 'a5', process: '原样输出' }
    ]
  }
];

// --- EVALUATION LOGIC ---

function evaluateField(field: AssetField, process: ProcessMethod): { status: '🟢 安全' | '🟡 受限' | '🔴 阻断'; afterLevel: string; msg: string } {
  if (process === '阻断不导出') return { status: '🟢 安全', afterLevel: '无', msg: '不参与外发' };
  
  if (field.isRedline && process === '原样输出') {
    return { status: '🔴 阻断', afterLevel: field.confLevel, msg: `触发红线：${field.redlineMsg}` };
  }

  if (process === '原样输出') {
    if (field.confLevel === 'L4-绝密') return { status: '🔴 阻断', afterLevel: field.confLevel, msg: '绝密数据严禁原样输出' };
    if (field.confLevel === 'L3-机密') return { status: '🔴 阻断', afterLevel: field.confLevel, msg: '机密数据严禁原样输出' };
    if (field.confLevel === 'L2-秘密') return { status: '🟡 受限', afterLevel: field.confLevel, msg: '需提交高级法务审批' };
    return { status: '🟢 安全', afterLevel: field.confLevel, msg: '常规输出' };
  }

  if (process === '数据脱敏' || process === '统计聚合') {
    if (field.confLevel === 'L4-绝密' || field.confLevel === 'L3-机密') return { status: '🟡 受限', afterLevel: 'L2-秘密', msg: '降维至L2，需常规备案' };
    return { status: '🟢 安全', afterLevel: 'L1-内部', msg: '处理后合规' };
  }

  if (process === '坐标降精度') {
    if (field.category !== '空间坐标') return { status: '🟡 受限', afterLevel: field.confLevel, msg: '处理方式可能不当' };
    return { status: '🟢 安全', afterLevel: 'L1-内部', msg: '坐标脱敏满足基线' };
  }

  return { status: '🔴 阻断', afterLevel: field.confLevel, msg: '未知策略' };
}

// --- COMPONENT ---

export function ComplianceGovernance() {
  const [activeMenu, setActiveMenu] = useState<'overview' | 'approvals' | 'baselines' | 'assets'>('overview');
  const [selectedApproval, setSelectedApproval] = useState<ScenarioDraft | null>(null);

  // --- RENDERS ---

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-1">合规管控大盘</h2>
           <p className="text-sm text-slate-500">全域数据要素资产的合规分布、安全态势与阻断情况一览。</p>
        </div>
        <div className="flex bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm gap-6 text-sm">
           <div className="flex flex-col">
              <span className="text-slate-500 font-medium">数据安全卫士状态</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1.5 mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> 实时防护中</span>
           </div>
           <div className="w-px bg-slate-200"></div>
           <div className="flex flex-col">
              <span className="text-slate-500 font-medium">全局合规分</span>
              <span className="text-slate-800 font-black text-lg mt-0.5 tracking-tight">98.5</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
           <Shield className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10" />
           <div className="relative z-10">
             <div className="text-indigo-100 font-medium text-sm mb-1">敏感资产拦截总计</div>
             <div className="text-3xl font-black tracking-tight mb-2">4,592<span className="text-lg font-bold ml-1 text-indigo-200">次</span></div>
             <div className="text-xs text-indigo-100 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> 较上周 +12%</div>
           </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
           <div className="text-slate-500 font-medium text-sm flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-amber-500"/> 待处理审批</div>
           <div className="text-3xl font-black text-slate-800 mb-2">12<span className="text-base font-bold ml-1 text-slate-400">单</span></div>
           <div className="text-xs text-slate-500">含 3 个 L4级绝密特批</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
           <div className="text-slate-500 font-medium text-sm flex items-center gap-2 mb-2"><Lock className="w-4 h-4 text-rose-500"/> 高危触碰红线</div>
           <div className="text-3xl font-black text-slate-800 mb-2">3<span className="text-base font-bold ml-1 text-slate-400">次</span></div>
           <div className="text-xs text-slate-500 text-rose-600 font-medium">均已成功阻断并发送告警</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
           <div className="text-slate-500 font-medium text-sm flex items-center gap-2 mb-2"><EyeOff className="w-4 h-4 text-emerald-500"/> 已执行脱敏任务</div>
           <div className="text-3xl font-black text-slate-800 mb-2">1.2<span className="text-base font-bold ml-1 text-slate-400">亿行</span></div>
           <div className="text-xs text-slate-500">坐标降准与哈希脱敏</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">最新合规预警事件</h3>
          </div>
          <div className="p-0">
             <div className="divide-y divide-slate-100">
               {[
                 { title: '外部开放平台发现疑似爬虫行为', type: '异常访问', time: '10分钟前', level: 'high' },
                 { title: '物流轨迹API触发频率告警拦截', type: '频率超限', time: '1小时前', level: 'medium' },
                 { title: '保险业务组申请L3数据原样流出失败', type: '合规阻断', time: '昨天', level: 'medium' },
                 { title: '区域客流热力规则变更为需审批', type: '策略调整', time: '昨天', level: 'info' }
               ].map((event, i) => (
                 <div key={i} className="px-5 py-3 hover:bg-slate-50 flex items-center gap-4">
                   <div className={cn(
                     "w-2 h-2 rounded-full shrink-0", 
                     event.level === 'high' ? 'bg-rose-500' : event.level === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                   )}></div>
                   <div className="flex-1">
                     <h4 className="text-sm font-semibold text-slate-700">{event.title}</h4>
                     <p className="text-xs text-slate-500 mt-0.5">{event.type}</p>
                   </div>
                   <div className="text-xs text-slate-400 font-medium">{event.time}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">密级资产分布分布</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center gap-4">
             <div className="space-y-3">
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-600">L4-绝密</span><span className="text-slate-800">12项</span></div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500" style={{ width: '15%' }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-600">L3-机密</span><span className="text-slate-800">45项</span></div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{ width: '35%' }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-600">L2-秘密</span><span className="text-slate-800">188项</span></div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '65%' }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-600">L1-内部 / L0-公开</span><span className="text-slate-800">3,256项</span></div>
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '90%' }}></div></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div className="space-y-6 animate-in fade-in">
      {!selectedApproval ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">数据场景特批审批流</h2>
              <p className="text-sm text-slate-500 mt-1">业务方发起的包含受限字段或脱敏规则的数据流出申请审批台。</p>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1.5 text-sm font-semibold rounded bg-white border border-slate-200 text-slate-600 shadow-sm">仅看待审批</button>
            </div>
          </div>

          <div className="bg-white border text-center relative overflow-hidden border-indigo-100 rounded-xl p-6 mb-6 shadow-sm bg-indigo-50/30">
            <h2 className="text-lg font-bold text-indigo-800 mb-1 flex items-center justify-center gap-2"><Lock className="w-5 h-5"/> 安全审批要求</h2>
            <p className="text-indigo-600/80 text-sm">任何试图输出L3/L4级别字段或未正确配置脱敏策略的场景，必须由法务与安全BP共同签署白名单特批方可生效。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockScenarios.map(sc => (
              <div key={sc.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 text-lg">{sc.name}</h3>
                    <span className={cn(
                      "px-2 py-1 rounded text-[11px] font-bold border",
                      sc.status === '待审批' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      sc.status === '合规通行' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      sc.status === '已特批' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    )}>{sc.status}</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">申请方：<span className="font-medium">{sc.bg}</span></div>
                  <div className="text-sm text-slate-600 mb-1">下游客户：<span className="font-medium">{sc.customers}</span></div>
                  <div className="text-xs text-slate-400 mt-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 提交于 {sc.submitTime}</div>
                </div>
                <div className="px-5 py-3 bg-slate-50 rounded-b-xl flex justify-end">
                   <button 
                     onClick={() => setSelectedApproval(sc)}
                     className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                   >
                     查看详单核驳 <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
           <button onClick={() => setSelectedApproval(null)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> 返回审批列表
          </button>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedApproval.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div>申请方：<span className="font-semibold text-slate-800">{selectedApproval.bg}</span></div>
                    <div>受众：<span className="font-semibold text-slate-800">{selectedApproval.customers}</span></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">当前状态</div>
                  <span className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-bold border inline-block",
                      selectedApproval.status === '待审批' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      selectedApproval.status === '合规通行' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      selectedApproval.status === '已特批' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    )}>{selectedApproval.status}</span>
                </div>
             </div>

             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-600" /> 申请使用的底层字段及加工工艺</h3>
             
             <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 border-b border-slate-200">
                   <tr>
                     <th className="px-4 py-3 font-semibold text-slate-600">字段</th>
                     <th className="px-4 py-3 font-semibold text-slate-600">密级基线</th>
                     <th className="px-4 py-3 font-semibold text-slate-600">申请加工方式</th>
                     <th className="px-4 py-3 font-semibold text-slate-600">系统初判结论</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {selectedApproval.fields.map((f, i) => {
                     const asset = mockAssets.find(a => a.id === f.fieldId)!;
                     const ev = evaluateField(asset, f.process);
                     return (
                       <tr key={i} className="bg-white">
                         <td className="px-4 py-4">
                           <div className="font-bold text-slate-800">{asset.fieldName}</div>
                           <div className="text-xs text-slate-500">{asset.assetName}</div>
                         </td>
                         <td className="px-4 py-4">
                           <span className={cn(
                            "px-2 py-0.5 rounded text-[11px] font-bold border",
                            asset.confLevel.includes('L4') ? 'bg-rose-50 text-rose-600 border-rose-200' :
                            asset.confLevel.includes('L3') ? 'bg-orange-50 text-orange-600 border-orange-200' :
                            'bg-slate-100 text-slate-600 border-slate-200'
                          )}>{asset.confLevel}</span>
                         </td>
                         <td className="px-4 py-4 font-mono text-indigo-700 bg-indigo-50/30">{f.process}</td>
                         <td className="px-4 py-4">
                           <div className={cn(
                             "text-[13px] font-bold mb-1 flex items-center gap-1.5",
                             ev.status === '🔴 阻断' ? 'text-rose-600' : ev.status === '🟡 受限' ? 'text-amber-600' : 'text-emerald-600'
                           )}>
                             {ev.status}
                           </div>
                           <div className="text-[11px] text-slate-500">{ev.msg}</div>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>

             {selectedApproval.status === '待审批' && (
               <div className="flex items-center justify-end gap-3 mt-8 border-t border-slate-100 pt-6">
                 <button className="px-6 py-2.5 rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 font-bold text-sm transition-colors">
                   驳回申请 (阻断)
                 </button>
                 <button className="px-6 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 font-bold text-sm transition-colors shadow-sm">
                   同意特批白名单
                 </button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );

  const renderBaselines = () => (
    <div className="space-y-6 animate-in fade-in">
       <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">管控基线与脱敏策略</h2>
            <p className="text-sm text-slate-500 mt-1">基于安全委员会定义的全局密级互斥与加工规则引擎。</p>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
         <div className="p-5 border-b border-slate-100 bg-slate-50"><h3 className="font-bold text-slate-800">密级降维与输出策略阵列</h3></div>
         <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100/50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="px-5 py-4 w-40">原始密级</th>
                <th className="px-5 py-4">原样输出</th>
                <th className="px-5 py-4">坐标降精度</th>
                <th className="px-5 py-4">哈希脱敏</th>
                <th className="px-5 py-4">统计聚合</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-5 py-4 font-bold text-rose-600 border-r border-slate-100">L4-绝密</td>
                <td className="px-5 py-4"><span className="text-rose-600 font-semibold flex items-center gap-1"><XCircle className="w-4 h-4"/> 阻断出域</span></td>
                <td className="px-5 py-4"><span className="text-amber-600 font-semibold flex items-center gap-1">需特批 (降为L2)</span></td>
                <td className="px-5 py-4"><span className="text-amber-600 font-semibold flex items-center gap-1">需特批 (降为L2)</span></td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规 (降为L1)</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-5 py-4 font-bold text-orange-600 border-r border-slate-100">L3-机密</td>
                <td className="px-5 py-4"><span className="text-rose-600 font-semibold flex items-center gap-1"><XCircle className="w-4 h-4"/> 阻断出域</span></td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规 (降为L1)</span></td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规 (降为L2)</span></td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规 (降为L1)</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-5 py-4 font-bold text-amber-600 border-r border-slate-100">L2-秘密</td>
                <td className="px-5 py-4"><span className="text-amber-600 font-semibold flex items-center gap-1">需备案审查</span></td>
                <td className="px-5 py-4 text-slate-400 font-mono">-</td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规放行</span></td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 合规放行</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-5 py-4 font-bold text-emerald-600 border-r border-slate-100">L1/L0级</td>
                <td className="px-5 py-4"><span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 全部合规放行</span></td>
                <td className="px-5 py-4 text-slate-400 font-mono">-</td>
                <td className="px-5 py-4 text-slate-400 font-mono">-</td>
                <td className="px-5 py-4 text-slate-400 font-mono">-</td>
              </tr>
            </tbody>
          </table>
         </div>
       </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileWarning className="w-5 h-5 text-rose-500" /> 特殊红线干预</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">独立于上述密级矩阵外，一旦字段标记为<strong>「特殊红线属性」</strong>（如带隐形水密码标识、国家禁运地理区域掩码等），则凌驾于全部常规策略之上。即便是脱敏输出，同样触发 API 网关强阻断。</p>
          <div className="bg-rose-50 text-rose-700 p-4 rounded-lg text-sm border border-rose-100 font-semibold">
            目前全域共有 427 个核心表字段被附加红线属性。
          </div>
       </div>
    </div>
  );

  const renderAssetLedger = () => (
    <div className="space-y-6 animate-in fade-in">
       <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">敏感资产合规台账</h2>
            <p className="text-sm text-slate-500 mt-1">追溯与核验各数据资产在合规视角下的定级源头。</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="搜索资产或字段名..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64" />
            </div>
            <button className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 flex items-center gap-2">
              <Download className="w-4 h-4"/> 导出台账
            </button>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[13px]">
              <th className="px-5 py-4">数据分类</th>
              <th className="px-5 py-4">归属底表模型</th>
              <th className="px-5 py-4">原子字段</th>
              <th className="px-5 py-4">原始定级</th>
              <th className="px-5 py-4">红线约束</th>
              <th className="px-5 py-4">默认开放要求</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockAssets.map((a, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-slate-500 font-medium">{a.category}</td>
                <td className="px-5 py-4 font-bold text-slate-700">{a.assetName}</td>
                <td className="px-5 py-4 font-mono text-indigo-700 font-semibold bg-indigo-50/20">{a.fieldName}</td>
                <td className="px-5 py-4">
                   <span className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-bold border whitespace-nowrap",
                    a.confLevel.includes('L4') ? 'bg-rose-50 text-rose-600 border-rose-200' :
                    a.confLevel.includes('L3') ? 'bg-orange-50 text-orange-600 border-orange-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  )}>{a.confLevel}</span>
                </td>
                <td className="px-5 py-4">
                  {a.isRedline ? <span className="text-rose-600 text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/> 含红线</span> : <span className="text-slate-300 text-xs">无</span>}
                </td>
                <td className="px-5 py-4 text-[13px] text-slate-600">{a.basicExternal}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    </div>
  );

  return (
    <div className="h-full flex bg-slate-50">
      {/* Vertical Sidebar */}
      <div className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col pt-6 pb-6 h-full ml-0">
         <div className="px-6 mb-6">
           <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
             <Scale className="w-5 h-5 text-indigo-600" /> 合规与控制塔
           </h2>
         </div>
         <nav className="flex-1 flex flex-col gap-1 px-3">
           <button 
             onClick={() => { setActiveMenu('overview'); setSelectedApproval(null); }}
             className={cn("w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2.5", activeMenu === 'overview' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50")}
           >
             <LayoutGrid className="w-4 h-4 opacity-70" /> 概览与风险大盘
           </button>
           <button 
             onClick={() => { setActiveMenu('approvals'); setSelectedApproval(null); }}
             className={cn("w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2.5", activeMenu === 'approvals' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50")}
           >
             <ShieldCheck className="w-4 h-4 opacity-70" /> 场景特批与审核
             {mockScenarios.some(s => s.status === '待审批') && <span className="ml-auto w-1.5 h-1.5 bg-rose-500 rounded-full"></span>}
           </button>
           <button 
             onClick={() => { setActiveMenu('baselines'); setSelectedApproval(null); }}
             className={cn("w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2.5", activeMenu === 'baselines' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50")}
           >
             <Settings className="w-4 h-4 opacity-70" /> 脱敏与管控基线
           </button>
           <button 
             onClick={() => { setActiveMenu('assets'); setSelectedApproval(null); }}
             className={cn("w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2.5", activeMenu === 'assets' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50")}
           >
             <FileSpreadsheet className="w-4 h-4 opacity-70" /> 敏感资产合规台账
           </button>
         </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 max-w-[1400px] mx-auto w-full">
         {activeMenu === 'overview' && renderOverview()}
         {activeMenu === 'approvals' && renderApprovals()}
         {activeMenu === 'baselines' && renderBaselines()}
         {activeMenu === 'assets' && renderAssetLedger()}
      </div>
    </div>
  );
}
