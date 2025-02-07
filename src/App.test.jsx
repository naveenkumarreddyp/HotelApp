import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/Login', () => () => <div>Login Component</div>);
jest.mock('./components/Register', () => () => <div>Register Component</div>);
jest.mock('./components/Home', () => () => <div>Home Component</div>);
jest.mock('./components/Hotels', () => () => <div>Hotels Component</div>);
jest.mock('./components/HotelDetails', () => () => <div>HotelDetails Component</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test('renders login route', () => {
    render(
      <BrowserRouter initialEntries={['/login']}>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });

  test('renders register route', () => {
    render(
      <BrowserRouter initialEntries={['/register']}>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Register Component')).toBeInTheDocument();
  });
});