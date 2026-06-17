import React, { useState, useEffect } from 'react';
import { X, Puzzle, Save, Activity, LayoutList, Check, Database } from 'lucide-react';
import { mockScenarioTaxonomy } from '../lib/mockData';
import { DataAsset } from '../lib/types';
import { cn } from '../lib/utils';

export function ScenarioFormDrawer({
  isOpen,
  onClose,
  scenarioToEdit,
  assets = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  scenarioToEdit?: any | null;
  assets?: DataAsset[];
}) {
  const [selectedBg, setSelectedBg] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string[]>([]);
  const [selectedCapability, setSelectedCapability] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  useEffect(() => {
    if (scenarioToEdit && isOpen) {
      setSelectedBg([scenarioToEdit.bg].filter(Boolean));
      setSelectedCategory([scenarioToEdit.category].filter(Boolean));
      setSelectedStatus([scenarioToEdit.status].filter(Boolean));
      setSelectedCapability(scenarioToEdit.capabilities || []);
      setSelectedAssets(scenarioToEdit.assets?.map((a: any) => a.name) || []);
      // Depending on the data structure, goal could be derived or just an empty array for now
      setSelectedGoal([]); 
    } else if (isOpen) {
      setSelectedBg([]);
      setSelectedCategory([]);
      setSelectedGoal([]);
      setSelectedCapability([]);
      setSelectedStatus([]);
      setSelectedAssets([]);
    }
  }, [scenarioToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleTag = (category: string, tag: string) => {
    if (category === 'bg') setSelectedBg(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'category') setSelectedCategory(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'goal') setSelectedGoal(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'capability') setSelectedCapability(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'status') setSelectedStatus(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
  };

  const toggleAsset = (assetName: string) => {
    setSelectedAssets(p => p.includes(assetName) ? p.filter(a => a !== assetName) : [...p, assetName]);
  };

  const renderTaxonomyGroup = (title: string, taxGroup: any[], categoryKey: string, selectedState: string[]) => {
    return (
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">{title}标签</h4>
        {taxGroup.map((tax, i) => (
          <div key={i}>
            <label className="block text-xs font-semibold text-slate-500 mb-2">{tax.category}</label>
            <div className="flex flex-wrap gap-2">
              {tax.tags.map((tag: string) => {
                const isSelected = selectedState.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(categoryKey, tag)}
                    className={cn(
                      "px-2.5 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1 cursor-pointer",
                      isSelected 
                        ? "bg-teal-50 border-teal-200 text-teal-700" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute inset-y-0 right-0 w-[600px] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 border-l border-slate-200">
      <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          {scenarioToEdit ? '维护场景信息' : '新增业务场景'}
        </h2>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <form className="space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
               <Puzzle className="w-4 h-4 text-teal-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">基本信息</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">场景名称</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="例如：路由分单" defaultValue={scenarioToEdit?.name} />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">场景编号</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="例如：s-1" defaultValue={scenarioToEdit?.id} />
               </div>
             </div>
             
             <div className="grid grid-cols-3 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">健康状态</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" defaultValue={scenarioToEdit?.healthStatus}>
                    <option value="">- 请选择状态 -</option>
                    <option>健康</option>
                    <option>风险</option>
                    <option>异常</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">主设/团队</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="例如：数据产品处" defaultValue={scenarioToEdit?.owner} />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">可复用领域</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="多个用逗号隔开，如：物流,外卖" defaultValue={scenarioToEdit?.reusability?.join(',')} />
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">合规状态</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" defaultValue={scenarioToEdit?.complianceStatus}>
                    <option value="">- 请选择合规状态 -</option>
                    <option>🟢 全合规</option>
                    <option>🟡 部分受限</option>
                    <option>🔴 存在禁止</option>
                 </select>
               </div>
             </div>

             <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">主力竞品</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500" placeholder="竞对名称" defaultValue={scenarioToEdit?.competitor} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">竞品报价</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500" placeholder="例如：150万/年" defaultValue={scenarioToEdit?.competitorPrice} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">我司成交价</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" placeholder="例如：120万/年" defaultValue={scenarioToEdit?.ourPrice} />
                </div>
              </div>

             <div>
               <label className="block text-xs font-semibold text-slate-600 mb-1.5">核心价值</label>
               <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" rows={3} placeholder="详细描述场景价值与覆盖面..." defaultValue={scenarioToEdit?.coreValue}></textarea>
             </div>

             <div>
               <label className="block text-xs font-semibold text-slate-600 mb-1.5">核心壁垒</label>
               <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" rows={3} placeholder="详细描述解决问题所依赖的核心壁垒..." defaultValue={scenarioToEdit?.coreMoat}></textarea>
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
               <Database className="w-4 h-4 text-indigo-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">依赖数据资产配置</h3>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {assets.map((asset) => (
                 <label 
                   key={asset.id} 
                   className={cn(
                     "flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                     selectedAssets.includes(asset.name) 
                       ? "bg-indigo-50 border-indigo-200" 
                       : "bg-white border-slate-200 hover:border-indigo-100 hover:bg-slate-50"
                   )}
                 >
                   <input 
                     type="checkbox" 
                     className="mt-1 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                     checked={selectedAssets.includes(asset.name)}
                     onChange={() => toggleAsset(asset.name)}
                   />
                   <div className="flex flex-col">
                     <span className={cn("text-sm font-bold", selectedAssets.includes(asset.name) ? "text-indigo-800" : "text-slate-700")}>
                       {asset.name}
                     </span>
                     <span className="text-[10px] text-slate-500 mt-0.5">{asset.id}</span>
                   </div>
                 </label>
               ))}
               {assets.length === 0 && (
                  <div className="col-span-full py-4 text-center text-sm text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                     暂无可选手工资产，请先在数据目录添加
                  </div>
               )}
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
               <LayoutList className="w-4 h-4 text-amber-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">关联标签配置</h3>
             </div>

             {renderTaxonomyGroup('组织架构', mockScenarioTaxonomy.bg, 'bg', selectedBg)}
             {renderTaxonomyGroup('场景分类', mockScenarioTaxonomy.category, 'category', selectedCategory)}
             {renderTaxonomyGroup('目标指引', mockScenarioTaxonomy.goal, 'goal', selectedGoal)}
             {renderTaxonomyGroup('应用能力', mockScenarioTaxonomy.capability, 'capability', selectedCapability)}
             {renderTaxonomyGroup('演进状态', mockScenarioTaxonomy.status, 'status', selectedStatus)}
          </div>
        </form>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
        <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
          取消
        </button>
        <button onClick={() => {
           alert('接口预留: ' + (scenarioToEdit ? 'PATCH /api/scenarios/' + scenarioToEdit.id : 'POST /api/scenarios/')); 
           onClose();
        }} className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          保存变更
        </button>
      </div>
    </div>
  );
}
