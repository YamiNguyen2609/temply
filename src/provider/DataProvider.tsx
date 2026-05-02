'use client';

import { ReactNode, useEffect, useState } from 'react';
import slugify from 'slugify'
import { fetchGoogleSheet } from '../lib/googleSheet';
import { DataContext } from '../context/DataContext';
import { DataModel, DataContextModel } from '@/model/DataContextModel';
import DataValueModel from '@/model/DataValueModel';
import DataSocialModel from '@/model/SocialModel';
import ProjectModel from '@/model/ProjectModel';
import PaymentModel from '@/model/PaymentModel';
import SocialModel from '@/model/SocialModel';

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<DataModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGoogleSheet<string[][]>('A:Z');
        const result = await getAllData(response);
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

async function getAllData(data: string[][]): Promise<DataModel> {
  const [configuration, payment, project, category, complexity, social] = await Promise.all([
    getConfiguration(data),
    getPayment(data),
    getProject(data),
    getCategory(data),
    getComplexity(data),
    getSocial(data),
  ]);
  return {
    configuration,
    payment,
    project,
    category,
    complexity,
    social,
  };
}

/**
 * Find section boundaries in sheet
 */
function findSection(data: string[][], startMarker: string, endMarker: string): { start: number; end: number } {
  let start = -1;
  let end = -1;

  for (let i = 0; i < data.length; i++) {
    const row = data[i][0] || '';
    if (row.toUpperCase().includes(startMarker.toUpperCase())) {
      start = i + 1; // Skip header row
    }
    if (row.toUpperCase().includes(endMarker.toUpperCase())) {
      end = i;
      break;
    }
  }

  return { start, end };
}

/**
 * Get Configuration
 */
async function getConfiguration(data: string[][]): Promise<DataValueModel | null> {
  const section = findSection(data, 'Configuration Start', 'Configuration End');
  if (section.start === -1 || section.end === -1) return null;
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Configuration_')) {
      return {
        id: row[0] || '',
        key: row[1] || '',
        value: row[2] || '',
      };
    }
  }

  return null;
}

/**
 * Get Payment
 */
async function getPayment(data: string[][]): Promise<PaymentModel | null> {
  const section = findSection(data, 'Payment Start', 'Payment End');
  if (section.start === -1 || section.end === -1) return null;
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Payment_')) {
      return {
        account_name: row[1] || '',
        account_number: row[2] || '',
        bank_name: row[3] || '',
        qr: row[4] || '',
      };
    }
  }

  return null;
}

/**
 * Get Category
 */
async function getCategory(data: string[][]): Promise<DataValueModel[] | null> {
  const section = findSection(data, 'Category Start', 'Category End');
  if (section.start === -1 || section.end === -1) return null;
  var result: DataValueModel[] = [];
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Category_')) {
      result.push({
        id: row[0] || '',
        key: row[1] || '',
        value: row[2] || '',
      });
    }
  }

  return result;
}

/**
 * Get Complexity
 */
async function getComplexity(data: string[][]): Promise<DataValueModel[] | null> {
  const section = findSection(data, 'Complexity Start', 'Complexity End');
  if (section.start === -1 || section.end === -1) return null;
  var result: DataValueModel[] = [];
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Complexity_')) {
      result.push({
        id: row[0] || '',
        key: row[1] || '',
        value: row[2] || '',
      });
    }
  }
  return result;
}

/**
 * Get Social
 */
async function getSocial(data: string[][]): Promise<SocialModel[] | null> {
  const section = findSection(data, 'Social Start', 'Social End');
  if (section.start === -1 || section.end === -1) return null;
  var result: SocialModel[] = [];
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Social_')) {
      result.push({
        id: row[0] || '',
        name: row[1] || '',
        displayName: row[2] || '',
        url: row[3] || '',
      });
    }
  }

  return result;
}

/**
 * Get Project
 */
async function getProject(data: string[][]): Promise<ProjectModel[] | null> {
  const section = findSection(data, 'Project Start', 'Project End');
  if (section.start === -1 || section.end === -1) return null;
  var result: ProjectModel[] = [];
  // Find the data row (skip header)
  for (let i = section.start; i < section.end; i++) {
    const row = data[i];
    if (row[0].startsWith('Project_')) {
      result.push({
        id: row[0] || '',
        name: row[1] || '',
        description: row[2] || '',
        url: row[3] || '',
        pricing: parseInt(row[4]) || 0,
        thumbnail: row[5] || '',
        bestSeller: row[6] === 'TRUE',
        complexity: row[7] || '',
        categories: row[8]?.split(',').map((cat: string) => cat.trim()) || [],
        slug: slugify(`${row[0]}-${row[1]}`, { lower: true, strict: true }),
      });
    }
  }

  return result;
}


