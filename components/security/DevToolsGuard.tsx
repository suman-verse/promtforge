'use client';

import { useEffect } from 'react';

export function DevToolsGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd && e.shiftKey) {
        // Block Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspector)
        if (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      if (isCtrlOrCmd && !e.shiftKey) {
        // Block Ctrl+U (View Source)
        if (e.key === 'U' || e.key === 'u') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    const clearConsole = () => {
      if (process.env.NODE_ENV === 'production') {
        try {
          console.clear();
          console.log(
            '%cPromptForge%c Protected Application',
            'color: #3b82f6; font-size: 20px; font-weight: bold;',
            'color: #94a3b8; font-size: 14px;'
          );
        } catch {}
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown, true);

    const interval = setInterval(clearConsole, 3000);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown, true);
      clearInterval(interval);
    };
  }, []);

  return null;
}
