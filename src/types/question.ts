// Types for Question Screen components

export type Multiplier = 8 | 4 | 2 | 1;

export interface TimerState {
  elapsedMs: number;
  remainingMs: number;
  progress: number; // 0..1
  multiplier: Multiplier;
}

export interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export interface QuestionSkeletonContext {
  questionDescriptor?: any; // ProblemDescriptor from backend
  playerDifficulty?: number;
  onFocus?: () => void;
}

export interface QuestionCardProps {
  questionNumber: number;
  moduleLabel: string;
  children: React.ReactNode; // the question skeleton
}

export interface TimeBarProps {
  progress: number; // 0..1
  totalMs?: number; // defaults 60000
  showLabels?: boolean;
}

export interface KeypadProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit?: () => void;
  keys?: string[]; // default digits + '/', '.', '⌫'
  disabled?: boolean;
}

export interface QuestionScreenProps {
  score: number;
  questionNumber: number;
  moduleLabel: string;
  questionSkeleton: React.ReactNode;
  initialAnswer?: string;
  currentAnswer?: string;
  onAnswerChange?: (answer: string) => void;
  totalMs?: number;
  onSubmit: (answer: string, metadata: { elapsedMs: number; multiplier: Multiplier }) => void;
  onTimeout?: () => void;
}

export interface SubmitMetadata {
  elapsedMs: number;
  multiplier: Multiplier;
}
