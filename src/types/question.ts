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
  questionDescriptor?: Record<string, unknown>; // ProblemDescriptor from backend
  playerDifficulty?: number;
  onFocus?: () => void;
}

export interface QuestionCardProps {
  questionNumber: number;
  moduleLabel: string;
  children: React.ReactNode; // the question skeleton
  isDesktop?: boolean;
}

export interface TimeBarProps {
  progress: number; // 0..1
  totalMs?: number; // defaults 60000
  showLabels?: boolean;
}

export interface KeypadProps {
  onKeyPress: (key: string) => void; // Reports '0'-'9', '⌫', or 'toggle_focus'
  disabled?: boolean;
  isDesktop?: boolean;
  showToggleFocus?: boolean;
}

export interface QuestionScreenProps {
  score: number;
  questionNumber: number;
  moduleLabel: string;
  questionSkeleton: React.ReactNode;
  questionType?: string;
  initialAnswer?: string;
  currentAnswer?: string;
  onAnswerChange?: (answer: string) => void;
  totalMs?: number;
  onSubmit: (metadata: { elapsedMs: number; multiplier: Multiplier }) => void;
  onTimeout?: () => void;
  onKeypadPress?: (key: string) => void;
  fractionAnswer?: { numerator: string; denominator: string };
  isSubmitted: boolean;
}

export interface SubmitMetadata {
  elapsedMs: number;
  multiplier: Multiplier;
}
