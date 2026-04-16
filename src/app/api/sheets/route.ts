import { google } from 'googleapis';
import { NextRequest } from 'next/server';

const sheets = google.sheets('v4');

// 🔐 Auth config
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL as string,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// 📦 Kiểu response chung
interface ApiResponse<T> {
    success?: boolean;
    data?: T;
    error?: string;
    details?: string;
}

// 📌 GET: fetch 1 range
export async function GET(request: NextRequest): Promise<Response> {
    try {
        const { searchParams } = new URL(request.url);
        const spreadsheetId = process.env.SHEET_ID as string;
        let range = searchParams.get('range');
        range = `${process.env.SHEET_NAME}!${range}`
        if (!spreadsheetId || !range) {
            const result: ApiResponse<null> = {
                error: 'Missing required parameters: spreadsheetId and range',
            };

            return Response.json(result, { status: 400 });
        }

        const authClient = await auth.getClient();

        const response = await sheets.spreadsheets.values.get({
            auth: authClient as any,
            spreadsheetId,
            range,
        });

        const values: string[][] = response.data.values || [];

        const result: ApiResponse<string[][]> = {
            success: true,
            data: values,
        };

        return Response.json(result, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching Google Sheets data:', error);

        const result: ApiResponse<null> = {
            error: 'Failed to fetch data from Google Sheets',
            details: error instanceof Error ? error.message : 'Unknown error',
        };

        return Response.json(result, { status: 500 });
    }
}

// 📌 POST: fetch multiple ranges
export async function POST(request: NextRequest): Promise<Response> {
    try {
        const body: {
            spreadsheetId?: string;
            ranges?: string[];
        } = await request.json();

        const { spreadsheetId, ranges } = body;

        if (!spreadsheetId || !ranges || !Array.isArray(ranges)) {
            const result: ApiResponse<null> = {
                error: 'Missing required fields: spreadsheetId and ranges (array)',
            };

            return Response.json(result, { status: 400 });
        }

        const authClient = await auth.getClient();

        const response = await sheets.spreadsheets.values.batchGet({
            auth: authClient as any,
            spreadsheetId,
            ranges,
        });

        const valueRanges = response.data.valueRanges || [];

        const data = valueRanges.map((vr) => ({
            range: vr.range || '',
            values: (vr.values || []) as string[][],
        }));

        const result: ApiResponse<typeof data> = {
            success: true,
            data,
        };

        return Response.json(result, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching Google Sheets data:', error);

        const result: ApiResponse<null> = {
            error: 'Failed to fetch data from Google Sheets',
            details: error instanceof Error ? error.message : 'Unknown error',
        };

        return Response.json(result, { status: 500 });
    }
}