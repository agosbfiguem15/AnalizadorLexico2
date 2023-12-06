import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Table } from 'reactstrap';
import { Table } from 'antd';

const ParseFile = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button type="primary" className='button' onClick={toggle}>
        Fichero de Parse
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalFooter>
          <Button className='button-modal' onClick={() => setModal(!modal)}>
            X
          </Button>
        </ModalFooter>
        <ModalBody>
          <Table>
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
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ParseFile;
