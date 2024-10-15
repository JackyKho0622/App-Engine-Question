import React from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { TitleBar } from '@dynatrace/strato-components-preview/layouts';
import {
  convertToColumns,
  getDimensions,
} from '@dynatrace/strato-components-preview/conversion-utilities';
import {
  DataTable,
  TableColumn,
} from '@dynatrace/strato-components-preview/tables';
import { useDqlQuery } from '@dynatrace-sdk/react-hooks';
import { queryForQ1 } from './query1';
import { Heading } from '@dynatrace/strato-components';

export const HostList = () => {
  const result = useDqlQuery({
    body: {
      query: queryForQ1,
    },
  });

  const columns: TableColumn[] = [
    {
      header: 'ID',
      accessor: 'ID',
      autoWidth: true,
    },
    {
      header: 'Name',
      accessor: 'Name',
      autoWidth: true,
    },
    {
      header: 'AWS Instance Type',
      accessor: 'AWS Instance Type',
      autoWidth: true,
    },
  ];


  return (
    <Flex width="100%" flexDirection="column" justifyContent="center" gap={16}>
      
      <Heading as="h3" >EC2 instance cost overview</Heading>  
        {result.data && (
        <DataTable 
          data={result.data.records} columns={columns}
        >
          <DataTable.Pagination />
        </DataTable>
        
      )}
      
    </Flex>
  );
};