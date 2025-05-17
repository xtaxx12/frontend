import { FC } from 'react';

interface PalletDetailProps {
  // Define tus props aquí si es necesario
  palletId: string;
}

export const PalletDetail: FC<PalletDetailProps> = ({ palletId }) => {
  // Lógica del componente
  
  return (
    <div>
      <h2>Detalle del Pallet {palletId}</h2>
      {/* Contenido del componente */}
    </div>
  );
};

// Alternativa con export default
export default PalletDetail;