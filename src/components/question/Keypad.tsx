import React from 'react';
import { KeypadProps } from '@/types/question';
import { DeleteIcon } from 'lucide-react';
const DEFAULT_KEYS = [
  '7', '8', '9', '⌫',
  '4', '5', '6', '0',
  '1', '2', '3', '',
 
];

export default function Keypad({ 
  value, 
  onChange, 
  onSubmit, 
  keys = DEFAULT_KEYS,
  disabled = false,
  isDesktop = false
}: KeypadProps): React.JSX.Element {
  
  const handleKeyPress = (key: string) => {
    if (disabled) return;

    if (key === '⌫') {
      // Backspace
      onChange(value.slice(0, -1));
    } else if (key === '') {
      // Empty key - do nothing
      return;
    } else {
      // Add character
      onChange(value + key);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, key: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleKeyPress(key);
    }
  };

  return (
    <div className={`grid grid-cols-4 gap-3 w-full mx-auto ${
      isDesktop ? 'max-w-lg gap-4' : 'max-w-sm'
    }`}>
      {keys.map((key, index) => {
        const isEmpty = key === '';
        const isBackspace = key === '⌫';
        
        return (
          <button
            key={`${key}-${index}`}
            type="button"
            disabled={disabled || isEmpty}
            onClick={() => handleKeyPress(key)}
            onKeyDown={(e) => handleKeyDown(e, key)}
            className={`
              rounded-xl font-bold transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
              ${isDesktop 
                ? 'w-24 h-24 text-[56px]' 
                : 'w-20 h-20 text-[48px]'
              }
              ${isEmpty 
                ? 'invisible' 
                : isBackspace
                  ? 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white'
              }
              active:scale-95 disabled:active:scale-100
              shadow-lg hover:shadow-xl
            `}
            aria-label={
              isBackspace 
                ? 'Apagar último caractere' 
                : `Inserir ${key}`
            }
            role="button"
            tabIndex={disabled || isEmpty ? -1 : 0}
          >
            {isBackspace ? (
              <DeleteIcon size={isDesktop ? 60 : 50}></DeleteIcon>
            ) : (
              key
            )}
          </button>
        );
      })}
    </div>
  );
}
