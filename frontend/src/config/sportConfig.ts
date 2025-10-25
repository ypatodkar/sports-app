import type { SportConfig } from '../types';

// Sport Configuration
export const sportConfig: Record<string, SportConfig> = {
  Cricket: { 
    icon: '🏏', 
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    suggestions: [
      'Virat Kohli stats', 
      'India vs Australia 2023', 
      'IPL 2024 winners', 
      'T20 World Cup records'
    ]
  },
  Soccer: { 
    icon: '⚽', 
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    suggestions: [
      'Messi career goals', 
      'Premier League table', 
      'Champions League 2024', 
      'World Cup winners'
    ]
  },
  Tennis: { 
    icon: '🎾', 
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    suggestions: [
      'Novak Djokovic Grand Slams', 
      'US Open 2024', 
      'ATP Rankings', 
      'Wimbledon champions'
    ]
  },
  F1: { 
    icon: '🏎️', 
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    suggestions: [
      'Max Verstappen wins', 
      'Monaco GP results', 
      'F1 2024 standings', 
      'Lewis Hamilton records'
    ]
  },
  Basketball: { 
    icon: '🏀', 
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    suggestions: [
      'LeBron James stats', 
      'NBA Finals 2024', 
      'Stephen Curry 3-pointers', 
      'Lakers standings'
    ]
  },
};

export const sports = ['Cricket', 'Soccer', 'Tennis', 'F1', 'Basketball'] as const;

