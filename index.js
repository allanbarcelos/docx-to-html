const express = require('express');
const fileUpload = require('express-fileupload'); // Importe o módulo express-fileupload
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp' // Substitua pelo caminho desejado
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public'))); // Para servir arquivos estáticos

// Página HTML incorporada no código JavaScript
const htmlPage = `
<!DOCTYPE html>
<html>
<head>
    <title>Conversor DOCX para HTML</title>
</head>
<body>
    <h1>Conversor DOCX para HTML</h1>
    <form action="/convert" method="post" enctype="multipart/form-data">
        <input type="file" name="docxFile" accept=".doc, .docx">
        <input type="submit" value="Converter para HTML">
    </form>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(htmlPage);
});

app.post('/convert', (req, res) => {
    if (!req.files || !req.files.docxFile) {
        return res.status(400).json({ error: 'You must provide a DOCX file.' });
    }

    const docxFile = req.files.docxFile;
    console.log('Caminho do arquivo temporário:', docxFile.tempFilePath);

    // Verifique se o arquivo DOCX foi carregado corretamente
    if (!fs.existsSync(docxFile.tempFilePath)) {
        return res.status(400).json({ error: 'Failed to upload the DOCX file.' });
    }

    mammoth.convertToHtml({ path: docxFile.tempFilePath })
        .then(result => {
            // res.send(result.value);

            // Defina os cabeçalhos para forçar o download
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${docxFile.name.replace('.docx', '').replace(/ /g, '_')}.html"`);

            // Envie o HTML como um arquivo de download
            res.send(htmlContent);

        })
        .catch(error => {
            res.status(500).json({ error: `Failed to convert DOCX to HTML` });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
