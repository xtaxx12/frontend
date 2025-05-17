import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra título de la app', () => {
  render(<App />);
  expect(screen.getByText(/Gestión de Pallets/i)).toBeInTheDocument();
});
