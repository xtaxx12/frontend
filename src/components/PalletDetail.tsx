import { FC } from 'react';

interface Pallet {
  id: number;
  fecha: string;
  estado: string;
  origen: string;
}

interface PalletDetailProps {
  pallet: Pallet;
  onClose: () => void;
}

export const PalletDetail: FC<PalletDetailProps> = ({ pallet, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Detalle del Pallet #{pallet.id}</h2>
        <ul className="space-y-2">
          <li><strong>Fecha:</strong> {pallet.fecha}</li>
          <li><strong>Estado:</strong> {pallet.estado === 'POR_RECIBIR' ? 'Por recibir' : 'Recibido'}</li>
          <li><strong>Origen:</strong> {pallet.origen}</li>
        </ul>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PalletDetail;
