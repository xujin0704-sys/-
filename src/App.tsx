import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { FilterPanel, SelectedTags } from './components/FilterPanel';
import { AssetTable as AssetCardGrid } from './components/AssetTable';
import { ScenarioMatcher } from './components/ScenarioMatcher';
import { CompareDrawer } from './components/CompareDrawer';
import { AssetDetailDrawer } from './components/AssetDetailDrawer';
import { AssetFormDrawer } from './components/AssetFormDrawer';
import { OverviewDashboard } from './components/OverviewDashboard';
import { BusinessDomainMatrix } from './components/BusinessDomainMatrix';
import { ShieldCheck, Box, ChevronUp, Activity } from 'lucide-react';
import { GlobalAIAssistant } from './components/GlobalAIAssistant';

import { catalogTree, mockAssets, mockTaxonomy, mockScenarioTaxonomy } from './lib/mockData';
import { DataAsset } from './lib/types';

import { ScenarioCards } from './components/ScenarioCards';
import { ComplianceGovernance } from './components/ComplianceGovernance';
import { OperationsMonitoring } from './components/OperationsMonitoring';
import { SystemSettings } from './components/SystemSettings';
import { ScenarioFormDrawer } from './components/ScenarioFormDrawer';
import { ScenarioDetailDrawer } from './components/ScenarioDetailDrawer';

const assetTaxonomyGroups = [
  { id: 'business', title: '业务维度', sections: mockTaxonomy.business },
  { id: 'data', title: '数据维度', sections: mockTaxonomy.data },
  { id: 'capability', title: '能力维度', sections: mockTaxonomy.capability }
];

const scenarioTaxonomyGroups = [
  { id: 'bg', title: '组织架构', sections: mockScenarioTaxonomy.bg },
  { id: 'category', title: '场景分类', sections: mockScenarioTaxonomy.category },
  { id: 'goal', title: '业务目标', sections: mockScenarioTaxonomy.goal },
  { id: 'capability', title: '核心能力', sections: mockScenarioTaxonomy.capability },
  { id: 'status', title: '场景状态', sections: mockScenarioTaxonomy.status }
];

