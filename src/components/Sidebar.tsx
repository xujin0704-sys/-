import { LayoutDashboard, Compass, Box, ShieldCheck, Activity, Database, Settings, Server, ChevronDown, ChevronRight, FolderOpen, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export function Sidebar({ 
  currentView, 
  setCurrentView,
  activeSecondary,
  setActiveSecondary,
  expandedCatalogs,
  setExpandedCatalogs
}: { 
  currentView: string, 
  setCurrentView: (v: string) => void,
  activeSecondary: string,
  setActiveSecondary: (v: string) => void,
  expandedCatalogs: string[],
  setExpandedCatalogs: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const primaryNav = [
    { icon: LayoutDashboard, label: '概览', id: 'overview' },
    { icon: Compass, label: '数据资产', id: 'discovery' },
    { icon: Zap, label: '场景赋能', id: 'scenario' },
    { icon: ShieldCheck, label: '合规管控', id: 'governance' },
    { icon: Activity, label: '运行监控', id: 'monitoring' }
  ];

  const catalogGroups = [
    {
       label: '时空数据',
       count: 452,
       children: [
         { name: '地图数据', count: 120 }, 
         { name: '地址数据', count: 98 }, 
         { name: '位置大数据', count: 165 }, 
         { name: '实景感知', count: 45 }, 
         { name: '交通动态', count: 24 }
       ]
    },
    {
       label: '业务域数据',
       count: 320,
       children: [
         { name: '物流运营', count: 105 }, 
         { name: '车辆资产', count: 82 }, 
         { name: '客户数据', count: 64 }, 
         { name: '行业本体', count: 41 }, 
         { name: '能源网络', count: 28 }
       ]
    },
    {
       label: 'API服务',
       count: 421,
       children: [
         { name: '通用API', count: 110 }, 
         { name: '物流API', count: 145 }, 
         { name: '安全API', count: 60 }, 
         { name: '城运API', count: 48 }, 
         { name: '企服API', count: 35 }, 
         { name: '智驾API', count: 23 }
       ]
    },
    {
       label: '模型资产',
       count: 55,
       children: [
         { name: '时空模型', count: 18 }, 
         { name: '视觉模型', count: 15 }, 
         { name: '语言模型', count: 8 }, 
         { name: '决策模型', count: 10 }, 
         { name: '智能体资产', count: 4 }
       ]
    }
  ];

  const scenarioGroups = [
    {
      label: '物流场景（核心）',
      children: [
        { name: '路由分单' },
        { name: '末端交付' },
        { name: '行为管控' },
        { name: '经营增收' },
        { name: '货运物流' }
      ]
    },
    {
      label: '经营场景',
      children: [
        { name: '运营商营销' },
        { name: '物流商机' },
        { name: '企业风控' },
        { name: '保险评分' }
      ]
    },
    {
      label: '增值场景',
      children: [
        { name: '选址参谋' },
        { name: '仓储优化' },
        { name: '热点感知' }
      ]
    },
    {
      label: '城市治理',
      children: [
        { name: '高速交警' },
        { name: '道路业主' },
        { name: '城管环卫' },
        { name: '电力/燃气' }
      ]
    },
    {
      label: '合规场景',
      children: [
        { name: '货运数据' },
        { name: '智驾合规' },
        { name: '全链路托管' }
      ]
    }
  ];

  const toggleExpand = (label: string) => {
    setExpandedCatalogs(prev => 
      prev.includes(label) ? prev.filter(v => v !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex h-screen border-r border-slate-200 bg-white">
      {/* Primary Sidebar (Thin) */}
      <div className="w-16 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 flex-shrink-0">
        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold mb-6">
          <Database className="w-5 h-5 text-white" />
        </div>
        
        <nav className="flex-1 flex flex-col gap-4 w-full px-2">
          {primaryNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-colors",
                currentView === item.id 
                  ? "bg-indigo-100 text-indigo-700" 
                  : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5 mb-1.5" />
              <span className="text-[11px] font-medium leading-tight flex flex-col items-center gap-0.5">
                {item.label.match(/.{1,2}/g)?.map((part, i) => (
                  <span key={i}>{part}</span>
                ))}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-2 pb-4 w-full">
          <button 
            onClick={() => setCurrentView('system')}
            className={cn(
              "w-full flex flex-col items-center justify-center py-3 rounded-xl transition-colors",
              currentView === 'system'
                ? "bg-indigo-100 text-indigo-700" 
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800"
            )}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Secondary Sidebar (Wider) */}
      {currentView === 'discovery' && (
        <div className="w-48 bg-white flex flex-col flex-shrink-0 relative animate-in fade-in slide-in-from-left-4 duration-300 border-r border-slate-200">
          <div className="h-16 flex items-center px-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm tracking-wide">数据资产目录</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2">
             <div className="px-3 space-y-1">
                <button
                   onClick={() => setActiveSecondary('资产目录')}
                   className={cn(
                     "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium mb-1",
                     activeSecondary === '资产目录'
                       ? "bg-slate-100 text-indigo-600 font-semibold" 
                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                   )}
                >
                  <div className="flex items-center gap-3">
                     {activeSecondary === '资产目录' && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                     <span className={activeSecondary === '资产目录' ? "pl-2" : ""}>全部资产</span>
                  </div>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-semibold",
                    activeSecondary === '资产目录' ? "bg-indigo-200/50 text-indigo-700" : "bg-slate-100 text-slate-500"
                  )}>
                    1248
                  </span>
                </button>

                {catalogGroups.map((group, idx) => {
                  const isExpanded = expandedCatalogs.includes(group.label);
                  const isGroupActive = activeSecondary === group.label;
                  
                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center group relative">
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             toggleExpand(group.label);
                          }}
                          className="absolute left-1 z-10 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded"
                        >
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setActiveSecondary(group.label)}
                          className={cn(
                            "w-full flex items-center justify-between gap-2 pl-7 pr-3 py-2.5 rounded-lg transition-colors text-sm font-medium relative",
                            isGroupActive 
                              ? "bg-slate-100 text-indigo-600 font-semibold" 
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          {isGroupActive && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                          <span>{group.label}</span>
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-md font-semibold",
                            isGroupActive ? "bg-indigo-200/50 text-indigo-700" : "bg-slate-100 text-slate-500"
                          )}>
                            {group.count}
                          </span>
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div className="ml-5 mt-1 mb-1 space-y-0.5 pl-3 border-l border-slate-100">
                          {group.children.map((child, cIdx) => {
                            const isChildActive = activeSecondary === child.name;
                            return (
                              <button
                                key={cIdx}
                                onClick={() => setActiveSecondary(child.name)}
                                className={cn(
                                  "w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors relative flex items-center justify-between",
                                  isChildActive
                                    ? "text-indigo-600 font-semibold bg-indigo-50/50"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                )}
                              >
                                {isChildActive && <div className="absolute left-[-1.5px] top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-indigo-500" />}
                                <span>{child.name}</span>
                                <span className={cn(
                                  "text-[10px] items-center px-1 py-0.5 rounded-md",
                                  isChildActive ? "text-indigo-600" : "text-slate-400"
                                )}>
                                  {child.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>

             <div className="mt-8">
                <div className="px-4 text-xs font-semibold text-slate-400 mb-2">资产管理</div>
                <div className="px-3 space-y-1">
                  <button 
                    onClick={() => setActiveSecondary('我的收藏')}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-left",
                      activeSecondary === '我的收藏'
                        ? "bg-slate-100 text-indigo-600 font-semibold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {activeSecondary === '我的收藏' && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                    <span className={activeSecondary === '我的收藏' ? "pl-2" : ""}>我的收藏</span>
                  </button>
                  <button 
                    onClick={() => setActiveSecondary('调用统计')}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-left",
                      activeSecondary === '调用统计'
                        ? "bg-slate-100 text-indigo-600 font-semibold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {activeSecondary === '调用统计' && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                    <span className={activeSecondary === '调用统计' ? "pl-2" : ""}>调用统计</span>
                  </button>
                </div>
             </div>
          </div>

        </div>
      )}

      {currentView === 'scenario' && (
        <div className="w-48 bg-white flex flex-col flex-shrink-0 relative animate-in fade-in slide-in-from-left-4 duration-300 border-r border-slate-200">
          <div className="h-16 flex items-center px-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm tracking-wide">场景赋能</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2">
             <div className="px-3 space-y-1">
                <button
                   onClick={() => setActiveSecondary('全部场景')}
                   className={cn(
                     "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium mb-1",
                     activeSecondary === '全部场景'
                       ? "bg-slate-100 text-indigo-600 font-semibold" 
                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                   )}
                >
                  <div className="flex items-center gap-3">
                     {activeSecondary === '全部场景' && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                     <span className={activeSecondary === '全部场景' ? "pl-2" : ""}>全部场景</span>
                  </div>
                </button>

                {scenarioGroups.map((group, idx) => {
                  const isExpanded = expandedCatalogs.includes(group.label);
                  const isGroupActive = activeSecondary === group.label;
                  
                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center group relative">
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             toggleExpand(group.label);
                          }}
                          className="absolute left-1 z-10 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded"
                        >
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setActiveSecondary(group.label)}
                          className={cn(
                            "w-full flex items-center justify-between gap-2 pl-7 pr-3 py-2.5 rounded-lg transition-colors text-sm font-medium relative",
                            isGroupActive 
                              ? "bg-slate-100 text-indigo-600 font-semibold" 
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          {isGroupActive && <div className="w-1 h-4 bg-indigo-500 rounded-full absolute left-3"></div>}
                          <span>{group.label}</span>
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div className="ml-5 mt-1 mb-1 space-y-0.5 pl-3 border-l border-slate-100">
                          {group.children.map((child, cIdx) => {
                            const isChildActive = activeSecondary === child.name;
                            return (
                              <button
                                key={cIdx}
                                onClick={() => setActiveSecondary(child.name)}
                                className={cn(
                                  "w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors relative flex items-center justify-between",
                                  isChildActive
                                    ? "text-indigo-600 font-semibold bg-indigo-50/50"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                )}
                              >
                                {isChildActive && <div className="absolute left-[-1.5px] top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-indigo-500" />}
                                <span>{child.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
