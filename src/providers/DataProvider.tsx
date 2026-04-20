'use client';

import { ReactNode, useEffect, useState } from 'react';
import { DataContext, SheetItem, SheetConfigItem, SheetPaymentItem, SheetProjectItem } from '../context/DataContext';
import { fetchGoogleSheet } from '../lib/googleSheet';

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<SheetItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGoogleSheet<string[][]>('A:Z');
        var result = MappingData(response);
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    const MappingData = (data: string[][]) => {
      if (data.length == 0) return null;
      let result = {} as SheetItem;
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.length == 0) continue;
        else if (row[0]?.toLocaleUpperCase().includes('END')) break;
        else if (row[0]?.toLocaleUpperCase().startsWith('USER INFORMATION')) {
          let mapping = MappingDataUser(data, i);
          result.config = mapping?.data || null;
          i = mapping?.nextIndex || i;
        }
        else if (row[0]?.toLocaleUpperCase().startsWith('PAYMENT INFORMATION')) {
          let mapping = MappingDataPayment(data, i);
          result.payment = mapping?.data || null;
          i = mapping?.nextIndex || i;
        }
        else if (row[0]?.toLocaleUpperCase().startsWith('PROJECT')) {
          let mapping = MappingDataProject(data, i);
          result.project = mapping?.data || null;
          i = mapping?.nextIndex || i;
        }
        // if (row[0]?.includes('LEVEL')) {
        //   result.level = MappingDataLevel(data, i);
        // }
        // if (row[0]?.includes('CATEGORY')) {
        //   result.category = MappingDataCategory(data, i);
        // }
        // if (row[0]?.includes('SOCIAL')) {
        //   result.social = MappingDataSocial(data, i);
        // }
      }
      return result;
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

const MappingDataUser = (data: string[][], index: number) => {
  if (data.length == 0) return null;
  let result = {} as SheetConfigItem;
  let length = 0;
  for (let i = index + 2; i <= data.length; i++) {
    const row = data[i];
    if (row[0]?.toLocaleUpperCase().endsWith('END')) break;
    result.config_name = row[1];
    result.config_logo = row[3];
    result.config_description = row[2];
    length++;
  }
  index += length + 2;
  return { data: result, nextIndex: index };
}

const MappingDataPayment = (data: string[][], index: number) => {
  if (data.length == 0) return null;
  let result = {} as SheetPaymentItem;
  let length = 0;
  for (let i = index + 2; i <= data.length; i++) {
    const row = data[i];
    if (row[0]?.toLocaleUpperCase().endsWith('END')) break;
    result.payment_account_name = row[1];
    result.payment_account_number = row[2];
    result.payment_bank_name = row[3];
    result.payment_qr = row[4];
    length++;
  }
  index += length + 2;
  return { data: result, nextIndex: index };
}

const MappingDataProject = (data: string[][], index: number) => {
  if (data.length == 0) return null;
  let result = [] as SheetProjectItem[];
  let length = 0;
  for (let i = index + 2; i <= data.length; i++) {
    const row = data[i];
    if (row[0]?.toLocaleUpperCase().endsWith('END')) break;
    result.push({
      project_id: row[0],
      project_name: row[1],
      project_description: row[2],
      project_url: row[3],
      project_pricing: Number(row[4]),
      project_thumb: row[5],
      project_best_seller: row[6] == "TRUE",
      project_level: row[7],
      project_category: row[8].split(","),
    });
    length++;
  }
  index += length + 2;
  return { data: result, nextIndex: index };
}