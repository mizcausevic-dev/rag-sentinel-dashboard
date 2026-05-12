import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  FileCode, 
  Network, 
  Database, 
  Lock, 
  Eye, 
  AlertTriangle,
  ChevronRight,
  Server,
  Cloud,
  Code2,
  Terminal,
  BarChart3,
  Search,
  Settings,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CORPUS_STRUCTURE = [
  { 
    name: 'collections', 
    type: 'dir', 
    children: [
      { 
        name: 'product-docs', 
        type: 'dir', 
        children: [
          { name: 'api-reference.pdf', type: 'file', size: '847KB', risk: 'Low', status: 'Fresh', citations: 142 },
          { name: 'changelog.md', type: 'file', size: '12.4KB', risk: 'Low', status: 'Fresh', citations: 38 },
          { name: 'legacy-v1-guide.pdf', type: 'file', size: '2.1MB', risk: 'High', status: 'Stale', citations: 89 }
        ]
      },
      { 
        name: 'support-kb', 
        type: 'dir', 
        children: [
          { name: 'troubleshooting.md', type: 'file', size: '34.2KB', risk: 'Medium', status: 'Drifting', citations: 412 },
          { name: 'faq-2024.json', type: 'file', size: '18.7KB', risk: 'High', status: 'Stale', citations: 203 },
          { name: 'runbook.yaml', type: 'file', size: '6.3KB', risk: 'Low', status: 'Fresh', citations: 67 }
        ]
      },
      { 
        name: 'embeddings', 
        type: 'dir', 
        children: [
          { name: 'pinecone-index.bin', type: 'file', size: '1.2GB', risk: 'Low', status: 'Indexed', citations: 0 },
          { name: 'reranker-cache.parquet', type: 'file', size: '342MB', risk: 'Low', status: 'Indexed', citations: 0 }
        ]
      },
      { name: 'source-manifest.json', type: 'file', size: '4.2KB', risk: 'Low', status: 'Immutable', citations: 0 }
    ]
  },
  { 
    name: 'config', 
    type: 'dir', 
    children: [
      { name: 'retrieval-policy.yaml', type: 'file', size: '3.1KB', risk: 'Low', status: 'Immutable', citations: 0 },
      { name: 'embedding-model.json', type: 'file', size: '1.4KB', risk: 'Low', status: 'Immutable', citations: 0 }
    ]
  },
  { name: 'README.md', type: 'file', size: '8.2KB', risk: 'N/A', status: 'Public', citations: 0 },
  { name: 'package.json', type: 'file', size: '2.1KB', risk: 'Low', status: 'Mutable', citations: 0 }
];

const STATS = [
  { label: 'Retrieval Quality', value: '92/100', color: 'text-violet-400', icon: Shield },
  { label: 'Documents Indexed', value: '8,247', color: 'text-blue-400', icon: Server },
  { label: 'Hallucination Rate', value: '0.4%', color: 'text-violet-400', icon: Lock },
  { label: 'Stale Sources', value: '12', color: 'text-amber-400', icon: AlertTriangle },
];

