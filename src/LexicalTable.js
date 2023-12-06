import React from 'react';
import { Table } from 'antd';

function LexicalTable({ tokens, errorMessage }) {
  if (tokens.length === 1 && tokens[0].includes('Error')) {
    return (
      <div className='container-table'>
        <div className="error-message">{tokens[0]}</div>
      </div>
    );
  }

  const columns = [
    {
      title: 'Token',
      dataIndex: 'value',
      width: 150,
    },
    {
      title: 'Lexema',
      dataIndex: 'lexema',
      width: 150,
    },
    {
      title: 'Palabra reservada',
      dataIndex: 'type',
      width: 150,
    },
  ];

  const data = tokens.map((token, index) => ({
    key: index,
    value: token.value,
    lexema: token.value,
    type: token.type === 'reservada' ? 'true' : 'false',
  }));

  return (
    <div className='container-table'>
      {tokens.length > 0 ? 
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{
            y: 327,
          }}
          bordered
        />
      :  null}
    </div>
  );
}

export default LexicalTable;
