import React from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { TitleBar } from '@dynatrace/strato-components-preview/layouts';
import {
  convertToColumns,
  getDimensions,
} from '@dynatrace/strato-components-preview/conversion-utilities';
import {
  DataTable,
} from '@dynatrace/strato-components-preview/tables';
import { useDqlQuery } from '@dynatrace-sdk/react-hooks';
import { queryForQ1 } from './query1';
import { queryExecutionClient } from "@dynatrace-sdk/client-query";
import { Heading } from '@dynatrace/strato-components';

export const HostList = () => {
  const result = useDqlQuery({
    body: {
      query: queryForQ1,
    },
  });

//   const width = Dimensions.get('window').width;

  return (
    <Flex width="100%" flexDirection="column" justifyContent="center" gap={16}>
      
      <Heading as="h3" >EC2 instance cost overview</Heading>
      
        {result.data && (
        <DataTable 
        data={result.data.records} columns={convertToColumns(result.data.types)}
        >
        </DataTable>
      )}
      
    </Flex>
  );
};