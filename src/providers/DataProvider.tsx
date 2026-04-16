'use client';

import { ReactNode, useEffect, useState } from 'react';
import { DataContext, SheetItem } from '../context/DataContext';
import { fetchGoogleSheet } from '../lib/googleSheet';

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<SheetItem>({ config: { config_name: '', config_logo: '', config_description: '' }, payment: { payment_barcode: '', payment_bank_name: '', payment_account_number: '' }, project: [], level: [], category: [], social: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchGoogleSheet<string[][]>('A:Z');
        const json = await res;
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    const MappingData = (data: string[][]) => {
      let result: SheetItem = {
        config: { config_name: '', config_logo: '', config_description: '' },
        payment: { payment_barcode: '', payment_bank_name: '', payment_account_number: '' },
        project: [],
        level: [],
        category: [],
        social: []
      };
      let index = 0;
      let key = '';
      while (index < data.length) {
        const row = data[index];
        if (row[0].length == 0) {
          key = '';
        }
        else if (row[0] == 'User Information Start') {
          key = 'config';
          index++;
          continue;
        }

        switch (key) {
          case 'config':
            result.config.config_name = row[1];
        }
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};