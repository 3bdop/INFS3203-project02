import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from './components/LoginScreen';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock Firebase signInWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock navigation object
const mockNavigation = {
  navigate: jest.fn(),
  replace: jest.fn(),
};

describe('LoginScreen', () => {
  test('successful login redirects to Feed', async () => {
    // Arrange
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
    const emailInput = getByPlaceholderText('example@gmail.com');
    const passwordInput = getByPlaceholderText('************');
    const loginButton = getByText('Log In');

    // Act
    fireEvent.changeText(emailInput, 'a@g.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(loginButton);

    // Assert
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'a@g.com', '123456');
      expect(mockNavigation.replace).toHaveBeenCalledWith('Feed', { email: 'a@g.com' });
    });
  });

//   test('displays error message for invalid credentials', async () => {
//     // Arrange
//     signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email or password'));
//     const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
//     const emailInput = getByPlaceholderText('example@gmail.com');
//     const passwordInput = getByPlaceholderText('************');
//     const loginButton = getByText('Log In');

//     // Act
//     fireEvent.changeText(emailInput, 'invalid@example.com');
//     fireEvent.changeText(passwordInput, 'invalidpassword');
//     fireEvent.press(loginButton);

//     // Assert
//     await waitFor(() => {
//       expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'invalid@example.com', 'invalidpassword');
//       expect(getByText('Incorrect Email or Password')).toBeTruthy();
//     });
//   });
});




//https://github.com/firebase/firebase-functions/issues/1373      //check this link