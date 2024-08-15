import axios from 'axios';

const API_URL = 'http://localhost:3000/api/dogbreeds';

export const getAllDogBreeds = () => axios.get(API_URL);
export const getDogBreedById = (id: string) => axios.get(`${API_URL}/${id}`);
export const createDogBreed = (dogBreed: any) => axios.post(API_URL, dogBreed);
export const updateDogBreed = (id: string, dogBreed: any) => axios.put(`${API_URL}/${id}`, dogBreed);
export const deleteDogBreed = (id: string) => axios.delete(`${API_URL}/${id}`);
