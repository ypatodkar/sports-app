import type { SportConfig } from '../types';

// Sport Configuration
export const sportConfig: Record<string, SportConfig> = {
  Cricket: { 
    icon: '🏏', 
    gradient: '#ddd6fe',
    suggestions: [
      'Virat Kohli stats', 
      'India vs Australia 2023', 
      'IPL 2024 winners', 
      'T20 World Cup records'
    ]
  },
  Soccer: { 
    icon: '⚽', 
    gradient: '#fecaca',
    suggestions: [
      'Messi career goals', 
      'Premier League table', 
      'Champions League 2024', 
      'World Cup winners'
    ]
  },
  Tennis: { 
    icon: '🎾', 
    gradient: '#bfdbfe',
    suggestions: [
      'Novak Djokovic Grand Slams', 
      'US Open 2024', 
      'ATP Rankings', 
      'Wimbledon champions'
    ]
  },
  F1: { 
    icon: '🏎️', 
    gradient: '#fcd34d',
    suggestions: [
      'Max Verstappen wins', 
      'Monaco GP results', 
      'F1 2024 standings', 
      'Lewis Hamilton records'
    ]
  },
  Basketball: { 
    icon: '🏀', 
    gradient: '#a5f3fc',
    suggestions: [
      'LeBron James stats', 
      'NBA Finals 2024', 
      'Stephen Curry 3-pointers', 
      'Lakers standings'
    ]
  },
};

export const sports = ['Cricket', 'Soccer', 'Tennis', 'F1', 'Basketball'] as const;

