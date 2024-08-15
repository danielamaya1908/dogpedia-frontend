import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dogBackground from '../assets/img//vertical-shot-white-brown-dog-with-red-leash-green-grass.jpg'; // Asegúrate de tener esta imagen

// Define el tipo de datos para una raza de perro
interface DogBreed {
    _id: string;
    name: string;
    image: string;
    temperament: string;
    lifeExpectancy: string;
    weight: string;
    height: string;
}

const DogBreedDetail: React.FC = () => {
    const [dogBreed, setDogBreed] = useState<DogBreed | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchDogBreed = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dogbreeds/${id}`);
                setDogBreed(response.data);
            } catch (error) {
                console.error('Error fetching dog breed:', error);
            }
        };
        fetchDogBreed();
    }, [id]);

    if (!dogBreed) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${dogBackground})` }}>
            <div className="bg-black bg-opacity-60 min-h-screen flex flex-col items-center justify-center p-4">
                <motion.div 
                    className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">{dogBreed.name}</h2>
                    <div className="mb-6 overflow-hidden rounded-lg">
                        <motion.img
                            src={dogBreed.image}
                            alt={dogBreed.name}
                            className="w-full h-64 object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-700"><span className="font-semibold">Temperamento:</span> {dogBreed.temperament}</p>
                        <p className="text-gray-700"><span className="font-semibold">Expectativa de Vida:</span> {dogBreed.lifeExpectancy}</p>
                        <p className="text-gray-700"><span className="font-semibold">Peso:</span> {dogBreed.weight}</p>
                        <p className="text-gray-700"><span className="font-semibold">Altura:</span> {dogBreed.height}</p>
                    </div>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link 
                            to={`/dogbreeds/edit/${dogBreed._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Editar
                        </Link>
                        <Link 
                            to="/"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                        >
                            Volver a la lista
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DogBreedDetail;
