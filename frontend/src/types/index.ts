// TypeScript Interfaces and Types

export interface VideoClip {
  title: string;
  description: string;
  video_url: string;
}

export interface StatsData {
  summary: string;
  interesting_fact?: string;
  video_clips?: VideoClip[];
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface SearchHistory {
  query: string;
  sport: string;
  timestamp: number;
}

export interface SportConfig {
  icon: string;
  gradient: string;
  suggestions: string[];
}

export type SportName = 'Cricket' | 'Soccer' | 'Tennis' | 'F1' | 'Basketball';

export type ViewMode = 'table' | 'chart' | 'videos' | 'all';

