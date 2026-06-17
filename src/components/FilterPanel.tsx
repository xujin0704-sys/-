import { Filter, X } from 'lucide-react';
import { mockTaxonomy, catalogTree } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type SelectedTags = Record<string, string[]>;

interface TaxonomyGroup {
  id: string;
  title: string;
  sections: { category: string; tags: string[] }[];
}

interface FilterPanelProps {
  selectedTags: SelectedTags;
  setSelectedTags: (tags: SelectedTags | ((prev: SelectedTags) => SelectedTags)) => void;
  clearFilters: () => void;
  taxonomyGroups?: TaxonomyGroup[];
}

export function FilterPanel({ selectedTags, setSelectedTags, clearFilters, taxonomyGroups = [] }: FilterPanelProps) {
  const toggleTag = (category: string, tag: string) => {
    setSelectedTags(prev => {
      const current = prev[category] || [];
      if (current.includes(tag)) {
        return { ...prev, [category]: current.filter(t => t !== tag) };
      }
      return { ...prev, [category]: [...current, tag] };
    });
  };

  const hasFilters = Object.values(selectedTags).some(arr => arr && arr.length > 0);
  const activeTags = Object.entries(selectedTags).flatMap(([cat, tags]) => (tags || []).map(t => ({ cat, t })));

  return (
    <div className="w-64 flex-shrink-0 pr-6 mr-6 border-r border-slate-100 sticky top-0 h-[calc(100vh-12rem)] overflow-y-auto pb-8 self-start">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          标签筛选
        </h3>
      </div>
      
      {hasFilters && (
        <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">已选条件</span>
            <button onClick={clearFilters} className="text-xs text-indigo-600 hover:text-indigo-800">清空</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
             {activeTags.map(({ cat, t }) => (
               <span key={`${cat}-${t}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-700 shadow-sm">
                 {t}
                 <button onClick={() => toggleTag(cat, t)}>
                   <X className="w-3 h-3 hover:text-red-500" />
                 </button>
               </span>
             ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {taxonomyGroups.map((group, groupIndex) => (
          group.sections && group.sections.length > 0 ? (
            <div key={group.id}>
              {groupIndex > 0 && <div className="h-px bg-slate-100 mb-6"></div>}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{group.title}</h4>
                {group.sections.map(section => (
                  <div key={section.category}>
                    <div className="text-xs text-slate-500 mb-2">{section.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {section.tags.map(tag => {
                        const isSelected = (selectedTags[group.id] || []).includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(group.id, tag)}
                            className={cn(
                              "px-3 py-1.5 text-xs rounded-md border transition-colors",
                              isSelected
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium"
                                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                            )}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ))}

        <div className="border-t border-slate-100 pt-6 pb-12 mt-6">
          {hasFilters && (
            <div className="flex items-center justify-between text-sm">
               <button onClick={clearFilters} className="text-slate-500 hover:text-indigo-600 font-medium">重置筛选</button>
               <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">已筛出项</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
