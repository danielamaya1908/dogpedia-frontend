import React, { useState, useEffect, useCallback } from 'react';
import { updateDogBreed, getDogBreedById } from '../api/dogBreedApi';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Importa el video local
import dogVideo from '../assets/media/202576-918431455.mp4';

const DogBreedEdit: React.FC = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [temperament, setTemperament] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const fetchDogBreed = useCallback(async () => {
        if (id) {
            try {
                const response = await getDogBreedById(id);
                const dogBreed = response.data;
                setName(dogBreed.name);
                setImage(dogBreed.image);
                setTemperament(dogBreed.temperament);
                setLifeExpectancy(dogBreed.lifeExpectancy);
                setWeight(dogBreed.weight);
                setHeight(dogBreed.height);
            } catch (error) {
                console.error('Error fetching dog breed:', error);
                setError('Error al obtener los datos de la raza de perro.');
            }
        }
    }, [id]);

    useEffect(() => {
        fetchDogBreed();
    }, [fetchDogBreed]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dogBreed = { name, image, temperament, lifeExpectancy, weight, height };
        try {
            if (id) {
                await updateDogBreed(id, dogBreed);
            }
            navigate('/dogbreeds');
        } catch (error) {
            console.error('Error updating dog breed:', error);
            setError('Error al actualizar los datos de la raza de perro.');
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 object-cover w-full h-full"
            >
                <source src={dogVideo} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </video>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative p-4 max-w-lg mx-auto bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-lg z-10 mt-12 lg:mt-24">
                <button
                    onClick={() => navigate('/dogbreeds')}
                    className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition duration-300"
                >
                    X
                </button>
                <motion.h2
                    className="text-2xl font-bold mb-4 text-center text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    Editar Raza de Perro
                </motion.h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Nombre:</label>
                        <input
                            type="text"
                            placeholder="Nombre de la raza"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Imagen URL:</label>
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Temperamento:</label>
                        <input
                            type="text"
                            placeholder="Temperamento de la raza"
                            value={temperament}
                            onChange={(e) => setTemperament(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Expectativa de Vida:</label>
                        <input
                            type="text"
                            placeholder="Expectativa de vida en años"
                            value={lifeExpectancy}
                            onChange={(e) => setLifeExpectancy(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Peso:</label>
                        <input
                            type="text"
                            placeholder="Peso en kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-1">Altura:</label>
                        <input
                            type="text"
                            placeholder="Altura en cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="col-span-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        Actualizar
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default DogBreedEdit;
