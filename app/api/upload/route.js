import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,  // Disable body parsing for formidable
  },
};

export async function POST(req) {
  try {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public/assets');  // Set the upload directory

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });  // Create directory if it doesn't exist
      console.log(`Created directory: ${uploadDir}`);
    }

    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          reject(new Response(JSON.stringify({ error: 'Failed to parse form data' }), { status: 500 }));
          return;
        }

        const uploadedFile = files.file;  // Get the uploaded file
        if (!uploadedFile) {
          console.error('No file uploaded.');
          reject(new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 }));
          return;
        }

        // Path to save the uploaded file
        const filePath = path.join(uploadDir, uploadedFile.newFilename);
        console.log('Saving file to:', filePath);

        try {
          fs.renameSync(uploadedFile.filepath, filePath);  // Move the file
          resolve(new Response(JSON.stringify({ message: 'File uploaded successfully', filePath }), { status: 200 }));
        } catch (renameError) {
          console.error('Error saving file:', renameError);
          reject(new Response(JSON.stringify({ error: 'Error saving file' }), { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}
