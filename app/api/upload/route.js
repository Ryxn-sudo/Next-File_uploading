import {NextResponse} from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline)

export const config = {
  api: {
    bodyParser: false,  // Disable body parsing for formidable
  },
};

export async function POST(req,res) {
  try {
    const formData = await req.formData();
    const file = formData.getAll('files')[0]
    const filePath = `./public/assets/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({status:"success",data:file.size})

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });  // Create directory if it doesn't exist
      console.log(`Created directory: ${uploadDir}`);
    }

  } catch (error) {
    console.error('Unexpected server error:', error);
    return  NextResponse.json({status:"fail",data:e})
  }
}
