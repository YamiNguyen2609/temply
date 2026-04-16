
interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function fetchGoogleSheet<T = any[]>(
  range: string
): Promise<T> {
  try {
    const response = await fetch(
      `/api/sheets?range=${encodeURIComponent(range)}`
    );

    if (!response.ok) {
      const error: ApiResponse<null> = await response.json();
      throw new Error(error.error || 'Failed to fetch sheet data');
    }

    const data: ApiResponse<T> = await response.json();
    return data.data || ([] as T);
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    throw error;
  }
}

export async function fetchGoogleSheetMultiple<T = any[]>(
  spreadsheetId: string,
  ranges: string[]
): Promise<T> {
  try {
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spreadsheetId, ranges }),
    });

    if (!response.ok) {
      const error: ApiResponse<null> = await response.json();
      throw new Error(error.error || 'Failed to fetch sheet data');
    }

    const data: ApiResponse<T> = await response.json();
    return data.data || ([] as T);
  } catch (error) {
    console.error('Error fetching Google Sheets:', error);
    throw error;
  }
}

export function convertSheetDataToObjects<T extends Record<string, any>>(
  rows: string[][]
): T[] {
  if (!rows || rows.length === 0) return [];

  const [headers, ...dataRows] = rows;

  return dataRows.map((row) => {
    const obj: Record<string, any> = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });

    return obj as T;
  });
}

export function convertGoogleDriveLinkToWebView(
  driveLink: string
): string {
  if (!driveLink || typeof driveLink !== 'string') {
    return '';
  }

  const match = driveLink.match(/\/file\/d\/([^\/]+)/);
  if (!match) {
    return driveLink;
  }

  const fileId = match[1];
  return `https://lh3.googleusercontent.com/u/0/d/${fileId}`;
}