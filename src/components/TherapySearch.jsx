import { useState } from 'react';
import '../styles/TherapySearch.css';

function TherapyFilter() {
  const [selectedService, setSelectedService] = useState('online'); // Estado para el switch

  return (
    <div className="filter-container">
      <div className="therapy-options">
        {/* Switch de Terapia Online / Presencial */}
        <div
          className={`therapy-switch ${selectedService === 'online' ? 'online' : 'presencial'}`}
        >
          <button
            className={`therapy-option ${selectedService === 'online' ? 'active' : ''}`}
            onClick={() => setSelectedService('online')}
          >
            Terapia Online
          </button>
          <button
            className={`therapy-option ${selectedService === 'presencial' ? 'active' : ''}`}
            onClick={() => setSelectedService('presencial')}
          >
            Terapia Presencial
          </button>
        </div>
      </div>

      {/* Campos de Filtro */}
      <div className="search-fields">
        <select className="search-input-services">
          <option value="">Todos los servicios</option>
          <option value="ansiedad">Terapia de Ansiedad</option>
          <option value="depresion">Terapia de Depresión</option>
        </select>

        <select className="search-input-services">
          <option value="">Todas las regiones</option>
          <option value="managua">Managua</option>
          <option value="leon">León</option>
        </select>

        <button className="search-button-services">Buscar</button>
      </div>
    </div>
  );
}

export default TherapyFilter;
