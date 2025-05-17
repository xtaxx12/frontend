import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { PalletDetail } from './PalletDetail'; // Asegúrate de que la ruta sea correcta

interface Pallet {
  id: number;
  fecha: string;
  estado: string;
  origen: string;
}

export const PalletList = () => {
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<Pallet | null>(null);
  const [selectedPallet, setSelectedPallet] = useState<Pallet | null>(null);

  const fetchPallets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/pallets/');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPallets(data);
    } catch (err) {
      setError('Error al cargar los pallets');
      console.error('Error fetching pallets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePalletStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pallets/${id}/cambiar_estado/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setPallets(prev => prev.map(p => (p.id === id ? { ...p, estado: 'RECIBIDO' } : p)));
    } catch (err) {
      setError('Error al cambiar el estado del pallet');
      console.error('Error updating pallet status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar pallet?',
      text: `Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/pallets/${id}/`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        setPallets(prev => prev.filter(p => p.id !== id));
        Swal.fire('Eliminado', 'El pallet ha sido eliminado.', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el pallet.', 'error');
      }
    }
  };

  const handleEdit = (pallet: Pallet) => {
    setEditing(pallet);
  };

  const saveEdit = async () => {
    if (!editing) return;

    try {
      const response = await fetch(`http://localhost:8000/api/pallets/${editing.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setPallets(prev =>
        prev.map(p => (p.id === editing.id ? editing : p))
      );
      setEditing(null);
      Swal.fire('Actualizado', 'Pallet modificado correctamente.', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el pallet.', 'error');
    }
  };

  const handleRowClick = (pallet: Pallet) => {
    setSelectedPallet(pallet);
  };

  useEffect(() => {
    fetchPallets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Lista de Pallets</h2>

      {isLoading && <div className="text-center text-gray-600">Cargando pallets...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-50 text-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">Origen</th>
              <th className="px-6 py-3 text-center text-sm font-semibold border-b">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pallets.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(p)}
              >
                <td className="px-6 py-3 border-b">{p.id}</td>
                <td className="px-6 py-3 border-b">{p.fecha}</td>
                <td className={`px-6 py-3 border-b font-semibold ${p.estado === 'POR_RECIBIR' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {p.estado === 'POR_RECIBIR' ? 'Por recibir' : 'Recibido'}
                </td>
                <td className="px-6 py-3 border-b">{p.origen}</td>
                <td className="px-6 py-3 text-center border-b space-x-2">
                  {p.estado === 'POR_RECIBIR' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePalletStatus(p.id);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Recibir
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(p);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Editar Pallet ID {editing.id}</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  id="fecha"
                  type="date"
                  value={editing.fecha}
                  onChange={(e) => setEditing({ ...editing, fecha: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  id="estado"
                  value={editing.estado}
                  onChange={(e) => setEditing({ ...editing, estado: e.target.value })}
                  className="w-full border p-2 rounded bg-white"
                >
                  <option value="POR_RECIBIR">Por recibir</option>
                  <option value="RECIBIDO">Recibido</option>
                </select>
              </div>

              <div>
                <label htmlFor="origen" className="block text-sm font-medium text-gray-700 mb-1">
                  Origen
                </label>
                <input
                  id="origen"
                  type="text"
                  value={editing.origen}
                  onChange={(e) => setEditing({ ...editing, origen: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="desde_empresa" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa de Origen
                </label>
                <input
                  id="desde_empresa"
                  type="text"
                  value={(editing as any).desde_empresa || ''}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...(prev as any), desde_empresa: e.target.value }))
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="hacia_empresa" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa Destino
                </label>
                <input
                  id="hacia_empresa"
                  type="text"
                  value={(editing as any).hacia_empresa || ''}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...(prev as any), hacia_empresa: e.target.value }))
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle */}
      {selectedPallet && (
        <PalletDetail
          pallet={selectedPallet}
          onClose={() => setSelectedPallet(null)}
        />
      )}
    </div>
  );
};
