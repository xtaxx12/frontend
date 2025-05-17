import { render, screen, fireEvent } from '@testing-library/react';
import { PalletForm } from '../PalletForm';
import '@testing-library/jest-dom';

jest.mock('../../api/pallets', () => ({
  createPallet: jest.fn(() => Promise.resolve())
}));

test('renderiza el formulario correctamente', () => {
  render(<PalletForm />);
  expect(screen.getByText(/registrar nuevo pallet/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/ID/i)).toBeInTheDocument();
});

test('puede completar y enviar el formulario', async () => {
  render(<PalletForm />);

  fireEvent.change(screen.getByPlaceholderText(/ID/i), { target: { value: 'P1001' } });
  fireEvent.change(screen.getByPlaceholderText(/^Origen$/i), { target: { value: 'SALMUERA' } });
  fireEvent.change(screen.getByPlaceholderText(/Empresa de Origen/i), { target: { value: 'EmpA' } });
  fireEvent.change(screen.getByPlaceholderText(/Empresa Destino/i), { target: { value: 'EmpB' } });
  fireEvent.change(screen.getByPlaceholderText(/Fecha/i), { target: { value: '2025-05-17' } });

  fireEvent.click(screen.getByRole('button', { name: /crear pallet/i }));

  
 
});
