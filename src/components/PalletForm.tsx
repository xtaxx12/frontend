import { useState } from 'react';
import { createPallet } from '../api/pallets';
import Swal from 'sweetalert2';

export const PalletForm = () => {
  const [form, setForm] = useState({
    id: '',
    fecha: '',
    estado: 'POR_RECIBIR',
    origen: '',
    desde_empresa: '',
    hacia_empresa: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPallet({ ...form, tipo: 'INGRESO' });

      Swal.fire({
        title: '✅ Pallet creado',
        text: 'El pallet ha sido registrado exitosamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });

      setForm({
        id: '',
        fecha: '',
        estado: 'POR_RECIBIR',
        origen: '',
        desde_empresa: '',
        hacia_empresa: ''
      });

    } catch (error: any) {
      const errorData = error.response?.data;

      Swal.fire({
        title: '❌ Error al crear el pallet',
        
        icon: 'error',
        confirmButtonColor: '#d33'
      });

      console.error('Error detallado:', errorData);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrar Nuevo Pallet</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="id" placeholder="ID" value={form.id} onChange={handleChange} required className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" name="fecha" placeholder="Fecha" value={form.fecha} onChange={handleChange} required className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <label htmlFor="estado" className="sr-only">Estado del Pallet</label>
          <select id="estado" name="estado" value={form.estado} onChange={handleChange} required className="border rounded-lg p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="POR_RECIBIR">Por Recibir</option>
            <option value="RECIBIDO">Recibido</option>
          </select>
          <input type="text" name="origen" placeholder="Origen" value={form.origen} onChange={handleChange} required className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="desde_empresa" placeholder="Empresa de Origen" value={form.desde_empresa} onChange={handleChange} required className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="hacia_empresa" placeholder="Empresa Destino" value={form.hacia_empresa} onChange={handleChange} required className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="text-center">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
            Crear Pallet
          </button>
        </div>
      </form>
    </div>
  );
};
