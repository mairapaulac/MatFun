import React, { useEffect, useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  type: 'correct' | 'incorrect' | 'timeout';
  points?: number;
  multiplier?: number;
  onClose: () => void;
}

export default function FeedbackModal({ 
  isOpen, 
  type, 
  points, 
  multiplier, 
  onClose 
}: FeedbackModalProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return <></>;

  const getContent = () => {
    switch (type) {
      case 'correct':
        return {
          title: 'Correto!',
          message: `+${points} pontos (${multiplier}x multiplicador)`,
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          icon: '✓'
        };
      case 'incorrect':
        return {
          title: 'Incorreto!',
          message: 'Tente novamente.',
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          icon: '✗'
        };
      case 'timeout':
        return {
          title: 'Tempo Esgotado!',
          message: 'Próxima questão...',
          bgColor: 'bg-orange-500',
          textColor: 'text-white',
          icon: '⏰'
        };
    }
  };

  const content = getContent();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-black/50" />
      <div className={`relative ${content.bgColor} ${content.textColor} px-8 py-6 rounded-2xl shadow-2xl transform transition-all duration-300 ${
        isVisible ? 'scale-100' : 'scale-75'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{content.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          <p className="text-lg">{content.message}</p>
        </div>
      </div>
    </div>
  );
}
