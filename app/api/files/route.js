import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'public/assets');
  
  try {
    const files = await fs.readdir(dir);  // Read all files in the public/assets folder
    const wordFiles = files.filter(file => file.endsWith('.docx') || file.endsWith('.doc'));  // Filter for Word files
    
    return new Response(JSON.stringify(wordFiles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read files' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
