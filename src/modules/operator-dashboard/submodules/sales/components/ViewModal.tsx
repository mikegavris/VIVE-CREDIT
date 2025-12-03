import { FiX, FiDownload, FiPrinter, FiUser } from "react-icons/fi";
import { useState } from "react";
import jsPDF from "jspdf";

// ✅ Actualizează interfața
interface SalesApplication {
  id: string;
  client: string;
  product: string;  // ← era productValue
  amount: number;
  status: string;   // ← era statusValue
  agent: string;
  score: number;
}

interface ViewModalProps {
  app: SalesApplication | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewModal({ app, open, onClose }: ViewModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  if (!open || !app) return null;

  const handleSavePDF = () => {
    setIsSaving(true);
    
    try {
      const doc = new jsPDF();
      
      const primaryColor: [number, number, number] = [102, 126, 234];
      const grayColor: [number, number, number] = [107, 114, 128];
      
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 35, 'F');
      
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('Vive Credit', 105, 15, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Detalii Client', 105, 25, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('DETALII CLIENT', 105, 50, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      let y = 70;
      const leftX = 25;
      const rightX = 90;
      const lineHeight = 14;
      
      const fields = [
        { label: 'ID:', value: app.id },
        { label: 'Client:', value: app.client },
        { label: 'Produs:', value: app.product },
        { label: 'Suma:', value: `${app.amount} RON` },
        { label: 'Status:', value: app.status },
        { label: 'Agent:', value: app.agent },
        { label: 'Scor:', value: app.score.toString() },
      ];
      
      fields.forEach(field => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...grayColor);
        doc.text(field.label, leftX, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(field.value, rightX, y);
        
        y += lineHeight;
      });
      
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(`Document generat: ${new Date().toLocaleString('ro-RO')}`, 105, 280, { align: 'center' });
      
      doc.save(`Client-${app.id}-${Date.now()}.pdf`);
      
      setTimeout(() => {
        alert('✅ PDF salvat cu succes!');
      }, 100);
      
    } catch (error) {
      console.error('Eroare:', error);
      alert('❌ Eroare la generare PDF!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white transition text-2xl"
        >
          <FiX />
        </button>

        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <FiUser /> Detalii Client
          </h2>
        </div>

        <div className="px-6 py-4 space-y-3 text-gray-700 dark:text-gray-300">
          <div><strong>ID:</strong> {app.id}</div>
          <div><strong>Client:</strong> {app.client}</div>
          <div><strong>Produs:</strong> {app.product}</div>
          <div><strong>Sumă:</strong> {app.amount} RON</div>
          <div><strong>Status:</strong> {app.status}</div>
          <div><strong>Agent:</strong> {app.agent}</div>
          <div><strong>Scor:</strong> {app.score}</div>
        </div>

        <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FiPrinter /> Printează
          </button>

          <button
            onClick={handleSavePDF}
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Se salvează...
              </>
            ) : (
              <>
                <FiDownload /> Salvează
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}