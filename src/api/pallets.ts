import axios from 'axios';

const API = 'http://localhost:8000/api/pallets/';

export const getPallets = () => axios.get(API);
export const getPallet = (id: string) => axios.get(`${API}${id}/`);
export const createPallet = (data: any) => axios.post(API, data);

export const cambiarEstado = (id: string) => axios.patch(`${API}${id}/cambiar_estado/`);
export const deletePallet = (id: string) => axios.delete(`${API}${id}/`);