const PIPELINE_STEPS = [
  { id: 'reg', label: 'Registration', icon: Server, desc: 'Incoming retrieval request' },
  { id: 'val', label: 'Validator', icon: Shield, desc: 'Schema & Identity verification' },
  { id: 'scan', label: 'Risk Scan', icon: Eye, desc: 'PII & Injection surface scan' },
  { id: 'matrix', label: 'Embedding Health', icon: Network, desc: 'Governance alignment check' },
  { id: 'score', label: 'Decision', icon: Activity, desc: 'Posture score generation' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'explorer' | 'health'>('architecture');
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const renderFileTree = (nodes: any[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.name} className="flex flex-col">
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 hover:bg-white/5 cursor-pointer rounded transition-colors group ${depth > 0 ? 'ml-4 border-l border-white/10 pl-4' : ''} ${selectedFile?.name === node.name ? 'bg-white/5 text-white' : ''}`}
          onClick={() => node.type === 'file' && setSelectedFile(node)}
        >
          {node.type === 'dir' ? (
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-transform rotate-90" />
          ) : (
            <FileCode className={`w-4 h-4 ${node.risk === 'High' ? 'text-rose-400' : 'text-blue-400/70'}`} />
          )}
          <span className={`text-sm ${node.type === 'dir' ? 'text-white/80 font-medium' : 'text-slate-400'}`}>
            {node.name}
          </span>
          {node.risk && node.risk !== 'N/A' && (
            <div className={`ml-auto w-1 h-1 rounded-full ${node.risk === 'High' ? 'bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]' : 'bg-violet-500/30'}`} />
          )}
        </div>
        {node.children && renderFileTree(node.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a] shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-violet-500/20 rounded flex items-center justify-center border border-violet-500/40">
            <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.6)]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-violet-400 tracking-tighter uppercase leading-none">Protocol Active</span>
            <h1 className="text-lg font-semibold text-white tracking-tight leading-none mt-1">
              rag-sentinel 
              <span className="text-slate-500 font-normal ml-2 text-sm italic underline decoration-white/10 underline-offset-4 font-serif">v0.1.0-preview</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Uptime</p>
            <p className="text-sm font-mono text-slate-300">142:12:09</p>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex gap-2">
            <a
              href="https://github.com/mizcausevic-dev/rag-sentinel-dashboard#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 cursor-pointer transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/mizcausevic-dev/rag-sentinel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-violet-600 border border-violet-400/50 rounded-full text-xs text-white shadow-lg shadow-violet-900/20 hover:bg-violet-500 cursor-pointer transition-colors"
            >
              Source
            </a>
          </div>
        </div>
      </nav>

      {/* Preview banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-2 flex items-center justify-center gap-2 shrink-0">
        <span className="text-[10px] text-amber-300 font-mono uppercase tracking-widest font-bold">Preview Mode</span>
        <span className="text-[10px] text-slate-400">·</span>
        <span className="text-[10px] text-slate-400">Showcasing the RAG governance UX. Live vector store scanning lands in v0.2.</span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#080808] flex flex-col p-6 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1 mb-8 shrink-0">
            <NavItem 
              active={activeTab === 'architecture'} 
              onClick={() => setActiveTab('architecture')}
              label="Global Overview" 
            />
            <NavItem 
              active={activeTab === 'explorer'} 
              onClick={() => setActiveTab('explorer')}
              label="Corpus Intelligence" 
            />
            <NavItem 
              label="Retrieval Logs" 
            />
            <NavItem 
              label="Drift Analytics" 
            />
          </nav>

          <div className="mt-auto">
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-black border border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Sentinel AI</p>
              <p className="text-xs text-slate-400 leading-relaxed italic font-serif leading-relaxed">
                "Detecting hallucinations and source drift in real-time."
              </p>
              <div className="mt-3 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-violet-500" />
                <div className="w-1 h-1 rounded-full bg-violet-500/40" />
                <div className="w-1 h-1 rounded-full bg-violet-500/20" />
              </div>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#050505] flex flex-col gap-8 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 h-full flex flex-col"
              >
                {/* Metric Grid */}
                <div className="grid grid-cols-4 gap-4 shrink-0">
                  <MetricCard label="Indexed Documents" value="8,247" sub="+312 NEW" valueColor="text-white" />
                  <MetricCard label="Retrieval Calls" value="14,203" sub="PAST 24H" valueColor="text-white" />
                  <MetricCard label="Hallucination Risk" value="Low" hasBar valueColor="text-rose-500" />
                  <MetricCard label="Avg Retrieval Latency" value="62ms" sub="NOMINAL" valueColor="text-white" />
                </div>

                {/* Main Visual & Log Section */}
                <div className="flex-1 flex gap-6 min-h-0">
                  {/* Visual Cluster */}
                  <div className="flex-[1.5] bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden group flex flex-col">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                      <h2 className="text-sm font-semibold text-slate-300">Vector Search Heatmap</h2>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 delay-75 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 delay-150 animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Visual representation of traffic nodes */}
                    <div className="flex-1 relative border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-[#050505] overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                      
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-violet-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-violet-500/40 rounded-full" />
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center border border-violet-500 shadow-[0_0_30px_rgba(167, 139, 250,0.2)]">
                          <Shield className="w-6 h-6 text-violet-400" />
                        </div>
                      </motion.div>

                      <div className="absolute top-10 left-20 px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[9px] font-mono text-blue-400 animate-pulse">QRY::SEMANTIC_HIT</div>
                      <div className="absolute bottom-20 right-10 px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[9px] font-mono text-rose-400 animate-bounce">QRY::HALLUCINATION_RISK</div>
                      <div className="absolute top-1/3 right-1/4 px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[9px] font-mono text-violet-400">QRY::FRESH_CITATION</div>
                    </div>

                    <div className="mt-4 shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] text-slate-500 font-mono">09:44:12</span>
                         <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Index Status: Healthy</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The rag-sentinel agent is monitoring vector retrievals for hallucination signals, source drift, and citation freshness.
                        No high-risk responses detected in the last burst.
                      </p>
                    </div>
                  </div>

                  {/* Interception Log */}
                  <div className="flex-1 bg-black border border-white/10 rounded-2xl flex flex-col p-6">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 shrink-0">Retrieval Log</h2>
                    <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[11px] space-y-3 pr-2">
                       <LogEntry time="09:44:10" tag="HIT" color="text-violet-400" message="Query: api-reference.pdf::sec-4.2 (k=5, score=0.91)" />
                       <LogEntry time="09:44:11" tag="HIT" color="text-violet-400" message="Query: troubleshooting.md::auth-flow (cited)" />
                       <div className="p-2 bg-rose-500/10 border-l-2 border-rose-500 rounded-r">
                         <div className="flex gap-4">
                           <span className="text-slate-600">09:44:12</span>
                           <span className="text-rose-500 font-bold">[HALL]</span>
                           <span className="text-rose-200">Hallucination: response cites missing source</span>
                         </div>
                       </div>
                       <LogEntry time="09:44:15" tag="STALE" color="text-amber-400" message="Source faq-2024.json older than 180d" />
                       <LogEntry time="09:44:18" tag="HIT" color="text-violet-400" message="Query: changelog.md::v3.2-release (fresh)" />
                       <LogEntry time="09:44:20" tag="MISS" color="text-slate-500" message="No semantic match above threshold..." opacity="opacity-40" />
                       <LogEntry time="09:44:22" tag="HIT" color="text-violet-400" message="Reranker: 5→3 chunks (precision boost)" />
                       <LogEntry time="09:44:25" tag="INFO" color="text-blue-400" message="Re-embedding stale chunks..." />
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
                      <span className="text-[10px] text-slate-600 italic">Scanning logs in real-time...</span>
                      <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[9px] border border-violet-500/20 font-bold">SECURE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'explorer' && (
              <motion.div
                key="explorer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-8 h-full"
              >
                <div className="w-72 flex flex-col gap-6 shrink-0 h-full">
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 h-full overflow-y-auto custom-scrollbar">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Corpus Tree</h3>
                    <div className="space-y-px">
                      {renderFileTree(CORPUS_STRUCTURE)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 h-full min-w-0 flex gap-8">
                  <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-full flex flex-col min-w-0">
                    {selectedFile ? (
                      <>
                        <div className="flex items-center justify-between mb-8 shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                              <FileCode className={`w-5 h-5 ${selectedFile.risk === 'High' ? 'text-rose-400' : 'text-violet-400'}`} />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold tracking-tight text-white">{selectedFile.name}</h2>
                              <p className="text-xs text-slate-500 font-mono tracking-tighter">Size: {selectedFile.size} • Security Layer: {selectedFile.status}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                             <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 cursor-pointer transition-colors">Edit</div>
                             <div className="px-3 py-1.5 bg-violet-600 border border-violet-400/50 rounded-lg text-xs text-white shadow-lg transition-transform active:scale-95">Re-index</div>
                          </div>
                        </div>
                        <div className="flex-1 bg-black rounded-xl border border-white/5 p-6 font-mono text-[11px] leading-relaxed relative overflow-hidden">
                           <div className="text-slate-400 overflow-y-auto h-full custom-scrollbar pr-4">
                              <span className="text-slate-600 block mb-1 uppercase text-[9px] tracking-widest">// SENTINEL VALIDATION MODULE :: {selectedFile.name.toUpperCase()}</span>
                              <span className="text-purple-400">import</span> {'{ Validator, Policy }'} <span className="text-purple-400">from</span> <span className="text-violet-400">"@sentinel/core"</span>;
                              <br /><br />
                              <span className="text-slate-600 italic block mb-2 px-2 bg-white/5 rounded py-1">
                                /* Enterprise-grade {selectedFile.name.split('.')[0]} logic. 
                                   Governed by Sentinel Embedding Health v2.1 */
                              </span>
                              <span className="text-blue-400">export class</span> <span className="text-amber-400">GovernanceEngine</span> {'{'}
                              <br />
                              &nbsp;&nbsp;<span className="text-blue-400">async</span> <span className="text-violet-400">apply</span>(ctx: SentinelContext) {'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Inspecting {selectedFile.name} surface...</span>
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> risk = <span className="text-blue-400">await</span> ctx.scanner.evaluate(ctx.incoming);
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> (risk.score &gt; <span className="text-rose-400">0.8</span>) {'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">throw new</span> <span className="text-rose-400">PolicyViolation</span>(<span className="text-violet-400">"Drift detected"</span>);
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> ctx.proceed();
                              <br />
                              &nbsp;&nbsp;{'}'}
                              <br />
                              {'}'}
                           </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                        <Code2 className="w-12 h-12 mb-4 text-violet-500" />
                        <h2 className="text-lg font-bold">Protocol Inspector</h2>
                        <p className="text-xs max-w-xs mt-2">Select a file to inspect the governance implementation logic and alignment matrix.</p>
                      </div>
                    )}
                  </div>

                  {/* Side Intelligence Panel */}
                  <div className="w-72 hidden xl:flex flex-col gap-6 shrink-0">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col shrink-0">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Source Intelligence</h3>
                      {selectedFile ? (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Risk Level</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 ${selectedFile.risk === 'High' ? 'text-rose-400' : 'text-violet-400'}`}>
                              {selectedFile.risk}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                              <span>Source Freshness</span>
                              <span>98%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full w-[98%] bg-violet-500" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                              <span>Citation Quality</span>
                              <span>{selectedFile.risk === 'High' ? '42%' : '100%'}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${selectedFile.risk === 'High' ? 'w-[42%] bg-rose-500' : 'w-full bg-violet-500'}`} />
                            </div>
                          </div>
                          <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-slate-500 italic leading-relaxed">
                              {selectedFile.risk === 'High' 
                                ? "Critical surfaces detected. Escalating to deep-packet governance scan."
                                : "Module verified against enterprise security doctrine."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-600 italic">Select a module for telemetry...</p>
                      )}
                    </div>

                    <div className="bg-gradient-to-br from-violet-950/20 to-[#0a0a0a] border border-violet-500/10 rounded-2xl p-6 flex flex-col flex-1">
                      <h3 className="text-[10px] font-bold text-violet-500/70 uppercase tracking-widest mb-4">Embedding Health</h3>
                      <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 rounded-full border border-violet-500/20 flex items-center justify-center mb-4 relative">
                          <div className="absolute inset-0 rounded-full border-2 border-violet-500/10 border-t-violet-500 animate-spin" />
                          <Activity className="w-6 h-6 text-violet-500/40" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">STAND-BY FOR ANALYSIS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-between px-8 text-[10px] text-slate-600 font-mono shrink-0">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_5px_rgba(167, 139, 250,0.5)]"></span>
            NODE: RAG-US-WEST-1
          </div>
          <div>LATENCY: 0.002ms</div>
          <div className="flex items-center gap-2">
             CPU: 12.1% 
             <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[12%] bg-violet-500/50" />
             </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-violet-500/70 font-bold">TLS 1.3 ENABLED</span>
          <a
            href="https://github.com/mizcausevic-dev/rag-sentinel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-400 transition-colors cursor-pointer"
          >
            github: mizcausevic-dev/rag-sentinel
          </a>
        </div>
      </footer>
    </div>
  );
}

function MetricCard({ label, value, sub, hasBar, valueColor }: { label: string, value: string, sub?: string, hasBar?: boolean, valueColor: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-lg group hover:border-white/10 transition-colors">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className={`text-3xl font-light font-mono ${valueColor}`}>{value}</p>
        {sub && <span className="text-slate-500 text-[10px] font-bold tracking-tighter uppercase">{sub}</span>}
        {hasBar && (
          <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="h-full w-1/4 bg-rose-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function LogEntry({ time, tag, color, message, opacity = "" }: { time: string, tag: string, color: string, message: string, opacity?: string }) {
  return (
    <div className={`flex gap-4 leading-none ${opacity}`}>
      <span className="text-slate-600 whitespace-nowrap">{time}</span>
      <span className={`${color} font-bold min-w-[40px]`}>[{tag}]</span>
      <span className="text-slate-300 tracking-tight">{message}</span>
    </div>
  );
}

function NavItem({ label, active, onClick }: { label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded transition-colors group ${
        active 
          ? 'bg-white/5 text-white' 
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${active ? 'bg-violet-500 shadow-[0_0_8px_rgba(167, 139, 250,0.5)]' : 'bg-transparent group-hover:bg-slate-700'}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
