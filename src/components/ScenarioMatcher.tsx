import { Sparkles, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { SelectedTags } from './FilterPanel';

interface ScenarioMatcherProps {
  onMatch: (tags: SelectedTags) => void;
  onClear: () => void;
}

export function ScenarioMatcher({ onMatch, onClear }: ScenarioMatcherProps) {
  const [query, setQuery] = useState('我是环卫场景，我想基于楼盘表数据，进行数据收费有底数可知');
  const [matched, setMatched] = useState(false);
  const [analysisText, setAnalysisText] = useState<React.ReactNode>("");

  const handleMatch = () => {
    if (!query) return;
    
    const result: SelectedTags = { business: [], data: [], capability: [] };
    let explanation: React.ReactNode = "";

    if (query.includes('环卫') || query.includes('楼盘') || query.includes('收费') || query.includes('底数')) {
      result.business.push('G2-城市运营', '动态定价');
      result.data.push('POI');
      result.capability.push('查询服务');
      explanation = (
        <>
          识别到业务域 <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-medium border border-indigo-100">G2-城市运营(环卫)</span>，
          目标资产类型 <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded font-medium border border-teal-100">POI(楼盘表)</span>，
          核心场景在于 <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded font-medium border border-amber-100">查询服务(摸排底数)</span> 与 <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-medium border border-indigo-100">动态定价(收费依据)</span>。
        </>
      );
    } else {
      result.business.push('G1-城市安全', '风险预警');
      result.data.push('实时');
      explanation = (
        <>
          关注业务域 <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-medium border border-indigo-100">G1-城市安全</span>，
          核心场景 <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-medium border border-indigo-100">风险预警</span>，
          数据频率要求 <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded font-medium border border-teal-100">实时</span>。
        </>
      );
    }

    setAnalysisText(explanation);
    setMatched(true);
    onMatch(result);
  };
  
  const handleClear = () => {
    setQuery('');
    setMatched(false);
    onClear();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 border border-indigo-100 rounded-xl p-5 mb-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full opacity-20 -mr-20 -mt-20 blur-2xl pointer-events-none"></div>
      
      <div className="flex items-start gap-4 relative">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1 ring-4 ring-white shadow-sm">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-800 mb-2">场景智能匹配 (AI 助手)</h3>
          <div className="flex gap-2 max-w-3xl">
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='自然语言描述，例如："我是G1城市安全，需要风险预警能力，数据要求实时"'
              className="flex-1 px-4 py-2.5 text-sm border border-indigo-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white/80 placeholder-slate-400"
              onKeyDown={(e) => e.key === 'Enter' && handleMatch()}
            />
            <button 
              onClick={handleMatch}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> 开始匹配
            </button>
          </div>
          
          {matched && (
            <div className="mt-4 p-3.5 bg-white border border-indigo-100 rounded-lg text-sm text-slate-700 flex items-start justify-between shadow-sm max-w-3xl animate-in fade-in slide-in-from-top-2">
               <div>
                 <div className="font-semibold text-indigo-700 mb-1 flex items-center gap-1.5">
                   <Sparkles className="w-3.5 h-3.5" /> 语义解析成功
                 </div>
                 <div className="leading-relaxed">
                   {analysisText}
                   <br/>
                   <span className="text-slate-500 text-xs mt-1.5 inline-block">系统已自动应用上述筛选条件，并在下方为您推荐相关资产。</span>
                 </div>
               </div>
               <button 
                 className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mt-1 transition-colors whitespace-nowrap" 
                 onClick={handleClear}
               >
                 清除匹配 <ArrowRight className="w-3.5 h-3.5"/>
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
