import { createContext, useContext } from 'react';
import { inflate } from 'zlib';

export interface SheetConfigItem {
    config_name: string;
    config_logo: string;
    config_description: string;
}

export interface SheetPaymentItem {
    payment_account_name: string;
    payment_account_number: string;
    payment_bank_name: string;
    payment_qr: string;
}

export interface SheetProjectItem {
    project_id: string;
    project_name: string;
    project_description: string;
    project_url: string;
    project_pricing: number;
    project_thumb: string;
    project_best_seller: boolean;
    project_level: string;
    project_category: string[];
}

export interface SheetSocialItem {
    social_name: string;
    social_display_name: string;
    social_url: string;
}

export interface SheetLevelItem {
    level_id: string;
    level_name: string;
}

export interface SheetCategoryItem {
    category_id: string;
    category_name: string;
}

export interface SheetItem {
    config: SheetConfigItem | null;
    payment: SheetPaymentItem | null;
    project: SheetProjectItem[] | null;
    level: SheetLevelItem[] | null;
    category: SheetCategoryItem[] | null;
    social: SheetSocialItem[] | null;
}

interface DataContextType {
    data: SheetItem | null;
    loading: boolean;
    error: string | null;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};