// Map Russian layout keys to English equivalents
const KEY_MAP: { [key: string]: string } = {
  'ф': 'a',  // A key in Russian layout
  'в': 'd',  // D key in Russian layout
  'ц': 'w',  // W key in Russian layout
};

export const mapKey = (key: string): string => {
  const lowerKey = key.toLowerCase();
  return KEY_MAP[lowerKey] || lowerKey;
};

export const isGameKey = (mappedKey: string): boolean => {
  return ['arrowleft', 'arrowright', 'arrowup', 'a', 'd', 'w'].includes(mappedKey);
};

export const setupKeyboardControls = (
  keysPressed: Set<string>,
  onPauseToggle: () => void
): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle space separately
    if (e.key === ' ') {
      e.preventDefault();
      keysPressed.add(' ');
      return;
    }

    const mappedKey = mapKey(e.key);

    if (isGameKey(mappedKey)) {
      e.preventDefault();
      keysPressed.add(mappedKey);
    }

    if (e.key === 'Escape') {
      onPauseToggle();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      keysPressed.delete(' ');
      return;
    }

    const mappedKey = mapKey(e.key);
    keysPressed.delete(mappedKey);
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
};
