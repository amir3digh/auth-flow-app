'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={styles.toggle} onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeToggle; 