import React, { useState } from 'react';
import LexicalTable from './LexicalTable';
import { lexicalAnalyzer } from './LexicalAnalyzer';
import SymbolTable from './SymbolTable';
import symbol from './lexemes.json';
import { Row, Col, Button, Modal } from 'antd';
import './App.scss';

// Código del componente ParseFile
const ParseFile = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const reglasSintacticas = [
    {numero: "", descripcion
    : "Errores lexicos"},
    { numero: 1, descripcion: "Regla 1: Caracteres no reconocidos" },
    { numero: 2, descripcion: "Regla 2: Identificador no reconocido" },
    { numero: 3, descripcion: "Regla 3: Símbolo no reconocido" },
    { numero: 4, descripcion: "Regla 4: Comentarios no cerrados o mal formados" },
    { numero: 5, descripcion: "Regla 5: Manejo de espacios en blanco o caracteres de control" },
    { numero: 6, descripcion: "Regla 6: Manejo de tokens inesperados" },
    {numero: "", descripcion
    : "Errores sintacticos"},
    { numero: 7, descripcion: "Regla 7: Falta de punto y coma" },
    { numero: 8, descripcion: "Regla 8: Paréntesis no balanceados" },
    { numero: 9, descripcion: "Regla 9: Uso incorrecto de operadores" },
    { numero: 10, descripcion: "Regla 10: Estructura de sentencia inválida" },
    { numero: 11, descripcion: "Regla 11: Definición de función mal formada" },
    { numero: 12, descripcion: "Regla 12: Uso incorrecto de palabras clave" }
  ];

  return (
    <div>
      <Button type="primary" className='button' onClick={toggle}>
        Fichero de Parse
      </Button>
      <Modal
        centered
        visible={modal}
        onCancel={() => setModal(!modal)}
        footer={null}
      >
        <div className="symbol-table">
          <table>
            <thead>
              <tr>
                <th>Regla</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {reglasSintacticas.map((regla, index) => (
                <tr key={index}>
                  <td>{regla.numero}</td>
                  <td>{regla.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const analyzeInput = () => {
    try {
      const analyzedTokens = lexicalAnalyzer(inputValue);
      setOutput(analyzedTokens);
    } catch (error) {
      setOutput([{ type: 'error', value: error.message }]);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setOutput([]);
  };

  const tokens1 = symbol.map(item => ({
    value: item.nombre,
    type: item.tipo,
  }));

  return (
    <div className="app">
      <div className="title">
        <h1>Analizador Léxico</h1>
      </div>
      <Row align={"center"}>
        <Col span={12} align={"center"} className="input">
          <span className="in">Entrada</span>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            className="form-control"
            rows="5"
          />
        </Col>
        <Col span={12} align={"center"} className="output">
          <span className="out">Salida</span>
          <LexicalTable tokens={output} errorMessage={output.length > 0 && output[0].type === 'error' ? output[0].value : null} />
        </Col>
      </Row>
      <div className="button-container">
        <Button type="primary" onClick={analyzeInput} className="button">
          Analizar
        </Button>
        <Button
          type="primary"
          onClick={() => setModalOpen(true)}
          className="button"
        >
          Tabla de Símbolos
        </Button>
        <Button type="primary" onClick={clearInput} className="button">
            Limpiar
        </Button>
        <div className="parse-file-button">
        <ParseFile />
        </div>
      </div>

      <Modal
        centered
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <SymbolTable tokens={tokens1} />
      </Modal>
    </div>
  );
}

export default App;
