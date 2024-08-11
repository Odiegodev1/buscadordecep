import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./styles.css";
import api from './services/api';

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP!");
      return;
    }

    if (input.length !== 8) {
      alert("O CEP deve conter 8 dígitos!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      if (response.data.erro) {
        alert("CEP não encontrado!");
      } else {
        setCep(response.data);
      }
      setInput('');
    } catch {
      alert("Ops, erro ao buscar!");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="number"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
