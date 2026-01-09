'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import { SearchForm } from './search-form';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2
                id="search-modal-title"
                className="text-2xl font-bold text-gray-900"
              >
                ✈️ Planejar Viagem
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Encontre o destino perfeito com estimativas de custos e clima
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <SearchForm onSuccess={onClose} />
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-500 text-center">
              💡 <span className="font-medium">Dica:</span> Preencha as datas
              para obter previsão do tempo e estimativas mais precisas
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
