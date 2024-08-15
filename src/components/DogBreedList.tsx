import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../images/IMG-20240511-WA0041.jpg'; // Imagen de fondo

// Define el tipo de datos para las razas de perros
interface DogBreed {
    _id: string;
    name: string;
    image: string;
    temperament: string;
    lifeExpectancy: string;
    weight: string;
    height: string;
}

const DogBreedList: React.FC = () => {
    const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDogBreeds();
    }, [page, searchTerm, selectedFilter]);

    const fetchDogBreeds = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/dogbreeds', {
                params: {
                    page,
                    limit: 10,
                    searchTerm,
                    selectedFilter
                }
            });
            setDogBreeds(response.data.dogBreeds);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching dog breeds:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/dogbreeds/${id}`);
            fetchDogBreeds();
        } catch (error) {
            console.error('Error deleting dog breed:', error);
        }
    };

    const filteredBreeds = dogBreeds.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              breed.temperament.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === '' || breed.temperament.toLowerCase() === selectedFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Obtener los temperamentos únicos
    const uniqueTemperaments = Array.from(new Set(dogBreeds.map(breed => breed.temperament))).filter(Boolean);

    return (
        <div className="relative min-h-screen bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-sm">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-50">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center text-white mb-8">Lista de Razas de Perro</h1>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <Link
                            to="/dogbreeds"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-sm w-full md:w-auto"
                        >
                            Agregar Nueva Raza
                        </Link>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar razas o temperamento..."
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                            />
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                            >
                                <option value="">Todos los temperamentos</option>
                                {uniqueTemperaments.map(temperament => (
                                    <option key={temperament} value={temperament}>{temperament}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Tarjetas de razas de perros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBreeds.length > 0 ? (
                            filteredBreeds.map(dogBreed => (
                                <motion.div
                                    key={dogBreed._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={dogBreed.image} alt={dogBreed.name} className="w-full h-48 object-cover"/>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-gray-800">{dogBreed.name}</h2>
                                        <p className="text-gray-600">Temperamento: {dogBreed.temperament}</p>
                                        <p className="text-gray-600">Expectativa de Vida: {dogBreed.lifeExpectancy}</p>
                                        <p className="text-gray-600">Peso: {dogBreed.weight}</p>
                                        <p className="text-gray-600">Altura: {dogBreed.height}</p>
                                        <div className="mt-4 flex justify-between">
                                            <Link
                                                to={`/dogbreeds/${dogBreed._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Detalles
                                            </Link>
                                            <Link
                                                to={`/dogbreeds/edit/${dogBreed._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(dogBreed._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center">No se encontraron razas.</p>
                        )}
                    </div>
                    {/* Controles de paginación */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2 text-white">{`Página ${page} de ${totalPages}`}</span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogBreedList;
