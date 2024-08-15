import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogBreedList from './components/DogBreedList';
import DogBreedForm from './components/DogBreedForm';
import DogBreedDetails from './components/DogBreedDetails';
import DogBreedEdit from './components/DogBreedEdit';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DogBreedList />} />
                <Route path="/dogbreeds" element={<DogBreedForm />} />
                <Route path="/dogbreeds/edit/:id" element={<DogBreedForm />} />
                <Route path="/dogbreeds/:id" element={<DogBreedDetails />} />
                <Route path="/dogbreeds/edit/:id" element={<DogBreedEdit />} />
            </Routes>
        </Router>
    );
};

export default App;