export default function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [activeSecondary, setActiveSecondary] = useState('资产目录');
  const [isSmartMatched, setIsSmartMatched] = useState(false);
  const [expandedCatalogs, setExpandedCatalogs] = useState<string[]>([
    '时空数据', '业务域数据', 'API服务', '模型资产',
    '物流场景（核心）', '经营场景', '增值场景', '城市治理', '合规场景'
  ]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<DataAsset | null>(null);
  const [assetsData, setAssetsData] = useState<DataAsset[]>(mockAssets);
  
  const [isAssetFormOpen, setIsAssetFormOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<DataAsset | null>(null);

  const [isScenarioFormOpen, setIsScenarioFormOpen] = useState(false);
  const [scenarioToEdit, setScenarioToEdit] = useState<any | null>(null);

  const [isScenarioDetailOpen, setIsScenarioDetailOpen] = useState(false);
  const [scenarioToView, setScenarioToView] = useState<any | null>(null);

  const [selectedTags, setSelectedTags] = useState<SelectedTags>({});

  const handleSetCurrentView = (view: string) => {
    setCurrentView(view);
    if (view === 'scenario') {
      setActiveSecondary('全部场景');
    } else if (view === 'discovery') {
      setActiveSecondary('资产目录');
    }
    clearFilters();
  };

  const clearFilters = () => {
    setSelectedTags({});
    setIsSmartMatched(false);
  };

  const applyAIScenario = (tags: SelectedTags) => {
    setSelectedTags(tags);
    setIsSmartMatched(true);
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  const filteredAssets = useMemo(() => {
    let baseAssets = assetsData;
    
    // Domain filtering
    if (activeSecondary && activeSecondary !== '资产目录' && activeSecondary !== '我的收藏' && activeSecondary !== '调用统计') {
      if (catalogTree[activeSecondary]) {
        // activeSecondary is a top-level catalog group
        const subCats = catalogTree[activeSecondary];
        baseAssets = baseAssets.filter(a => a.catalog && subCats.includes(a.catalog));
      } else {
        // activeSecondary is a sub-catalog itself
        baseAssets = baseAssets.filter(a => a.catalog === activeSecondary);
      }
    }

    // Taxonomy filtering
    return baseAssets.filter(asset => {
      const matchBusiness = !selectedTags.business || selectedTags.business.length === 0 || 
        selectedTags.business.some(tag => asset.tags.business?.includes(tag));
        
      const matchData = !selectedTags.data || selectedTags.data.length === 0 || 
        selectedTags.data.some(tag => asset.tags.data?.includes(tag));
        
      const matchCapability = !selectedTags.capability || selectedTags.capability.length === 0 || 
        selectedTags.capability.some(tag => asset.tags.capability?.includes(tag));

      return matchBusiness && matchData && matchCapability;
    });
  }, [selectedTags, activeSecondary]);

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewDashboard onNavigate={handleSetCurrentView} />;
      case 'discovery':
        if (activeSecondary === '我的收藏' || activeSecondary === '调用统计') {
          return (
             <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full items-center justify-center text-slate-400 animate-in fade-in duration-500">
                <Box className="w-16 h-16 text-slate-300 mb-4" />
                <h2 className="text-lg font-semibold text-slate-600">{activeSecondary}</h2>
                <p className="text-sm mt-2 max-w-md text-center">该领域的具体资产与相关管理功能正在开发中，敬请期待。</p>
             </div>
          );
        }
        return (
          <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">探索精选数据资产</h1>
              <p className="text-sm text-slate-500">基于多维标签体系，快速定位满足业务场景的数据和模型能力。</p>
            </div>
            
            <div className="flex flex-1 items-start">
              {/* Left Sidebar Filter */}
              <FilterPanel 
                selectedTags={selectedTags}
                setSelectedTags={(next) => {
                  setSelectedTags(next);
                  setIsSmartMatched(false);
                }}
                clearFilters={clearFilters}
                taxonomyGroups={assetTaxonomyGroups}
              />

               {/* Right Content Grid */}
              <div className="flex-1 min-w-0 pl-2">
                 <ScenarioMatcher onMatch={applyAIScenario} onClear={clearFilters} />
                 <AssetCardGrid 
                   assets={filteredAssets} 
                   isSmartMatched={isSmartMatched} 
                   selectedForCompare={compareIds}
                   onToggleCompare={toggleCompare}
                   onAssetClick={setSelectedAsset}
                   onAddAsset={() => setIsAssetFormOpen(true)}
                   onEditAsset={(asset, e) => {
                     e.stopPropagation();
                     setAssetToEdit(asset);
                     setIsAssetFormOpen(true);
                   }}
                 />
              </div>
            </div>
          </div>
        );
      case 'scenario':
        return (
          <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex-shrink-0">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">场景赋能架构</h1>
              <p className="text-sm text-slate-500">基于具体的业务场景，查看对应的数据资产组合与落地成效。</p>
            </div>
            <div className="flex flex-1 items-start">
              <FilterPanel 
                selectedTags={selectedTags}
                setSelectedTags={(next) => setSelectedTags(next)}
                clearFilters={clearFilters}
                taxonomyGroups={scenarioTaxonomyGroups}
              />
              <div className="flex-1 min-w-0 pl-2">
                <ScenarioCards 
                  activeSecondary={activeSecondary} 
                  selectedTags={selectedTags} 
                  onComplianceClick={() => handleSetCurrentView('governance')}
                  onAddScenario={() => setIsScenarioFormOpen(true)}
                  onEditScenario={(scenario, e) => {
                    e.stopPropagation();
                    setScenarioToEdit(scenario);
                    setIsScenarioFormOpen(true);
                  }}
                  onViewScenario={(scenario) => {
                    setScenarioToView(scenario);
                    setIsScenarioDetailOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
           <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">服务与业务矩阵</h1>
             <p className="text-sm text-slate-500 mb-6">探查底层数据资产如何支撑上层业务和产品服务。</p>
             <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200">
               <BusinessDomainMatrix />
             </div>
           </div>
        );
      case 'governance':
        return (
           <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in duration-500">
             <div className="mb-6 flex-shrink-0">
               <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">数据合规管控</h1>
               <p className="text-sm text-slate-500">全链路数据分级分类与安全合规管控，确保数据使用合规。</p>
             </div>
             <div className="flex-1 min-h-0">
               <ComplianceGovernance />
             </div>
           </div>
        );
      case 'monitoring':
        return <OperationsMonitoring />;
      case 'system':
        return <SystemSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView} 
        activeSecondary={activeSecondary}
        setActiveSecondary={(val) => {
          setActiveSecondary(val);
          setIsSmartMatched(false);
          setSelectedTags({});
        }}
        expandedCatalogs={expandedCatalogs}
        setExpandedCatalogs={setExpandedCatalogs}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <main className="flex-1 overflow-y-auto w-full relative">
          {renderView()}
        </main>
        
        <CompareDrawer 
          compareIds={compareIds} 
          onClose={() => setCompareIds([])} 
          onRemove={toggleCompare} 
        />

        <AssetDetailDrawer 
          asset={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
        />

        <AssetFormDrawer
          isOpen={isAssetFormOpen}
          assetToEdit={assetToEdit}
          onClose={() => {
            setIsAssetFormOpen(false);
            setAssetToEdit(null);
          }}
        />

        <ScenarioFormDrawer
          isOpen={isScenarioFormOpen}
          scenarioToEdit={scenarioToEdit}
          assets={assetsData}
          onClose={() => {
            setIsScenarioFormOpen(false);
            setScenarioToEdit(null);
          }}
        />

        <ScenarioDetailDrawer
          isOpen={isScenarioDetailOpen}
          scenario={scenarioToView}
          onClose={() => {
            setIsScenarioDetailOpen(false);
            setScenarioToView(null);
          }}
        />

        {/* Sticky Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-10 flex-shrink-0 relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-600 font-medium tracking-wide">全域监控节点在线</span>
            </div>
            
            <div className="h-4 w-px bg-slate-200"></div>
            
            {currentView === 'scenario' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">支撑业务场景:</span>
                  <span className="font-semibold text-slate-800 text-base">45</span>
                  <span className="text-xs text-slate-400 font-normal">个</span>
                </div>
                
                <div className="h-4 w-px bg-slate-200"></div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">覆盖行业总数:</span>
                  <span className="font-semibold text-indigo-600 text-base">12</span>
                  <span className="text-xs text-slate-400 font-normal">个</span>
                </div>
                
                <div className="h-4 w-px bg-slate-200"></div>
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">近一周新增场景:</span>
                  <span className="font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded text-sm">
                    <ChevronUp className="w-3.5 h-3.5 mr-0.5" /> 3
                  </span>
                </div>
              </>
            ) : currentView === 'governance' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">总字段数:</span>
                  <span className="font-semibold text-slate-800 text-base">12,480</span>
                  <span className="text-xs text-slate-400 font-normal">个</span>
                </div>
                
                <div className="h-4 w-px bg-slate-200"></div>
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">分级涉密字段:</span>
                  <span className="font-semibold text-rose-600 text-base">3,256</span>
                  <span className="text-xs text-slate-400 font-normal">个</span>
                </div>
              </>
            ) : currentView === 'monitoring' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">近7天总流转负载:</span>
                  <span className="font-semibold text-slate-800 text-base">325.8</span>
                  <span className="text-xs text-slate-400 font-normal">万次</span>
                </div>
                
                <div className="h-4 w-px bg-slate-200"></div>
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">支撑新场景:</span>
                  <span className="font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded text-sm">
                    <ChevronUp className="w-3.5 h-3.5 mr-0.5" /> 5
                  </span>
                </div>

                <div className="h-4 w-px bg-slate-200"></div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">今日合规变更预警:</span>
                  <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-sm">4 项</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">总资产数:</span>
                  <span className="font-semibold text-slate-800 text-base">1,248</span>
                  <span className="text-xs text-slate-400 font-normal">项</span>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-500">总数据体量:</span>
                  <span className="font-semibold text-indigo-600 text-base">3.2</span>
                  <span className="text-xs text-slate-400 font-normal">PB</span>
                </div>
                
                <div className="h-4 w-px bg-slate-200"></div>
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">近一周新增资产:</span>
                  <span className="font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded text-sm">
                    <ChevronUp className="w-3.5 h-3.5 mr-0.5" /> 36
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">近一周新增体量:</span>
                  <span className="font-semibold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded text-sm">
                    <ChevronUp className="w-3.5 h-3.5 mr-0.5" /> 12.5 TB
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>实时数据同步中</span>
          </div>
        </div>
      </div>
      <GlobalAIAssistant />
    </div>
  );
}


