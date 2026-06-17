import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles, Loader2, Database, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是全域数据要素AI助手。你可以向我询问：\n- 某个场景推荐使用哪些数据资产？\n- 寻找同类型的业务场景模板\n- 数据资产的合规使用限制与申请流程'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      let responseContent = '我尚在学习中。您可以尝试提问关于"场景智能匹配"、"合规管控"或"同类场景推荐"的问题。';
      
      const lowerInput = userMessage.content.toLowerCase();
      if (lowerInput.includes('合规') || lowerInput.includes('隐私') || lowerInput.includes('脱敏')) {
        responseContent = '关于数据合规：涉及高精度地理坐标（如经纬度）与个人隐私画像的数据资产（例如：B1-顺丰物流的高危特征），必须经过【脱敏API网关】进行动态清洗后才可输出。如果是L2+/L3智能车测绘场景，请务必先提交至「数安办」进行《临时数据使用许可》审批，并严禁向外网暴露直连接口。';
      } else if (lowerInput.includes('场景') && (lowerInput.includes('推荐') || lowerInput.includes('匹配'))) {
        responseContent = '根据您的需求，如果想做【物流时效提升】相关的应用，推荐您参考「B1-顺丰物流」的"路由分单"场景。该场景已达到L5产品化成熟度，可直接复用的核心资产包括：\n1. 标准地址库 (POI/AOI)\n2. 全球地理编码解析服务\n3. 网格与路由数据\n该场景健康度为92分，复用价值极高。';
      } else if (lowerInput.includes('同类')) {
        responseContent = '为您找到以下相似类型的业务场景模板：\n- **城市运营类**："城市环卫清运计费"（成熟度L4，复用行业：城运/环保）\n- **商业分析类**："零售门店选址洞察"（成熟度L5，复用行业：零售/餐饮）\n您可以点击相应的卡片一键复用其底层API组合和数据模型。';
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: responseContent }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 group",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:-translate-y-1 hover:shadow-indigo-500/30"
        )}
      >
        <Sparkles className="w-6 h-6 absolute animate-pulse opacity-50" />
        <Bot className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-8 right-8 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide">全域智能助手</h3>
              <div className="text-[10px] text-indigo-100 opacity-80 flex items-center gap-1 mt-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                 基于全域资产知识库在线
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-indigo-100 hover:text-white p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex items-start gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-slate-800 text-white" : "bg-indigo-100 text-indigo-600"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                msg.role === 'user' 
                  ? "bg-slate-800 text-white rounded-tr-sm" 
                  : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed">
                   {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                 <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[44px]">
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Shortcut chips */}
        <div className="px-4 py-2 bg-slate-50 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2 border-t border-slate-100 shrink-0">
          <button 
             onClick={() => setInputText("推荐物流相关的高价值场景")}
             className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" /> 物流场景推荐
          </button>
          <button 
             onClick={() => setInputText("关于L2智能车测绘的数据合规要求是什么？")}
             className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3 h-3 text-amber-500" /> 智能车合规要求
          </button>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0 relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="询问场景智能匹配、合规使用要求..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none max-h-32"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="absolute right-6 bottom-6 p-1.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
             <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
