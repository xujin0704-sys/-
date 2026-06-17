import React, { useState } from 'react';
import { DataAsset } from '@/lib/types';
import { Database, Search, ArrowDownUp, CheckCircle2, Sparkles, Plus, Edit2, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AssetTable({ 
  assets, 
  isSmartMatched,
  selectedForCompare = [],
  onToggleCompare,
  onAssetClick,
  onAddAsset,
  onEditAsset
}: { 
  assets: DataAsset[], 
  isSmartMatched?: boolean,
  selectedForCompare?: string[],
  onToggleCompare?: (id: string) => void,
  onAssetClick?: (asset: DataAsset) => void,
  onAddAsset?: () => void,
  onEditAsset?: (asset: DataAsset, e: React.MouseEvent) => void
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportCSV = () => {
    // Basic CSV generation for demonstration
    const headers = ['资产ID', '名称', '重要级', '涉密等级', '更新频率', '覆盖范围', '业务场景', '关联总数据量'];
    const rows = assets.map(a => [
      a.id,
      a.name,
      a.assetLevel,
      a.securityLevel,
      a.tags.data[0] || '', // Example getting frequency
      a.tags.data[1] || '', // Example getting coverage
      a.tags.business.join('; '),
      a.dataVolume || ''
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(',') + '\n' 
      + rows.map(e => e.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `数据资产目录导出_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    link.remove();
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    window.print(); // Simple PDF alternative for preview
    setShowExportMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      
      {/* Grid Header & Search/Sort */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h2 className="text-base font-medium text-slate-800 flex items-center gap-2">
          资产 <span className="text-sm text-slate-500 font-normal">{assets.length}个</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              导出台账
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden z-50">
                <button 
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  导出 CSV
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-50"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600" />
                  保存 PDF
                </button>
              </div>
            )}
           </div>
          <button 
            onClick={onAddAsset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            新增资产
          </button>
          <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors ml-2">
            综合排序 <ArrowDownUp className="w-3.5 h-3.5" />
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="输入资产名称/标识搜索" 
              className="pl-3 pr-8 py-1.5 w-64 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {assets.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border border-slate-200 border-dashed rounded-xl bg-slate-50/50 py-20">
          <Database className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-sm">没有匹配的数据资产，请尝试调整左侧标签组合。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {assets.map(asset => (
            <div 
              key={asset.id} 
              onClick={() => onAssetClick?.(asset)}
              className={cn(
              "bg-white rounded-xl border transition-all p-5 flex flex-col group relative cursor-pointer",
              selectedForCompare.includes(asset.id) 
                ? "border-indigo-500 shadow-[0_0_0_1px_rgba(99,102,241,1)]" 
                : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
            )}>
              {/* Actions & Compare Checkbox */}
              <div 
                className="absolute top-4 right-4 z-10 flex items-center gap-3"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={(e) => onEditAsset?.(asset, e)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="维护资产信息"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    checked={selectedForCompare.includes(asset.id)}
                    onChange={() => onToggleCompare?.(asset.id)}
                  />
                  <span className="ml-1.5 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">对比</span>
                </label>
              </div>

              {/* Card Header */}
              <div className="flex items-start gap-4 mb-3 pr-10">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-[15px] font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                      {asset.name}
                    </h3>
                    {isSmartMatched && (
                      <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium shadow-sm flex-shrink-0 animate-in zoom-in duration-300">
                        <Sparkles className="w-3 h-3" /> 推荐使用
                      </span>
                    )}
                    {asset.assetLevel === 'S核心' && !isSmartMatched && (
                      <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-bold flex-shrink-0">S核心</span>
                    )}
                    {(asset.assetLevel === 'A重要' || asset.assetLevel === 'B一般') && !isSmartMatched && (
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold flex-shrink-0">{asset.assetLevel}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>{asset.id}</span>
                    <span className="text-slate-300">|</span>
                    <span>{asset.securityLevel}</span>
                  </div>
                </div>
              </div>

              {/* Key Properties */}
              <div className="grid grid-cols-3 gap-2 mb-3 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 mb-0.5">更新频率</span>
                  <span className="text-xs font-medium text-slate-700">{asset.updateFrequency || '-'}</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-2">
                  <span className="text-[10px] text-slate-400 mb-0.5">覆盖范围</span>
                  <span className="text-xs font-medium text-slate-700">
                    {asset.tags.data.find(t => ['全国', '省域', '城市', '高速路网', '末端网点', '室内', '跨境'].includes(t)) || '-'}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-2">
                  <span className="text-[10px] text-slate-400 mb-0.5">合规属性</span>
                  <span className="text-xs font-medium text-indigo-600 truncate">
                    {asset.tags.capability.find(t => ['脱敏可用', '需授权', '内部专用', '可对外商用', '需脱敏审批', '涉敏禁出'].includes(t)) || '-'}
                  </span>
                </div>
              </div>

              {/* Tags Section Container */}
              <div className="flex flex-col gap-3 mb-3">
                {/* Supported Scenarios */}
                <div>
                  <div className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1">
                    支撑业务场景
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.business.filter(tag => !tag.match(/^[A-Z][0-9]-/)).slice(0, 3).map((tag, i) => (
                      <span key={'b'+i} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                        {tag}
                      </span>
                    ))}
                    {asset.tags.business.filter(tag => !tag.match(/^[A-Z][0-9]-/)).length === 0 && (
                       <span className="text-[10px] text-slate-400 italic bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">暂无特定场景</span>
                    )}
                  </div>
                </div>

                {/* Data & Capability Tags Row */}
                <div>
                  <div className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1">
                    资产标签
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.data.slice(0, 2).map((tag, i) => (
                      <span key={'d'+i} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                        <span className="text-slate-400 mr-0.5">#</span>{tag}
                      </span>
                    ))}
                    {asset.tags.capability.slice(0, 2).map((tag, i) => (
                      <span key={'c'+i} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                        <span className="text-slate-400 mr-0.5">#</span>{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                {asset.description}
              </p>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-500">@{asset.owner}</span>
                  {asset.dataVolume && (
                    <>
                      <span>·</span>
                      <span className="text-slate-500 font-medium">{asset.dataVolume}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 健康度 {asset.healthScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
