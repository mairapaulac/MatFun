import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Keypad from '../Keypad';

describe('Keypad', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default keys', () => {
    render(<Keypad {...defaultProps} />);
    
    // Check if all default keys are rendered
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('⌫')).toBeInTheDocument();
  });

  it('should call onChange when a digit is pressed', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Keypad {...defaultProps} onChange={onChange} />);
    
    await user.click(screen.getByText('5'));
    
    expect(onChange).toHaveBeenCalledWith('5');
  });

  it('should handle backspace correctly', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Keypad {...defaultProps} value="123" onChange={onChange} />);
    
    await user.click(screen.getByText('⌫'));
    
    expect(onChange).toHaveBeenCalledWith('12');
  });

  it('should handle custom keys', () => {
    const customKeys = ['A', 'B', 'C', 'D'];
    render(<Keypad {...defaultProps} keys={customKeys} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Keypad {...defaultProps} disabled={true} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should handle keyboard events', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Keypad {...defaultProps} onChange={onChange} />);
    
    const button = screen.getByText('5');
    button.focus();
    
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith('5');
  });

  it('should have proper accessibility attributes', () => {
    render(<Keypad {...defaultProps} />);
    
    const backspaceButton = screen.getByLabelText('Apagar último caractere');
    expect(backspaceButton).toBeInTheDocument();
    
    const digitButton = screen.getByLabelText('Inserir 5');
    expect(digitButton).toBeInTheDocument();
  });

  it('should not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Keypad {...defaultProps} disabled={true} onChange={onChange} />);
    
    await user.click(screen.getByText('5'));
    
    expect(onChange).not.toHaveBeenCalled();
  });
});
