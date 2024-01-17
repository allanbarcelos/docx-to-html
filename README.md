# DOCX to HTML Converter

This is a simple Node.js application that converts DOCX files to HTML using the [mammoth](https://github.com/mwilliamson/mammoth.js) library. It provides a basic web interface for uploading DOCX files and downloading the corresponding HTML files.

## Setup

1. Install the required dependencies by running:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   node app.js
   ```

   The server will start on port 3100, and you can access the application by navigating to [http://localhost:3100](http://localhost:3100) in your web browser.

## Usage

1. Access the home page by navigating to [http://localhost:3100](http://localhost:3100).
2. Upload a DOCX file using the provided form.
3. Click the "Convert to HTML" button.
4. The converted HTML file will be downloaded automatically.

## Dependencies

- [express](https://expressjs.com/): Web framework for Node.js
- [express-fileupload](https://www.npmjs.com/package/express-fileupload): Middleware for handling file uploads
- [mammoth](https://github.com/mwilliamson/mammoth.js): Library for converting .docx documents to HTML
- [fs](https://nodejs.org/api/fs.html): File system module for handling file operations
- [path](https://nodejs.org/api/path.html): Module for handling file paths

## Configuration

- The application is configured to use a temporary directory (`./tmp`) for storing uploaded DOCX files. You can customize this path by modifying the `tempFileDir` option in the `fileUpload` middleware.

## Disclaimer

This application is a basic example and may not cover all edge cases. Use it as a starting point and enhance it based on your specific requirements.
