import { FiX, FiFileText, FiDownload, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import jsPDF from "jspdf";

// ✅ Adaugă interfața aici în loc să o importe
interface SalesApplication {
  id: string;
  client: string;
  product: string;
  amount: number;
  status: string;
  agent: string;
  score: number;
}

interface DocsModalProps {
  app: SalesApplication | null;
  onClose: () => void;
}

interface Document {
  name: string;
  type: 'pdf' | 'image';
}

export default function DocsModal({ app, onClose }: DocsModalProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);

  if (!app) return null;

  const documents: Document[] = [
    { name: "Cerere Credit.pdf", type: 'pdf' },
    { name: "CI Client.jpg", type: 'image' },
    { name: "Adeverință venit.pdf", type: 'pdf' },
  ];

  const fixDiacritics = (text: string) => {
    const map: { [key: string]: string } = {
      'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
      'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
    };
    return text.replace(/[ăâîșțĂÂÎȘȚ]/g, (match) => map[match] || match);
  };

  const addTextWithDiacritics = (
    doc: jsPDF, 
    text: string, 
    x: number, 
    y: number, 
    options?: { align?: 'left' | 'center' | 'right' }
  ) => {
    try {
      doc.text(text, x, y, options);
    } catch {
      const cleanText = fixDiacritics(text);
      doc.text(cleanText, x, y, options);
    }
  };

  const generateCerereCredit = () => {
    const doc = new jsPDF();
    
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    addTextWithDiacritics(doc, 'Vive Credit', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, 'Cerere de Credit', 105, 25, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'CERERE DE CREDIT', 105, 50, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let y = 70;
    const fields = [
      { label: 'Numar cerere:', value: app.id },
      { label: 'Nume solicitant:', value: app.client },
      { label: 'Tip produs:', value: app.product },
      { label: 'Suma solicitata:', value: `${app.amount} RON` },
      { label: 'Status cerere:', value: app.status },
      { label: 'Agent responsabil:', value: app.agent },
      { label: 'Scor credit:', value: app.score.toString() },
    ];
    
    fields.forEach(field => {
      doc.setFont('helvetica', 'bold');
      addTextWithDiacritics(doc, field.label, 30, y);
      doc.setFont('helvetica', 'normal');
      addTextWithDiacritics(doc, field.value, 90, y);
      y += 10;
    });
    
    y += 20;
    doc.setFontSize(11);
    addTextWithDiacritics(doc, 'Declar pe propria raspundere ca datele furnizate sunt corecte si complete.', 30, y);
    
    y += 30;
    addTextWithDiacritics(doc, 'Data: _______________', 30, y);
    addTextWithDiacritics(doc, 'Semnatura: _______________', 120, y);
    
    doc.setFontSize(9);
    doc.setTextColor(150);
    addTextWithDiacritics(doc, `Document generat: ${new Date().toLocaleString('ro-RO')}`, 105, 280, { align: 'center' });
    
    return doc;
  };

  const generateAdeverintaVenit = () => {
    const doc = new jsPDF();
    
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    addTextWithDiacritics(doc, 'Vive Credit', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, 'Adeverinta de Venit', 105, 25, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'ADEVERINTA DE VENIT', 105, 50, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    let y = 70;
    addTextWithDiacritics(doc, `Subsemnatul/a ${app.client}, confirm urmatoarele:`, 30, y);
    
    y += 20;
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'Venit lunar net:', 30, y);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, '5,500 RON', 90, y);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'Functie:', 30, y);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, 'Manager Vanzari', 90, y);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'Angajator:', 30, y);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, 'SC Example SRL', 90, y);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    addTextWithDiacritics(doc, 'Perioada:', 30, y);
    doc.setFont('helvetica', 'normal');
    addTextWithDiacritics(doc, 'Din 01.2020 pana in prezent', 90, y);
    
    y += 30;
    doc.setFontSize(11);
    addTextWithDiacritics(doc, 'Prezenta adeverinta este eliberata pentru a servi la:', 30, y);
    y += 10;
    addTextWithDiacritics(doc, `✓ Obtinere credit bancar - Aplicatia ${app.id}`, 30, y);
    
    y += 30;
    addTextWithDiacritics(doc, 'Data: _______________', 30, y);
    addTextWithDiacritics(doc, 'Semnatura: _______________', 120, y);
    
    doc.setFontSize(9);
    doc.setTextColor(150);
    addTextWithDiacritics(doc, `Document generat: ${new Date().toLocaleString('ro-RO')}`, 105, 280, { align: 'center' });
    
    return doc;
  };

  const generateCIImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 800, 500);
      
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 5;
      ctx.strokeRect(10, 10, 780, 480);
      
      ctx.fillStyle = '#667eea';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CARTE DE IDENTITATE', 400, 80);
      
      ctx.fillStyle = '#000';
      ctx.font = '24px Arial';
      ctx.textAlign = 'left';
      
      ctx.fillText(`Nume: ${app.client}`, 100, 150);
      ctx.fillText(`CNP: 1850101123456`, 100, 200);
      ctx.fillText(`Serie: AB`, 100, 250);
      ctx.fillText(`Numar: 123456`, 250, 250);
      ctx.fillText(`Eliberata: 01.01.2020`, 100, 300);
      ctx.fillText(`Valabila pana: 01.01.2030`, 100, 350);
      
      ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SPECIMEN', 400, 280);
    }
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const handlePreview = (doc: Document) => {
    setPreviewing(doc.name);
    
    try {
      if (doc.type === 'pdf') {
        let pdfDoc;
        
        if (doc.name === "Cerere Credit.pdf") {
          pdfDoc = generateCerereCredit();
        } else if (doc.name === "Adeverință venit.pdf") {
          pdfDoc = generateAdeverintaVenit();
        }
        
        if (pdfDoc) {
          const pdfBlob = pdfDoc.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          window.open(url, '_blank');
        }
      } else if (doc.type === 'image') {
        const imageData = generateCIImage();
        const win = window.open();
        if (win) {
          win.document.write(`<img src="${imageData}" style="max-width:100%; height:auto;" />`);
        }
      }
    } catch (error) {
      console.error('Eroare la preview:', error);
      alert('Eroare la previzualizare!');
    } finally {
      setPreviewing(null);
    }
  };

  const handleDownload = (doc: Document) => {
    setDownloading(doc.name);
    
    try {
      if (doc.type === 'pdf') {
        let pdfDoc;
        
        if (doc.name === "Cerere Credit.pdf") {
          pdfDoc = generateCerereCredit();
        } else if (doc.name === "Adeverință venit.pdf") {
          pdfDoc = generateAdeverintaVenit();
        }
        
        if (pdfDoc) {
          pdfDoc.save(doc.name);
        }
      } else if (doc.type === 'image') {
        const imageData = generateCIImage();
        const link = document.createElement('a');
        link.href = imageData;
        link.download = doc.name;
        link.click();
      }
      
      setTimeout(() => {
        alert(`✅ ${doc.name} descarcat cu succes!`);
      }, 100);
      
    } catch (error) {
      console.error('Eroare la download:', error);
      alert('Eroare la descarcare!');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white transition text-2xl">
          <FiX />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Documente client</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Aplicația: <strong>{app.id}</strong> — {app.client}
        </p>

        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div className="flex items-center gap-3">
                <FiFileText className="text-gray-600 dark:text-gray-400 text-xl" />
                <span className="text-gray-900 dark:text-white">{doc.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => handlePreview(doc)} disabled={previewing === doc.name} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 disabled:opacity-50" title="Previzualizare">
                  {previewing === doc.name ? (
                    <svg className="animate-spin h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <FiExternalLink size={18} />
                  )}
                </button>

                <button onClick={() => handleDownload(doc)} disabled={downloading === doc.name} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition p-1 disabled:opacity-50" title="Descarcă">
                  {downloading === doc.name ? (
                    <svg className="animate-spin h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <FiDownload size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition">
            Închide
          </button>
        </div>
      </div>
    </div>
  );
}