import React, { useState, useEffect } from 'react';
import { X, Database, Save, Activity, LayoutList, Check } from 'lucide-react';
import { DataAsset } from '../lib/types';
import { mockTaxonomy } from '../lib/mockData';
import { cn } from '../lib/utils';

export function AssetFormDrawer({
  isOpen,
  onClose,
  assetToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  assetToEdit?: DataAsset | null;
}) {
  const [selectedBusiness, setSelectedBusiness] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [selectedCapability, setSelectedCapability] = useState<string[]>([]);

  useEffect(() => {
    if (assetToEdit && isOpen) {
      setSelectedBusiness(assetToEdit.tags?.business || []);
      setSelectedData(assetToEdit.tags?.data || []);
      setSelectedCapability(assetToEdit.tags?.capability || []);
    } else if (isOpen) {
      setSelectedBusiness([]);
      setSelectedData([]);
      setSelectedCapability([]);
    }
  }, [assetToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleTag = (category: 'business' | 'data' | 'capability', tag: string) => {
    if (category === 'business') setSelectedBusiness(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'data') setSelectedData(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
    if (category === 'capability') setSelectedCapability(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
  };

  const renderTaxonomyGroup = (title: string, taxGroup: any[], categoryKey: 'business' | 'data' | 'capability', selectedState: string[]) => {
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
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
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
          {assetToEdit ? '维护资产信息' : '新增数据资产'}
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
               <Database className="w-4 h-4 text-indigo-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">基本信息</h3>
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-600 mb-1.5">资产名称</label>
               <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="例如：电子围栏实时快照" defaultValue={assetToEdit?.name} />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">资产编号</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" placeholder="自动生成或输入" defaultValue={assetToEdit?.id} />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">所属目录</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue={assetToEdit?.catalog}>
                    <option>位置大数据</option>
                    <option>物流运营</option>
                    <option>客户数据</option>
                    <option>通用API</option>
                 </select>
               </div>
             </div>

             <div>
               <label className="block text-xs font-semibold text-slate-600 mb-1.5">业务描述</label>
               <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" rows={3} placeholder="详细描述资产用途与覆盖面..." defaultValue={assetToEdit?.description}></textarea>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
               <Activity className="w-4 h-4 text-emerald-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">管理属性</h3>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">密级</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue={assetToEdit?.securityLevel}>
                    <option>L2-内部</option>
                    <option>L3-保密</option>
                    <option>L4-绝密</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">重要等级</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue={assetToEdit?.assetLevel}>
                    <option>S核心</option>
                    <option>A重要</option>
                    <option>B一般</option>
                 </select>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">权属人/团队</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="如：B1物流地图" defaultValue={assetToEdit?.owner} />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">健康度打分</label>
                 <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="如：98" defaultValue={assetToEdit?.healthScore} max={100} min={0} />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">更新频率</label>
                 <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue={assetToEdit?.updateFrequency}>
                    <option>实时</option>
                    <option>日更</option>
                    <option>周更</option>
                    <option>静态</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-600 mb-1.5">关联总数据量</label>
                 <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="如：5.2亿条" defaultValue={assetToEdit?.dataVolume} />
               </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
               <LayoutList className="w-4 h-4 text-amber-600" />
               <h3 className="font-bold text-sm text-slate-800 tracking-wide">关联标签配置</h3>
             </div>

             {renderTaxonomyGroup('业务域', mockTaxonomy.business, 'business', selectedBusiness)}
             {renderTaxonomyGroup('数据属性', mockTaxonomy.data, 'data', selectedData)}
             {renderTaxonomyGroup('能力特征', mockTaxonomy.capability, 'capability', selectedCapability)}
          </div>
        </form>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
        <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
          取消
        </button>
        <button onClick={() => {
           alert('接口预留: ' + (assetToEdit ? 'PATCH /api/assets/' + assetToEdit.id : 'POST /api/assets/')); 
           onClose();
        }} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          推送变更至全域
        </button>
      </div>
    </div>
  );
}
