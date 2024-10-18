import React, { Profiler, useEffect, useState } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Text } from '@dynatrace/strato-components';
import {
  convertToColumns,
  convertToTimeseries,
  getDimensions,
} from '@dynatrace/strato-components-preview/conversion-utilities';
import {
  DataTable,
  TABLE_EXPANDABLE_DEFAULT_COLUMN,
  TableColumn,
} from '@dynatrace/strato-components-preview/tables';
import { useDqlQuery } from '@dynatrace-sdk/react-hooks';
import { Heading } from '@dynatrace/strato-components';
import { ProgressCircle } from '@dynatrace/strato-components';
import { functions } from '@dynatrace-sdk/app-utils';
import { queryForQ2 } from '../queries/query2';
import { TimeseriesChart } from '@dynatrace/strato-components-preview';

export const Task3 = () => {
  const [price, setPrice] = useState({});
  let total = 0;

  const getPrice = async ()=>{
    try{
      const res = await functions.call('get-price-data',{data:{active:true}});
      const result = await res.json();
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

  const fetchCPUUsageMetrics = (entityId) => useDqlQuery({
    body: {
      query: `data 
record(CPU = array(28.26,27.94,28.29,28.70,28.63,28.32,28.56,29.35,28.47), dt.entity.ec2_instance = "EC2_INSTANCE-12E75C1A343DAB90", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(21.16,19.52,20.51,19.42,19.35,19.42,19.97,20.53,19.52), dt.entity.ec2_instance = "EC2_INSTANCE-211185EFB8A5A59D", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(2.87,2.83,2.86,2.84,2.84,2.87,2.84,2.83,2.87), dt.entity.ec2_instance = "EC2_INSTANCE-56ED6F3F544C46E7", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(12.07,11.61,11.71,11.04,12.38,12.86,11.87,11.83,13.30), dt.entity.ec2_instance = "EC2_INSTANCE-7F74BA855D16461C", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(2.32,2.34,2.34,2.33,2.36,2.37,2.34,2.35,2.37), dt.entity.ec2_instance = "EC2_INSTANCE-9328ACB598C4419A", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(2.23,2.22,2.21,2.24,2.23,2.24,2.24,2.24,2.24), dt.entity.ec2_instance = "EC2_INSTANCE-97A4036C98C107C6", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(3.33,3.30,3.29,3.36,3.34,3.30,3.32,3.28,3.27), dt.entity.ec2_instance = "EC2_INSTANCE-B8B3B489C7BE7469", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(1.55,1.49,1.67,1.49,1.51,1.68,1.61,1.38,1.34), dt.entity.ec2_instance = "EC2_INSTANCE-E567A65166A68BDA", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(12.73,12.12,12.41,12.57,12.22,13.00,13.52,12.35,11.52), dt.entity.ec2_instance = "EC2_INSTANCE-E937EA86DBEEBE2B", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),
record(CPU = array(53.71,46.32,45.36,43.39,48.75,46.67,41.65,44.62,39.69), dt.entity.ec2_instance = "EC2_INSTANCE-FF5E8C16035D4177", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns"))
|fieldsRename id = dt.entity.ec2_instance | filter id == "${entityId}" `
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
    {
        ...TABLE_EXPANDABLE_DEFAULT_COLUMN,
    }
  ];

  EC2.data?.records.forEach((item) => {
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
        <DataTable data={EC2.data.records} columns={columns} >
            <DataTable.ExpandableRow>
                {({ row }) => {
                    // console.log(row);
                    const cpuMetrics = fetchCPUUsageMetrics(row.id);
                    
                    console.log(cpuMetrics);
                    return (
                        <Flex flexDirection='column'>
                            <Heading as='h4'>CPU Usage</Heading>
                            {cpuMetrics.isLoading ? (<ProgressCircle/>) :(
                            <TimeseriesChart 
                            data={convertToTimeseries(cpuMetrics.data?cpuMetrics.data.records:[],cpuMetrics.data?cpuMetrics.data.types: [] )}
                            gapPolicy="connect"
                            variant="line"/>)}
                        </Flex>
                        
                    );
                }}
            </DataTable.ExpandableRow>
          <DataTable.Pagination />
        </DataTable>

      )}
    </Flex>
  );
};