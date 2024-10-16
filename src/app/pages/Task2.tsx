import React, { Profiler, useEffect, useState } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Text } from '@dynatrace/strato-components';
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
import { Heading } from '@dynatrace/strato-components';
import { ProgressCircle } from '@dynatrace/strato-components';
import { functions } from '@dynatrace-sdk/app-utils';
import { queryForQ2 } from '../queries/query2';

interface EC2Record {
  id: string;
  name: string;
  awsInstanceType: string;
}

export const Task2 = () => {
  const [price, setPrice] = useState({});
  let total = 0;

  const getPrice = async ()=>{
    try{
      const res = await functions.call('get-price-data',{data:{active:true}});
      const result = await res.json();
      // console.log("Price Data:", result);
      setPrice(result);
    }catch(error){
      console.error(error);
    }
  } ;
  
  const EC2 = useDqlQuery({
    body: {
      query: queryForQ2,
    },
  });

  useEffect(()=>{
    getPrice();
  },[]);

  const columns: TableColumn[] = [
    {
      header: 'ID',
      accessor: 'id',
      autoWidth: true,
    },
    {
      header: 'Name',
      accessor: 'name',
      autoWidth: true,
    },
    {
      header: 'AWS Instance Type',
      accessor: 'awsInstanceType',
      autoWidth: true,
    },
    {
      header: 'Price[$/h]',
      accessor: 'price',
      autoWidth: true,
      // to compare the instance with the mapping of the instancetype get from api
      cell: ({row}) => {
        
        const instancePrice = price[row.original.awsInstanceType];
        return(
          <DataTable.Cell>{instancePrice}</DataTable.Cell>
        );
      },
      columnType:'number',
    },
  ];

  EC2.data?.records.forEach((item) => {
    // console.log(item);
    // console.log(item?.awsInstanceType);
    // console.log(price);

    item!=null && item.awsInstanceType!=null ? total += price[(item.awsInstanceType).toString()] : 0;
    
  });

  return (
    <Flex width="100%" flexDirection="column" justifyContent="center" gap={16}>
      
      <Heading as="h3" >EC2 instance cost overview</Heading> 
        {EC2.isLoading && <ProgressCircle />} 
        <Text as="p">
          Your EC2 instance costs are ${total.toFixed(2)}
        </Text>
        {EC2.data && (
        <DataTable 
          data={EC2.data.records} columns={columns}
        >
          <DataTable.Pagination />
        </DataTable>

      )}
    </Flex>
  );
};