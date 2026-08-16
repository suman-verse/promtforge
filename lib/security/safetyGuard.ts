const lastActionTimestamps: Record<string, number> = {};

export function checkRateLimit(actionKey: string, cooldownMs: number = 600): { allowed: boolean; remainingSeconds: number } {
  const now = Date.now();
  const lastTime = lastActionTimestamps[actionKey] || 0;
  const elapsed = now - lastTime;

  if (elapsed < cooldownMs) {
    return {
      allowed: false,
      remainingSeconds: Math.ceil((cooldownMs - elapsed) / 1000),
    };
  }

  lastActionTimestamps[actionKey] = now;
  return { allowed: true, remainingSeconds: 0 };
}

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
}

export function validateHoneypot(honeypotValue?: string): boolean {
  return !honeypotValue || honeypotValue.trim() === '';
}
