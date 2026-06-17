import { DataAsset } from '@/lib/types';
import { X, Database, ShieldCheck, Activity, Box, Sparkles, FileJson, BarChart3, Fingerprint, History, TableProperties } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockTaxonomy } from '@/lib/mockData';

export function AssetDetailDrawer({ 
  asset, 
  onClose 
}: { 
  asset: DataAsset | null, 
  onClose: () => void 
}) {
  if (!asset) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      <div 
        className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[101] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 pointer-events-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-slate-100 bg-slate-50 p-6 pb-5">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
              查询/使用
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
              <Database className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-xl font-bold text-slate-800">{asset.name}</h2>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-bold shrink-0",
                   asset.assetLevel === 'S核心' ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"
                )}>{asset.assetLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>{asset.id}</span>
                <span className="text-slate-300">|</span>
                <span>所属目录: {asset.catalog || '未分类'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Part 1: 资产元数据 */}
          <section>
            <h3 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-indigo-500" /> 资产元数据
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <div className="text-xs text-slate-400 mb-1">资产编号 (ID)</div>
                <div className="font-mono text-slate-700 font-medium">{asset.id}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">健康度</div>
                <div className="font-medium text-emerald-600 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> {asset.healthScore}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">所有者 (Owner)</div>
                <div className="font-medium text-slate-700">{asset.owner}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">更新频率</div>
                <div className="font-medium text-slate-700">{asset.updateFrequency}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">安全等级</div>
                <div className="font-medium text-slate-700">{asset.securityLevel}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">分类目录</div>
                <div className="font-medium text-slate-700">{asset.catalog || '未分类'}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-slate-400 mb-2">资产描述</div>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                {asset.description}
              </p>
            </div>
          </section>

          {/* Part 2: 资产详情 */}
          <section>
            <h3 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" /> 资产详情
            </h3>
            
            {/* AI 业务价值总结 */}
            <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 border border-indigo-200/60 p-4 shadow-sm">
              <div className="absolute top-0 right-0 p-3 opacity-[0.03]">
                 <Box className="w-24 h-24 text-indigo-900" />
              </div>
              <h4 className="text-xs font-bold text-indigo-800 mb-2 flex items-center gap-1.5 uppercase tracking-wider relative z-10">
                <Sparkles className="w-4 h-4 text-indigo-500" /> AI 资产价值挖掘
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed relative z-10">
                结合资产的 <strong className="font-semibold text-indigo-700 mx-0.5">「{asset.tags.business.join('、')}」</strong> 业务场景标签，以及底层支持的 <strong className="font-semibold text-indigo-700 mx-0.5">「{asset.tags.capability.join('、')}」</strong> 技术能力特征，系统判定该资产兼具高业务壁垒与时效性优势。它能有效赋能下游相关应用，提升决策精度与合规流转效率，推荐作为核心依赖项接入。
              </p>
            </div>

            {/* 1. 资产标签 */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                 资产标签
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-16 flex-shrink-0 text-xs text-slate-400 py-1">业务属性</div>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {asset.tags.business.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 flex-shrink-0 text-xs text-slate-400 py-1">数据属性</div>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {asset.tags.data.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 flex-shrink-0 text-xs text-slate-400 py-1">能力与合规</div>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {asset.tags.capability.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 关联业务场景 */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                📊 被以下场景使用
              </h4>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] font-semibold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors">路由分单 <span className="text-slate-500 font-normal">（核心业务）</span></span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">🟢 全合规</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] font-semibold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors">动态核保风控 <span className="text-slate-500 font-normal">（保险科技）</span></span>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">🟡 需脱敏</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] font-medium text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors">运营商营销 <span className="text-slate-400 font-normal">（企服规划）</span></span>
                      <span className="text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded">🔴 禁止</span>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 w-full text-left flex items-center gap-1">
                    点击场景查看业务详情 <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. 核心数据指标 */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" /> 核心数据指标
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                   <div className="text-[10px] text-slate-400 mb-1">日均调用量</div>
                   <div className="text-lg font-bold text-slate-800">124.5万次</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                   <div className="text-[10px] text-slate-400 mb-1">下游依赖业务</div>
                   <div className="text-lg font-bold text-slate-800">14 个</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                   <div className="text-[10px] text-slate-400 mb-1">平均响应时长</div>
                   <div className="text-lg font-bold text-slate-800">45 ms</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                   <div className="text-[10px] text-slate-400 mb-1">总数据量</div>
                   <div className="text-lg font-bold text-slate-800">{asset.dataVolume || '1.2 亿条'}</div>
                </div>
              </div>
            </div>

            {/* 3. 资产样例 */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <TableProperties className="w-3.5 h-3.5" /> 资产样例
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 text-xs">字段名称</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-600 w-1/4 text-xs">类型</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-600 w-auto text-xs">示例值</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">id</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">"{asset.id}"</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">name</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">"{asset.name}"</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">coordinates</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">array&lt;number&gt;</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">[114.053879, 22.538353]</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">updateTimestamp</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">long</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">1718002341</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">attributes.type</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">"standard"</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-700 font-medium">attributes.status</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 font-mono">string</td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[200px]">"active"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </section>

          {/* Part 3: 版本记录 */}
          <section>
            <h3 className="text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-500" /> 版本记录
            </h3>
            
            <div className="relative pl-3 border-l border-slate-200 space-y-6">
              <div className="relative">
                <div className="absolute -left-[17px] top-1 w-3 h-3 bg-white border-2 border-indigo-500 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">v2.1.0</span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 mb-2">2026-06-15 10:30</span>
                  <div className="bg-slate-50 text-xs text-slate-600 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    扩展了资产覆盖范围至所有一线城市；优化了查询接口的响应速度。
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[17px] top-1 w-3 h-3 bg-white border-2 border-slate-300 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">v2.0.5</span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 mb-2">2026-05-20 14:15</span>
                  <div className="bg-slate-50 text-xs text-slate-600 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    增加了部分字段的脱敏策略，提升了安全合规等级；修复了偶尔出现的同步延迟问题。
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[17px] top-1 w-3 h-3 bg-white border-2 border-slate-300 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">v2.0.0</span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 mb-2">2026-01-10 09:00</span>
                  <div className="bg-slate-50 text-xs text-slate-600 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    大版本更新：整合了轨迹数据，新增了时空分析模型支持。
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
