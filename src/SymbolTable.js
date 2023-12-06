import React from 'react';
import { Table } from 'antd';

function LexicalTable({ tokens }) {
  const columns = [
    {
      title: 'Token',
      dataIndex: 'value',
      width: 150,
    },
    {
      title: 'Lexema',
      dataIndex: 'value',
      width: 150,
    },
    {
      title: 'Palabra reservada',
      dataIndex: 'type',
      width: 150,
    },
  ];

  const data = [];
for (let i = 0; i < tokens.length; i++) {
  data.push({
    key: i,
    value: tokens[i].value,
    value: tokens[i].value,
    type: tokens[i].type === 'reservada' ? 'true' : 'false',
  });
}
  return (
    <div className='table-symbol'>
      {tokens.length > 0 ? 
    <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    scroll={{
      y: 240,
    }}
  />
    : null}
    </div>
  );
}

export default LexicalTable;