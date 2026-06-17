import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Layers, Database, Puzzle, X, Bot, Key, Server, RefreshCw, Clock } from 'lucide-react';
import { mockTaxonomy, mockScenarioTaxonomy } from '../lib/mockData';

export function SystemSettings() {
  const [assetTax, setAssetTax] = useState(mockTaxonomy);
  const [scenarioTax, setScenarioTax] = useState(mockScenarioTaxonomy);
  
  // AI Model Config State
  const [llmProvider, setLlmProvider] = useState('openai');
  const [llmModel, setLlmModel] = useState('gpt-4o');
  const [llmKey, setLlmKey] = useState('sk-*****************************************');

  // Sync API Config State
  const [syncConfig, setSyncConfig] = useState([
    { dept: '顺丰同城', url: 'https://api.sf-city.com/v1/assets/stats', cron: '0 2 * * *', status: 'active', fields: ['数据总量', '日均调用'] },
    { dept: '丰巢科技', url: 'https://data.fcbox.com/openapi/assets/sync', cron: '30 2 * * *', status: 'active', fields: ['覆盖城市', '服务客户'] },
    { dept: '政务数据局', url: 'https://openapi.gov.cn/v2/metrics', cron: '0 3 * * *', status: 'active', fields: ['数据总量', '覆盖城市', '服务客户', '日均调用'] }
  ]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [newSyncDept, setNewSyncDept] = useState('');
  const [newSyncUrl, setNewSyncUrl] = useState('');
  const [newSyncCron, setNewSyncCron] = useState('');
  const [newSyncFields, setNewSyncFields] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'asset' | 'scenario'>('asset');
  const [newParent, setNewParent] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleOpenModal = (type: 'asset' | 'scenario') => {
    setModalType(type);
    setNewParent(type === 'asset' ? 'business' : 'category');
    setNewCategoryName('');
    setIsModalOpen(true);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim() || !newParent) return;

    if (modalType === 'asset') {
      setAssetTax(prev => ({
        ...prev,
        [newParent]: [
          ...(prev[newParent as keyof typeof mockTaxonomy] || []),
          { category: newCategoryName, tags: [] }
        ]
      }));
    } else {
      setScenarioTax(prev => ({
        ...prev,
        [newParent]: [
          ...(prev[newParent as keyof typeof mockScenarioTaxonomy] || []),
          { category: newCategoryName, tags: [] }
        ]
      }));
    }
    setIsModalOpen(false);
  };

  const renderTaxonomyGroup = (title: string, taxGroup: any[], categoryKey: string) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-semibold text-slate-700 text-sm flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          {title}标签
        </h4>
        <div className="h-px bg-slate-200 flex-1 ml-2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taxGroup.map((tax, i) => (
           <div key={`${categoryKey}-${i}`} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
              <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                 <span className="font-bold text-xs text-slate-800">{tax.category}</span>
                 <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-indigo-600"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                 </div>
              </div>
              <div className="p-3 flex-1">
                 <div className="flex flex-wrap gap-1.5">
                    {tax.tags.map((tag: string, j: number) => (
                       <span key={j} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded inline-flex items-center gap-1 cursor-default group">
                          {tag}
                          <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity">
                            &times;
                          </button>
                       </span>
                    ))}
                    <button className="text-[11px] font-medium border border-dashed border-slate-300 text-slate-500 px-2 py-0.5 rounded hover:bg-slate-50 transition-colors inline-flex items-center gap-1">
                       <Plus className="w-2.5 h-2.5" /> 添加
                    </button>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-50">
      <div className="p-8 pb-6 bg-white border-b border-slate-200 flex-shrink-0 z-10 relative shadow-[0_2px_4px_-1px_rgba(0,0,0,0.02)]">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">系统配置</h1>
        <p className="text-sm text-slate-500">集中管理全局标签配置，支持资产属性动态扩展和场景联动配置。</p>
      </div>

      <div className="p-8 overflow-y-auto w-full max-w-[1600px] mx-auto space-y-8">
        
        {/* 业务部门数据同步配置 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col border-t-4 border-t-blue-500">
           <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-blue-50/30">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base mb-1">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  外部业务系统接口同步管理 (API Data Sync)
                </h3>
                <p className="text-[11px] text-slate-500">统一管控下级或平行业务系统的统计数据回流，定时刷新资产/场景的动态指标（包含：数据总量、覆盖城市、服务客户、日均调用量等）。</p>
              </div>
              <button 
                onClick={() => {
                  setNewSyncDept('');
                  setNewSyncUrl('');
                  setNewSyncCron('0 2 * * *');
                  setNewSyncFields('数据总量, 调用量');
                  setIsSyncModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" /> 注册外部拉取接口
              </button>
           </div>
           <div className="p-0">
             <div className="min-w-full overflow-x-auto">
               <table className="min-w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-xs uppercase">
                   <tr>
                     <th className="px-6 py-3">对接系统/部门</th>
                     <th className="px-6 py-3">数据拉取接口 (URL)</th>
                     <th className="px-6 py-3">同步指标范围</th>
                     <th className="px-6 py-3">执行频次 (Cron)</th>
                     <th className="px-6 py-3">健康状态</th>
                     <th className="px-6 py-3 text-right">操作</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {syncConfig.map((config, index) => (
                     <tr key={index} className="hover:bg-slate-50">
                       <td className="px-6 py-4 font-bold text-slate-700">{config.dept}</td>
                       <td className="px-6 py-4 text-slate-500 font-mono text-xs max-w-[200px] truncate" title={config.url}>{config.url}</td>
                       <td className="px-6 py-4">
                         <div className="flex flex-wrap gap-1">
                           {config.fields?.map((f, i) => (
                             <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">{f}</span>
                           ))}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-slate-500 font-mono text-xs flex items-center gap-1 h-full pt-5"><Clock className="w-3 h-3"/>{config.cron}</td>
                       <td className="px-6 py-4">
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1 w-max"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> 同步正常</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="text-slate-400 hover:text-rose-600 p-1" onClick={() => setSyncConfig(prev => prev.filter((_, i) => i !== index))}>
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* 全域AI助手配置 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col border-t-4 border-t-violet-500">
           <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-violet-50/30">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                <Bot className="w-5 h-5 text-violet-600" />
                全域AI助手配置
              </h3>
           </div>
           <div className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5"><Server className="w-3.5 h-3.5" /> 模型服务商 (Provider)</label>
                 <select 
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-slate-50 font-medium text-slate-700"
                   value={llmProvider}
                   onChange={(e) => setLlmProvider(e.target.value)}
                 >
                   <option value="openai">OpenAI</option>
                   <option value="gemini">Google Gemini</option>
                   <option value="anthropic">Anthropic</option>
                   <option value="local">本地私有化部署 (Local)</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5"><Bot className="w-3.5 h-3.5" /> 指定模型 (Model)</label>
                 <input 
                   type="text" 
                   value={llmModel}
                   onChange={(e) => setLlmModel(e.target.value)}
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono text-slate-700"
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5"><Key className="w-3.5 h-3.5" /> API Key 访问凭证</label>
                 <input 
                   type="password" 
                   value={llmKey}
                   onChange={(e) => setLlmKey(e.target.value)}
                   placeholder="sk-..."
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono text-slate-700"
                 />
               </div>
             </div>
             <div className="mt-6 flex justify-end">
               <button className="px-5 py-2 border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2">
                  <Bot className="w-4 h-4" /> 连通性测试并保存配置
               </button>
             </div>
           </div>
        </div>

        {/* 数据资产维度管理 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                <Database className="w-5 h-5 text-indigo-600" />
                数据资产标签体系
              </h3>
              <button 
                onClick={() => handleOpenModal('asset')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors shadow-sm"
              >
                 <Plus className="w-3.5 h-3.5" />
                 新增资产类别
              </button>
           </div>
           <div className="p-6">
              {renderTaxonomyGroup('业务域', assetTax.business, 'business')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('数据属性', assetTax.data, 'data')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('能力特征', assetTax.capability, 'capability')}
           </div>
        </div>

        {/* 场景赋能维度管理 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                <Puzzle className="w-5 h-5 text-teal-600" />
                场景赋能标签体系
              </h3>
              <button 
                onClick={() => handleOpenModal('scenario')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-600 text-xs font-semibold rounded-lg hover:bg-teal-100 transition-colors shadow-sm"
              >
                 <Plus className="w-3.5 h-3.5" />
                 新增场景类别
              </button>
           </div>
           <div className="p-6">
              {renderTaxonomyGroup('组织架构', scenarioTax.bg, 'sc-bg')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('场景分类', scenarioTax.category, 'sc-category')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('目标指引', scenarioTax.goal, 'sc-goal')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('应用能力', scenarioTax.capability, 'sc-capability')}
              <div className="h-6"></div>
              {renderTaxonomyGroup('演进状态', scenarioTax.status, 'sc-status')}
           </div>
        </div>

      </div>

      {/* Add Sync Modal */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                新增数据接入配置
              </h2>
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">业务部门</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="如：同城物流..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={newSyncDept}
                  onChange={(e) => setNewSyncDept(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">接口地址 (API URL)</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                  value={newSyncUrl}
                  onChange={(e) => setNewSyncUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 执行计划 (Cron Expression)</label>
                <input 
                  type="text" 
                  placeholder="0 2 * * *"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                  value={newSyncCron}
                  onChange={(e) => setNewSyncCron(e.target.value)}
                />
                <p className="text-[10px] text-slate-500 mt-1">例如：0 2 * * * 表示每天凌晨两点执行</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">期望同步的指标范围</label>
                <input 
                  type="text" 
                  placeholder="如：数据总量, 日均调用"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={newSyncFields}
                  onChange={(e) => setNewSyncFields(e.target.value)}
                />
                <p className="text-[10px] text-slate-500 mt-1">请用英文或者中文逗号分隔，对应的指标每天会通过接口定时刷新。</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  if (newSyncDept && newSyncUrl) {
                    setSyncConfig(prev => [...prev, { 
                      dept: newSyncDept, 
                      url: newSyncUrl, 
                      cron: newSyncCron || '0 2 * * *', 
                      status: 'active',
                      fields: newSyncFields ? newSyncFields.split(/[,，]/).map(f => f.trim()).filter(Boolean) : []
                    }]);
                    setIsSyncModalOpen(false);
                  }
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                {modalType === 'asset' ? '新增资产分类' : '新增场景分类'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">所属维度</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={newParent}
                  onChange={(e) => setNewParent(e.target.value)}
                >
                  {modalType === 'asset' ? (
                    <>
                      <option value="business">业务域</option>
                      <option value="data">数据属性</option>
                      <option value="capability">能力特征</option>
                    </>
                  ) : (
                    <>
                      <option value="bg">组织架构</option>
                      <option value="category">场景分类</option>
                      <option value="goal">目标指引</option>
                      <option value="capability">应用能力</option>
                      <option value="status">演进状态</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">分类名称</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="如：合规属性..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleCreateCategory}
                className={`px-6 py-2 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                  modalType === 'asset' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
