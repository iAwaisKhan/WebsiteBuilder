import { CanvasElement } from '../store/useStore';

export const exportToHTML = (elements: CanvasElement[]) => {
  const elementsHTML = elements.map(el => {
    const styleString = Object.entries(el.style)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}: ${value}`)
      .join('; ');
    
    return `<${el.tag} style="${styleString}">${el.content || ''}</${el.tag}>`;
  }).join('\n');

  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Site</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        * { box-sizing: border-box; }
    </style>
</head>
<body>
    ${elementsHTML}
</body>
</html>`;

  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.html';
  a.click();
};
