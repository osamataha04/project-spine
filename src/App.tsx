import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  phases, incomeTimeline, baselineExpenses, hourBudgets,
  knowledgeSpine, toolStack, targetEmployers, preApplicationChecklists,
  phase0MonthlyPlan, adjacentDomains, visaStrategy, dailyTodos
} from './data/planData';

type Section = 'dashboard' | 'timeline' | 'income' | 'todos' | 'checklists' | 'resources' | 'hours' | 'employers' | 'adjacent' | 'visa' | 'phase0';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [currentPhase, setCurrentPhase] = useLocalStorage<number>('spine-current-phase', 0);
  const [todoState, setTodoState] = useLocalStorage<Record<string, boolean>>('spine-todos', {});
  const [checklistState, setChecklistState] = useLocalStorage<Record<string, boolean>>('spine-checklists', {});
  const [milestoneState, setMilestoneState] = useLocalStorage<Record<string, boolean>>('spine-milestones', {});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTodo = (id: string) => {
    setTodoState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecklist = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMilestone = (id: string) => {
    setMilestoneState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetDay = () => {
    const newTodos = { ...todoState };
    dailyTodos.forEach(t => { newTodos[t.id] = false; });
    setTodoState(newTodos);
  };

  const getProgress = () => {
    const totalMilestones = phases.reduce((acc, p) => acc + p.milestones.length, 0);
    const completedMilestones = Object.values(milestoneState).filter(Boolean).length;
    return totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  };

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'timeline', label: 'Phase Timeline', icon: '🗓️' },
    { id: 'phase0', label: 'Phase 0 Sprint', icon: '🚀' },
    { id: 'todos', label: 'Daily Todos', icon: '✅' },
    { id: 'checklists', label: 'Pre-App Checklists', icon: '📋' },
    { id: 'income', label: 'Income Timeline', icon: '💰' },
    { id: 'hours', label: 'Hour Budget', icon: '⏱️' },
    { id: 'employers', label: 'Target Employers', icon: '🏢' },
    { id: 'resources', label: 'Knowledge & Tools', icon: '📚' },
    { id: 'adjacent', label: 'Adjacent Domains', icon: '🔄' },
    { id: 'visa', label: 'Visa & Mobility', icon: '🌍' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-lg font-bold gradient-text">PROJECT SPINE</h1>
          <p className="text-xs text-slate-400 mt-1">v3: Banking → Elite Lateral</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full progress-bar-fill" style={{ width: `${getProgress()}%` }} />
            </div>
            <span className="text-xs text-slate-400">{getProgress()}%</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`nav-item w-full text-left px-4 py-2.5 text-sm border-l-2 flex items-center gap-2 ${activeSection === item.id ? 'active text-blue-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400">
            <p>Current Phase: <span className="text-white font-medium">{phases[currentPhase].name}</span></p>
            <p className="mt-1">Goal: CFO / Partner-Track</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#1e293b] border-b border-slate-700 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-white text-xl">☰</button>
          <h1 className="text-sm font-bold gradient-text">PROJECT SPINE v3</h1>
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto section-fade-in" key={activeSection}>
          {activeSection === 'dashboard' && <DashboardSection currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} milestoneState={milestoneState} getProgress={getProgress} />}
          {activeSection === 'timeline' && <TimelineSection milestoneState={milestoneState} toggleMilestone={toggleMilestone} />}
          {activeSection === 'phase0' && <Phase0Section />}
          {activeSection === 'todos' && <TodosSection todoState={todoState} toggleTodo={toggleTodo} resetDay={resetDay} />}
          {activeSection === 'checklists' && <ChecklistsSection checklistState={checklistState} toggleChecklist={toggleChecklist} />}
          {activeSection === 'income' && <IncomeSection />}
          {activeSection === 'hours' && <HoursSection />}
          {activeSection === 'employers' && <EmployersSection />}
          {activeSection === 'resources' && <ResourcesSection />}
          {activeSection === 'adjacent' && <AdjacentSection />}
          {activeSection === 'visa' && <VisaSection />}
        </div>
      </main>
    </div>
  );
}

// ============ DASHBOARD ============
function DashboardSection({ currentPhase, setCurrentPhase, milestoneState, getProgress }: { currentPhase: number; setCurrentPhase: (v: number) => void; milestoneState: Record<string, boolean>; getProgress: () => number }) {
  const phaseProgress = phases.map((phase, idx) => {
    const completed = phase.milestones.filter((_, mIdx) => milestoneState[`${idx}-${mIdx}`]).length;
    return Math.round((completed / phase.milestones.length) * 100);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 mt-1">Single Goal: CFO / Partner-Track at a Multinational. Nothing Else.</p>
      </div>

      {/* Phase Selector */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">SET CURRENT PHASE</h3>
        <div className="flex flex-wrap gap-2">
          {phases.map((phase, idx) => (
            <button
              key={phase.id}
              onClick={() => setCurrentPhase(idx)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currentPhase === idx ? 'text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              style={currentPhase === idx ? { backgroundColor: phase.color } : {}}
            >
              {phase.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-300 mt-3">
          <span className="font-medium text-white">{phases[currentPhase].title}</span> — {phases[currentPhase].duration} • {phases[currentPhase].hoursPerWeek}hrs/wk
        </p>
      </div>

      {/* Overall Progress */}
      <div className="glass-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-slate-400">OVERALL PROGRESS</h3>
          <span className="text-2xl font-bold text-white">{getProgress()}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div className="h-3 rounded-full progress-bar-fill" style={{ width: `${getProgress()}%`, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)' }} />
        </div>
      </div>

      {/* Phase Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="glass-card p-4 phase-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
              <h4 className="text-sm font-bold text-white">{phase.name}: {phase.title}</h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">{phase.duration} • {phase.hoursPerWeek}hrs/wk</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div className="h-2 rounded-full progress-bar-fill" style={{ width: `${phaseProgress[idx]}%`, backgroundColor: phase.color }} />
            </div>
            <p className="text-xs text-slate-400">{phaseProgress[idx]}% complete</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">13</p>
          <p className="text-xs text-slate-400 mt-1">ACCA Papers</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">3</p>
          <p className="text-xs text-slate-400 mt-1">CFA Levels</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">20</p>
          <p className="text-xs text-slate-400 mt-1">Hrs/Wk Standard</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">15yr</p>
          <p className="text-xs text-slate-400 mt-1">CFO Horizon</p>
        </div>
      </div>

      {/* Baseline Expenses */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">BASELINE EXPENSES (Qena, EGP/mo 2026)</h3>
        <div className="space-y-2">
          {baselineExpenses.map((exp, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-slate-300">{exp.item}</span>
              <span className="text-white font-medium">{exp.amount} EGP</span>
            </div>
          ))}
          <div className="border-t border-slate-600 pt-2 mt-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Survival minimum</span>
              <span className="text-amber-400 font-bold">8,000–14,000 EGP</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-slate-300 font-medium">Comfortable target</span>
              <span className="text-green-400 font-bold">15,000–20,000 EGP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TIMELINE ============
function TimelineSection({ milestoneState, toggleMilestone }: { milestoneState: Record<string, boolean>; toggleMilestone: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Phase Timeline & Milestones</h2>
        <p className="text-slate-400 mt-1">Click milestones to track your progress through each phase.</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 timeline-line" />

        {phases.map((phase, pIdx) => {
          const completedCount = phase.milestones.filter((_, mIdx) => milestoneState[`${pIdx}-${mIdx}`]).length;
          return (
            <div key={phase.id} className="relative pl-12 md:pl-16 pb-8">
              {/* Phase dot */}
              <div className="absolute left-2 md:left-4 w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center" style={{ backgroundColor: phase.color }}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{phase.name}: {phase.title}</h3>
                    <p className="text-sm text-slate-400">{phase.duration} • {phase.hoursPerWeek}hrs/wk</p>
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
                    {completedCount}/{phase.milestones.length}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">{phase.description}</p>

                <div className="space-y-2">
                  {phase.milestones.map((milestone, mIdx) => {
                    const isChecked = milestoneState[`${pIdx}-${mIdx}`] || false;
                    return (
                      <label key={mIdx} className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleMilestone(`${pIdx}-${mIdx}`)}
                          className="mt-0.5 w-4 h-4 rounded border-slate-500 text-green-500 focus:ring-green-500 focus:ring-offset-0 bg-slate-700"
                        />
                        <span className={`text-sm ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>
                          {milestone}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ PHASE 0 SPRINT ============
function Phase0Section() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Phase 0: Pre-Service Sprint</h2>
        <p className="text-slate-400 mt-1">~6 months flexible duration, 20hrs/wk. Not a hard 6-month wall.</p>
      </div>

      <div className="glass-card p-4 bg-blue-500/5 border-blue-500/30">
        <p className="text-sm text-blue-300">
          <strong>Non-negotiable rule:</strong> Any live interview or application deadline always overrides the study schedule — reshuffle the week, never skip the opportunity.
        </p>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-2">HOUR BUDGET (20hrs/wk)</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {hourBudgets.phase0.map((item, i) => (
            <span key={i} className="px-2 py-1 rounded" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              {item.track}: {item.hours}h
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {phase0MonthlyPlan.map((month, idx) => (
          <div key={idx} className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                M{idx + 1}
              </div>
              <div>
                <h4 className="text-white font-medium">{month.month}: {month.title}</h4>
              </div>
            </div>
            <ul className="space-y-2 ml-13">
              {month.tasks.map((task, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 mt-0.5">▸</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-2">CLOSE-OUT (whenever Phase 0 ends)</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Document PER plan with employer or prepare to start immediately</li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Set up Phase 1 maintenance-mode plan</li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Milestone: offer secured or pipeline clearly advancing</li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span> ACCA Applied Knowledge complete, Applied Skills underway</li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Service begins with momentum already built, not from zero</li>
        </ul>
      </div>
    </div>
  );
}

// ============ TODOS ============
function TodosSection({ todoState, toggleTodo, resetDay }: { todoState: Record<string, boolean>; toggleTodo: (id: string) => void; resetDay: () => void }) {
  const completedCount = dailyTodos.filter(t => todoState[t.id]).length;
  const categories = [...new Set(dailyTodos.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Daily Todo List</h2>
          <p className="text-slate-400 mt-1">Check off completed items. Reset at end of day or re-tick anytime.</p>
        </div>
        <button
          onClick={resetDay}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
        >
          🔄 Reset Day
        </button>
      </div>

      {/* Progress */}
      <div className="glass-card p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Today's Progress</span>
          <span className="text-lg font-bold text-white">{completedCount}/{dailyTodos.length}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="h-3 rounded-full progress-bar-fill"
            style={{
              width: `${(completedCount / dailyTodos.length) * 100}%`,
              backgroundColor: completedCount === dailyTodos.length ? '#10b981' : '#3b82f6'
            }}
          />
        </div>
        {completedCount === dailyTodos.length && (
          <p className="text-sm text-green-400 mt-2">🎉 All tasks completed! Great day.</p>
        )}
      </div>

      {/* Todos by category */}
      {categories.map(cat => (
        <div key={cat} className="glass-card p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">{cat}</h3>
          <div className="space-y-2">
            {dailyTodos.filter(t => t.category === cat).map(todo => (
              <label key={todo.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <input
                  type="checkbox"
                  checked={todoState[todo.id] || false}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox w-5 h-5 rounded border-slate-500 focus:ring-blue-500 focus:ring-offset-0 bg-slate-700 cursor-pointer"
                />
                <span className={`text-sm ${todoState[todo.id] ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                  {todo.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="glass-card p-4 bg-amber-500/5 border-amber-500/30">
        <p className="text-sm text-amber-300">
          💡 <strong>Tip:</strong> These are your default daily tasks. You can re-tick completed items if you want to track recurring habits. Use "Reset Day" to clear all checkboxes for a fresh start.
        </p>
      </div>
    </div>
  );
}

// ============ CHECKLISTS ============
function ChecklistsSection({ checklistState, toggleChecklist }: { checklistState: Record<string, boolean>; toggleChecklist: (id: string) => void }) {
  const sections = [
    { key: 'banks', title: 'Banks (NBE/CIB/QNB/Banque Misr/AAIB)', icon: '🏦' },
    { key: 'investmentBanks', title: 'Investment Banks (EFG Hermes/CI Capital/HSBC IB)', icon: '📈' },
    { key: 'big4', title: 'Big 4 (Elite Lateral, Phase 3)', icon: '🏛️' },
    { key: 'mnc', title: 'MNC Finance/FP&A Lateral', icon: '🌐' },
    { key: 'gulf', title: 'Gulf Relocation', icon: '🇦🇪' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Pre-Application Checklists</h2>
        <p className="text-slate-400 mt-1">Target-specific preparation checklists. Check items as you complete them.</p>
      </div>

      {sections.map(section => {
        const items = preApplicationChecklists[section.key as keyof typeof preApplicationChecklists];
        const completedCount = items.filter((_, i) => checklistState[`${section.key}-${i}`]).length;
        const progress = Math.round((completedCount / items.length) * 100);

        return (
          <div key={section.key} className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                <span>{section.icon}</span> {section.title}
              </h3>
              <span className="text-xs text-slate-400">{completedCount}/{items.length}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
              <div className="h-1.5 rounded-full progress-bar-fill bg-green-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="space-y-2">
              {items.map((item, i) => {
                const isChecked = checklistState[`${section.key}-${i}`] || false;
                return (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChecklist(`${section.key}-${i}`)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-500 text-green-500 focus:ring-green-500 bg-slate-700"
                    />
                    <span className={`text-sm ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ INCOME ============
function IncomeSection() {
  const maxIncome = 140000;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Income Timeline</h2>
        <p className="text-slate-400 mt-1">Egypt-anchored, Banking/IB route. All figures in EGP/month.</p>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-4">EXPECTED INCOME RANGE (EGP/month)</h3>
        <div className="space-y-4">
          {incomeTimeline.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-white font-medium">
                  {item.min === 0 && item.max === 0 ? '0' : `${item.min.toLocaleString()}–${item.max.toLocaleString()}`} EGP
                </span>
              </div>
              <div className="relative h-6 bg-slate-700 rounded overflow-hidden">
                <div
                  className="income-bar absolute h-full rounded opacity-30"
                  style={{ left: `${(item.min / maxIncome) * 100}%`, width: `${((item.max - item.min) / maxIncome) * 100}%`, backgroundColor: item.color }}
                />
                <div
                  className="income-bar absolute h-full w-1 rounded"
                  style={{ left: `${(item.max / maxIncome) * 100}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="text-xs text-slate-500">{item.phase} • {item.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Income Streams */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">INCOME DIVERSIFICATION BY PHASE</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
            <span className="text-blue-400 font-bold text-xs mt-0.5">P0</span>
            <p className="text-sm text-slate-300"><strong className="text-white">None scheduled</strong> — 20hrs/wk has no buffer. Savings/family covers this.</p>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
            <span className="text-amber-400 font-bold text-xs mt-0.5">P1</span>
            <p className="text-sm text-slate-300"><strong className="text-white">None</strong> — maintenance mode only.</p>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
            <span className="text-green-400 font-bold text-xs mt-0.5">P2</span>
            <p className="text-sm text-slate-300"><strong className="text-white">Y1:</strong> Freelance bookkeeping once job routine settles. <strong className="text-white">Y2:</strong> Pick ONE: freelancing OR Knowledge Spine catch-up — not both.</p>
          </div>
          <div className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
            <span className="text-purple-400 font-bold text-xs mt-0.5">P3</span>
            <p className="text-sm text-slate-300"><strong className="text-white">Excel consulting + ACCA/CFA tutoring + light corporate advisory</strong> — now from real credibility.</p>
          </div>
        </div>
      </div>

      {/* Side Income Details */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">SIDE INCOME STREAMS (when applicable)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-white font-medium">Freelance Bookkeeping</p>
            <p className="text-xs text-slate-400">Upwork/Fiverr/Mostaql — $8-20/hr starting, $20-40/hr post-ACCA</p>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-white font-medium">Remote Part-time Finance</p>
            <p className="text-xs text-slate-400">$500-1,500/mo, USD/GBP-paid (protects vs EGP volatility)</p>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-white font-medium">Financial Modeling Gigs</p>
            <p className="text-xs text-slate-400">$150-500/project</p>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-white font-medium">ACCA/CFA Tutoring</p>
            <p className="text-xs text-slate-400">EGP 200-500/hr locally, once papers passed</p>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg md:col-span-2">
            <p className="text-sm text-white font-medium">Light Corporate Advisory (post-ACCA)</p>
            <p className="text-xs text-slate-400">EGP 5,000-15,000/mo per SME client, 2-3 clients manageable alongside full-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ HOURS ============
function HoursSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Weekly Hour Budget</h2>
        <p className="text-slate-400 mt-1">Standardized at 20hrs/wk across all phases. Sustainable indefinitely.</p>
      </div>

      {Object.entries(hourBudgets).map(([phase, items]) => {
        const total = items.reduce((acc, i) => acc + i.hours, 0);
        const phaseLabel = phase === 'phase0' ? 'Phase 0 — Pre-Service Sprint' : phase === 'phase2' ? 'Phase 2 — Banking/IB (Full-time job + study)' : 'Phase 3 — Post-Lateral (Year 3+)';
        return (
          <div key={phase} className="glass-card p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium">{phaseLabel}</h3>
              <span className="text-sm text-slate-400">{total} hrs/wk</span>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.track}</span>
                    <span className="text-white font-medium">{item.hours}h</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full progress-bar-fill" style={{ width: `${(item.hours / 20) * 100}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="glass-card p-4 bg-amber-500/5 border-amber-500/30">
        <p className="text-sm text-amber-300">
          ⚠️ <strong>Honest trade-off:</strong> 20hrs/wk throughout is sustainable indefinitely — but the aggressive 35-55hr density is explicitly NOT attempted past Phase 0. Full ACCA membership lands around Year 4-5 rather than Year 4 sharp.
        </p>
      </div>
    </div>
  );
}

// ============ EMPLOYERS ============
function EmployersSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Target Employers</h2>
        <p className="text-slate-400 mt-1">All targets applied to in parallel during Phase 0. Don't pre-narrow.</p>
      </div>

      {/* Banking vs IB comparison */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">PHASE 2 ENTRY: BANKING vs. INVESTMENT BANKING</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <h4 className="text-white font-medium text-sm mb-2">Retail/Corporate Bank</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Easier entry — higher volume graduate programs</li>
              <li>• Credit analysis, operations</li>
              <li>• PER-eligible ✓</li>
              <li>• Phase 3: Big 4 Audit or MNC finance</li>
              <li>• Lower pay on average</li>
            </ul>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <h4 className="text-white font-medium text-sm mb-2">Investment Bank</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Harder — more selective, fewer seats</li>
              <li>• Deal work: valuation, pitch books, DD</li>
              <li>• PER-eligible ✓</li>
              <li>• Phase 3: Big 4 Advisory/M&A or elite IB</li>
              <li>• Higher pay, variable with bonuses</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-green-400 mt-3">💡 Recommendation: Apply to BOTH in parallel. Don't pre-narrow before seeing what responds.</p>
      </div>

      {/* Employer lists */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-green-400 mb-3">ENTRY TIER (Phase 2 — Years 1-2)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">Retail/Corporate Banks</p>
            {targetEmployers.entryTier.filter(e => e.type.includes('Bank')).map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">Investment Banks</p>
            {targetEmployers.entryTier.filter(e => e.type.includes('Investment')).map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">Mid-tier Audit</p>
            {targetEmployers.entryTier.filter(e => e.type.includes('Mid-tier')).map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-purple-400 mb-3">ELITE LATERAL TIER (Phase 3 — Year 3+)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">Big 4</p>
            {targetEmployers.eliteTier.filter(e => e.type === 'Big 4').map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">Elite IB</p>
            {targetEmployers.eliteTier.filter(e => e.type === 'Elite IB').map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase">MNC Finance</p>
            {targetEmployers.eliteTier.filter(e => e.type.includes('MNC')).map((e, i) => (
              <p key={i} className="text-sm text-slate-300 py-0.5">• {e.name}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-pink-400 mb-3">SENIOR TIER (Year 8+)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {targetEmployers.seniorTier.map((e, i) => (
            <div key={i} className="p-2 bg-slate-700/30 rounded">
              <p className="text-sm text-white">{e.name}</p>
              <p className="text-xs text-slate-400">{e.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ RESOURCES ============
function ResourcesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Knowledge Spine & Tools</h2>
        <p className="text-slate-400 mt-1">Bachelor's = zero credit until re-proven against these texts. Folds into ACCA study hours.</p>
      </div>

      {/* Knowledge Spine */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">📚 Core Knowledge Disciplines</h3>
        {knowledgeSpine.map((item, i) => (
          <div key={i} className="glass-card p-4">
            <h4 className="text-white font-medium text-sm mb-1">{item.discipline}</h4>
            <p className="text-sm text-blue-300">📖 {item.text}</p>
            {item.secondary && <p className="text-xs text-slate-400 mt-1">Secondary: {item.secondary}</p>}
            {item.depthCheck && (
              <p className="text-xs text-green-400 mt-2 flex items-start gap-1">
                <span>🎯</span> {item.depthCheck}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Tool Stack */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">🛠️ Tool Stack</h3>
        {toolStack.map((tier, i) => (
          <div key={i} className="glass-card p-4">
            <h4 className="text-sm font-medium text-slate-400 mb-3">{tier.tier}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tier.tools.map((tool, j) => (
                <div key={j} className="p-2 bg-slate-700/30 rounded">
                  <p className="text-sm text-white font-medium">{tool.name}</p>
                  <p className="text-xs text-slate-400">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skills Timeline */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">SKILLS SPINE BEYOND EXAMS</h3>
        <div className="space-y-2">
          {[
            { skill: "Business-level English", when: "Phase 0, ongoing", trace: "Every interview, non-negotiable" },
            { skill: "Advanced Excel", when: "Phase 0", trace: "Daily tool, every role" },
            { skill: "Power BI", when: "Phase 2 Year 1", trace: "FP&A, Advisory" },
            { skill: "SQL (query-level)", when: "Phase 2 Year 1-2", trace: "Data-pulling literacy" },
            { skill: "Python for finance", when: "Phase 2 Year 2", trace: "FP&A/Advisory differentiator" },
            { skill: "IFRS fluency (deep)", when: "Phase 0 onward", trace: "Every audit/advisory/IB engagement" },
            { skill: "Financial modeling", when: "Phase 0 onward", trace: "IB interview tested" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm p-2 rounded hover:bg-slate-700/30">
              <span className="text-blue-400 font-medium min-w-[120px]">{item.when}</span>
              <div>
                <span className="text-white">{item.skill}</span>
                <span className="text-slate-400 ml-2">→ {item.trace}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ADJACENT ============
function AdjacentSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Adjacent Domains</h2>
        <p className="text-slate-400 mt-1">Same scientific base, low added effort. Decision points at Year 3-4.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3 text-slate-400 font-medium">Field</th>
              <th className="text-left p-3 text-slate-400 font-medium">Credential</th>
              <th className="text-left p-3 text-slate-400 font-medium">Effort</th>
              <th className="text-left p-3 text-slate-400 font-medium hidden md:table-cell">Strongest Where</th>
            </tr>
          </thead>
          <tbody>
            {adjacentDomains.map((item, i) => (
              <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="p-3 text-white">{item.field}</td>
                <td className="p-3 text-blue-300">{item.credential}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${item.effort === 'Low' ? 'bg-green-500/20 text-green-400' : item.effort === 'Moderate' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.effort}
                  </span>
                </td>
                <td className="p-3 text-slate-400 hidden md:table-cell">{item.strongest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card p-4 bg-green-500/5 border-green-500/30">
        <p className="text-sm text-green-300">
          💡 <strong>Note:</strong> M&A/Transaction Advisory and Business/Data Analyst need NO additional certification — natural outputs of the existing plan, especially if Phase 2 = investment bank.
        </p>
      </div>
    </div>
  );
}

// ============ VISA ============
function VisaSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Visa & Mobility Strategy</h2>
        <p className="text-slate-400 mt-1">Honest difficulty ranking and realistic paths.</p>
      </div>

      <div className="space-y-4">
        {visaStrategy.map((item, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">{item.region}</h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                {item.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{item.route}</p>
            <p className="text-sm text-slate-300">{item.path}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">RELOCATION PATHS IN ORDER</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-bold text-sm">A</span>
            <div>
              <p className="text-sm text-white font-medium">Gulf (Primary)</p>
              <p className="text-xs text-slate-400">Big 4 and IBs with Gulf offices. Apply internally once inside — far easier than cold external.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-bold text-sm">B</span>
            <div>
              <p className="text-sm text-white font-medium">UK/EU</p>
              <p className="text-xs text-slate-400">ACCA recognized in 180+ countries. Skilled Worker Visa / EU Blue Card, employer-sponsored.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400 font-bold text-sm">C</span>
            <div>
              <p className="text-sm text-white font-medium">Internal Transfer</p>
              <p className="text-xs text-slate-400">Once inside MNC or regional bank/IB, internal mobility programs are lowest-friction path.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
