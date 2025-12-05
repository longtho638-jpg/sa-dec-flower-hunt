import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface RoadmapPhase {
  title: string;
  period: string;
  focus: string;
  initiatives: string[];
  owner: string;
  status: 'completed' | 'in_progress' | 'pending';
}

const PHASES: RoadmapPhase[] = [
  {
    title: 'Phase 1: Foundation',
    period: 'Months 0-12',
    focus: 'Financial discipline, Governance basics, Growth traction',
    initiatives: [
      'Implement accrual accounting',
      'Appoint Advisory Board',
      'Achieve $1M ARR run-rate',
      'Standardize operational SOPs'
    ],
    owner: 'CEO & CFO',
    status: 'in_progress'
  },
  {
    title: 'Phase 2: Scale & Systems',
    period: 'Months 12-24',
    focus: 'ERP implementation, Audit readiness, Market expansion',
    initiatives: [
      'First external audit (Big 4)',
      'Form Board of Directors with independent member',
      'Deploy Oracle NetSuite / SAP',
      'Expand to 2 new regions'
    ],
    owner: 'COO & CFO',
    status: 'pending'
  },
  {
    title: 'Phase 3: IPO Launch',
    period: 'Months 24-36+',
    focus: 'Public company readiness, Roadshow, Listing',
    initiatives: [
      'Select Investment Bank / Underwriters',
      'Draft Prospectus',
      'Investor Roadshow',
      'Formal listing application to HOSE/HNX'
    ],
    owner: 'Board & Advisors',
    status: 'pending'
  }
];

export function IPORoadmap() {
  return (
    <div className="relative border-l border-stone-200 dark:border-stone-800 ml-3 space-y-10 py-4">
      {PHASES.map((phase, i) => (
        <div key={i} className="relative pl-8">
          <span
            className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-stone-50 dark:bg-stone-950 flex items-center justify-center ${
              phase.status === 'completed'
                ? 'border-green-500 text-green-500'
                : phase.status === 'in_progress'
                ? 'border-blue-500 text-blue-500'
                : 'border-stone-300 text-stone-300'
            }`}
          >
             {phase.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : phase.status === 'in_progress' ? <Clock className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
          </span>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{phase.title}</h3>
            <span className="text-sm text-stone-500 font-mono bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
              {phase.period}
            </span>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 italic">
            Focus: {phase.focus}
          </p>
          <Card className="mb-2">
            <CardContent className="pt-4">
                <h4 className="text-xs font-semibold uppercase text-stone-500 mb-3">Key Initiatives</h4>
                <ul className="grid gap-2 md:grid-cols-2">
                    {phase.initiatives.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-stone-300" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
                    <span className="text-xs font-medium text-stone-500">Owner: {phase.owner}</span>
                </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
