
import { createContext, useContext } from 'react';
import { DataContextModel, DataModel } from '@/model/DataContextModel';

export const DataContext = createContext<DataContextModel | undefined>(undefined);

export const useData = (): DataContextModel => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};