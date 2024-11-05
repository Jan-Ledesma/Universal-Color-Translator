import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorTranslator from './ColorTranslator';
import tinycolor from 'tinycolor2';
import '@testing-library/jest-dom';

// Mock tinycolor2 to control its behavior in tests
jest.mock('tinycolor2', () => jest.fn());

describe('ColorTranslator Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    tinycolor.mockClear();
  });

  test('displays the hex value when a valid color name is converted', () => {
    // Setup the mock to return a valid color
    tinycolor.mockImplementation(() => ({
      isValid: () => true,
      toHexString: () => '#FFFFFF',
    }));

    render(<ColorTranslator />);

    // Input a valid color name
    fireEvent.change(screen.getByLabelText(/Enter Color Name/i), {
      target: { value: 'white' },
    });

    // Click the Convert Color button
    fireEvent.click(screen.getByRole('button', { name: /Convert Color/i }));

    // Check if the hex value is displayed correctly
    expect(screen.getByText(/Hex Value: #FFFFFF/i)).toBeInTheDocument();
  });

  test('clears input and hides hex value when Clear button is clicked', () => {
    // Setup the mock to return a valid color
    tinycolor.mockImplementation(() => ({
      isValid: () => true,
      toHexString: () => '#FFFFFF',
    }));

    render(<ColorTranslator />);

    // Input a valid color name
    fireEvent.change(screen.getByLabelText(/Enter Color Name/i), {
      target: { value: 'white' },
    });

    // Click the Convert Color button
    fireEvent.click(screen.getByRole('button', { name: /Convert Color/i }));

    // Check if the hex value is displayed correctly
    expect(screen.getByText(/Hex Value: #FFFFFF/i)).toBeInTheDocument();

    // Click the Clear button
    fireEvent.click(screen.getByRole('button', { name: /Clear/i }));

    // Check if the input is cleared and hex value is hidden
    expect(screen.getByLabelText(/Enter Color Name/i).value).toBe('');
    expect(screen.queryByText(/Hex Value: #FFFFFF/i)).not.toBeInTheDocument();
  });

  test('displays "Invalid Color Name" for an invalid color', () => {
    // Setup the mock to return an invalid color
    tinycolor.mockImplementation(() => ({
      isValid: () => false,
    }));

    render(<ColorTranslator />);

    // Input an invalid color name
    fireEvent.change(screen.getByLabelText(/Enter Color Name/i), {
      target: { value: 'My name is Jan' },
    });

    // Click the Convert Color button
    fireEvent.click(screen.getByRole('button', { name: /Convert Color/i }));

    // Check if the "Invalid Color Name" message is displayed
    expect(screen.getByText(/Invalid Color Name/i)).toBeInTheDocument();
  });

  test('displays "Invalid Color Name" for an number input', () => {
    // Setup the mock to return an invalid color
    tinycolor.mockImplementation(() => ({
      isValid: () => false,
    }));

    render(<ColorTranslator />);

    // Input an invalid color name
    fireEvent.change(screen.getByLabelText(/Enter Color Name/i), {
      target: { value: 1 },
    });

    // Click the Convert Color button
    fireEvent.click(screen.getByRole('button', { name: /Convert Color/i }));

    // Check if the "Invalid Color Name" message is displayed
    expect(screen.getByText(/Invalid Color Name/i)).toBeInTheDocument();
  });
});
