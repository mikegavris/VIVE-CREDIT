import { useState } from "react";
import { FiEye, FiFileText } from "react-icons/fi";
import ViewModal from "./components/ViewModal";
import DocsModal from "./components/DocsModal";

// ✅ Adaugă interfața aici
interface SalesApplication {
  id: string;
  client: string;
  product: string;
  amount: number;
  status: string;
  agent: string;
  score: number;
}

const mockApplications: SalesApplication[] = [
  {
    id: "AP-1001",
    client: "Popescu Ana",
    product: "Credit Casa",
    amount: 120000,
    status: "Nou",
    agent: "Andrei",
    score: 500,
  },
  {
    id: "AP-1002",
    client: "Vasilescu Ion",
    product: "Credit Auto",
    amount: 35000,
    status: "În lucru",
    agent: "Maria",
    score: 650,
  },
  {
    id: "AP-1003",
    client: "Mirela Ionescu",
    product: "Card Credit",
    amount: 15000,
    status: "Finalizat",
    agent: "Andrei",
    score: 720,
  },
  {
    id: "AP-1004",
    client: "George Matei",
    product: "Credit Casa",
    amount: 90000,
    status: "În lucru",
    agent: "Maria",
    score: 580,
  },
  {
    id: "AP-1005",
    client: "Lavinia Pop",
    product: "Card Credit",
    amount: 11000,
    status: "Nou",
    agent: "Andrei",
    score: 690,
  },
  {
    id: "AP-1006",
    client: "Cristina Marin",
    product: "Credit Auto",
    amount: 42000,
    status: "Finalizat",
    agent: "Maria",
    score: 710,
  },
];

export default function SalesDashboard() {
  const [selectedApp, setSelectedApp] = useState<SalesApplication | null>(null);
  const [modalType, setModalType] = useState<"view" | "docs" | null>(null);

  const openModal = (app: SalesApplication, type: "view" | "docs") => {
    setSelectedApp(app);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setModalType(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Sales Dashboard</h1>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            
            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client
              </label>
              <input
                type="text"
                placeholder="Caută client..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Product Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Produs
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Toate</option>
                <option>Credit Casa</option>
                <option>Credit Auto</option>
                <option>Card Credit</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stare
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Toate</option>
                <option>Nou</option>
                <option>În lucru</option>
                <option>Finalizat</option>
              </select>
            </div>

            {/* Agent Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Agent
              </label>
              <input
                type="text"
                placeholder="Caută agent..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Resetează filtre
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Produs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sumă</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{app.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{app.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{app.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{app.amount} RON</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Nou' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        app.status === 'În lucru' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(app, "view")}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1 text-sm"
                        >
                          <FiEye /> View
                        </button>
                        <button
                          onClick={() => openModal(app, "docs")}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1 text-sm"
                        >
                          <FiFileText /> Docs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sumă</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{app.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{app.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{app.amount} RON</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'Nou' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          app.status === 'În lucru' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(app, "view")}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => openModal(app, "docs")}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                          >
                            <FiFileText />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {mockApplications.map((app) => (
            <div key={app.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ID</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{app.id}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  app.status === 'Nou' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  app.status === 'În lucru' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Client:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{app.client}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Produs:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{app.product}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Sumă:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{app.amount} RON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Agent:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{app.agent}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal(app, "view")}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FiEye /> View
                </button>
                <button
                  onClick={() => openModal(app, "docs")}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FiFileText /> Docs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modalType === "view" && selectedApp && (
        <ViewModal app={selectedApp} open={true} onClose={closeModal} />
      )}
      {modalType === "docs" && selectedApp && (
        <DocsModal app={selectedApp} onClose={closeModal} />
      )}
    </div>
  );
}

// ✅ Exportează interfața pentru alte componente
export type { SalesApplication };