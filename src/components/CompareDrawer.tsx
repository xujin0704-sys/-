import { DataAsset } from '@/lib/types';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAssets, mockTaxonomy } from '@/lib/mockData';

export function CompareDrawer({ 
  compareIds, 
  onClose,
  onRemove
}: { 
  compareIds: string[], 
  onClose: () => void,
  onRemove: (id: string) => void
}) {
  if (compareIds.length === 0) return null;

  const compareAssets = compareIds.map(id => mockAssets.find(a => a.id === id)).filter(Boolean) as DataAsset[];
  
  if (compareAssets.length === 0) return null;

  const hasMultiple = compareAssets.length > 1;

  return (
    <div className={cn(
      "fixed bottom-0 left-[240px] right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 transition-transform duration-300 transform",
      compareIds.length > 0 ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1.5 rounded-t-lg text-sm font-medium shadow-md flex items-center gap-2">
        <span>资产对比 ({compareAssets.length}/3)</span>
        {compareAssets.length < 2 && <span className="text-slate-300 text-xs font-normal">请再选择至少1个资产进行对比</span>}
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="p-6 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="w-32 py-3 px-4 text-slate-500 font-medium border-b border-slate-100">对比维度</th>
              {compareAssets.map(asset => (
                <th key={asset.id} className="py-3 px-4 border-b border-slate-100 min-w-[280px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{asset.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">{asset.id} · {asset.catalog}</p>
                    </div>
                    <button 
                      onClick={() => onRemove(asset.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                      title="移除"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => (
                <th key={'empty-'+i} className="py-3 px-4 border-b border-slate-100 min-w-[280px]">
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg py-4 text-slate-400">
                    <span className="text-xs">添加资产以对比</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn("transition-opacity duration-300", !hasMultiple && "opacity-50 pointer-events-none")}>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-700 bg-slate-50/50">资产等级</td>
              {compareAssets.map(asset => (
                <td key={asset.id} className="py-4 px-4 bg-slate-50/50">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-semibold",
                    asset.assetLevel === 'S核心' ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"
                  )}>
                    {asset.assetLevel}
                  </span>
                </td>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => <td key={'empty-'+i} className="bg-slate-50/50"></td>)}
            </tr>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-700">业务场景</td>
              {compareAssets.map(asset => (
                <td key={asset.id} className="py-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.business.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => <td key={'empty-'+i}></td>)}
            </tr>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-700 bg-slate-50/50">数据标签</td>
              {compareAssets.map(asset => (
                <td key={asset.id} className="py-4 px-4 bg-slate-50/50">
                   <div className="flex flex-wrap gap-1.5">
                    {asset.tags.data.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => <td key={'empty-'+i} className="bg-slate-50/50"></td>)}
            </tr>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-700">能力标签</td>
              {compareAssets.map(asset => (
                <td key={asset.id} className="py-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.capability.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => <td key={'empty-'+i}></td>)}
            </tr>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-700 bg-slate-50/50">更新与范围</td>
              {compareAssets.map(asset => (
                <td key={asset.id} className="py-4 px-4 bg-slate-50/50">
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><span className="text-slate-400">频率：</span>{asset.updateFrequency}</p>
                    <p><span className="text-slate-400">所有者：</span>{asset.owner}</p>
                  </div>
                </td>
              ))}
              {Array.from({ length: 3 - compareAssets.length }).map((_, i) => <td key={'empty-'+i} className="bg-slate-50/50"></td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
