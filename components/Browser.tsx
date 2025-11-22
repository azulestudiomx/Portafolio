import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, ExternalLink, AlertCircle } from 'lucide-react';

interface BrowserProps {
  initialUrl?: string;
}

const Browser: React.FC<BrowserProps> = ({ initialUrl = 'https://es.wikipedia.org/wiki/React' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [displayUrl, setDisplayUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  // Lista de dominios conocidos que bloquean iframes (X-Frame-Options)
  const BLOCKED_DOMAINS = ['github.com', 'linkedin.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'google.com'];

  useEffect(() => {
    // Reiniciar estados al cambiar URL interna
    setIsLoading(true);
    setIframeError(false);
    setDisplayUrl(url);

    // Verificar si es un dominio bloqueado conocido
    const isBlocked = BLOCKED_DOMAINS.some(domain => url.includes(domain));
    if (isBlocked) {
        setIframeError(true);
        setIsLoading(false);
    } else {
        // Simular tiempo de carga para dominios permitidos
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }
  }, [url]);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = displayUrl;
    if (!target.startsWith('http') && !target.startsWith('mailto')) {
        target = 'https://' + target;
    }
    setUrl(target);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeError(false);
    // Forzar re-render del iframe
    const current = url;
    setUrl('');
    setTimeout(() => setUrl(current), 100);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white text-black">
      {/* Safari Toolbar */}
      <div className="h-12 bg-[#f5f5f7] border-b border-[#d1d1d6] flex items-center px-4 gap-4 shrink-0">
        <div className="flex gap-4 text-[#5c5c5f]">
            <button className="hover:bg-[#e5e5e7] p-1 rounded transition-colors"><ArrowLeft size={16} /></button>
            <button className="hover:bg-[#e5e5e7] p-1 rounded transition-colors"><ArrowRight size={16} /></button>
            <button className="hover:bg-[#e5e5e7] p-1 rounded transition-colors" onClick={handleRefresh}><RotateCw size={14} /></button>
        </div>

        <form onSubmit={handleNavigate} className="flex-1 max-w-2xl mx-auto">
            <div className="bg-[#e3e3e5] hover:bg-[#dcdcdf] transition-colors rounded-lg flex items-center px-3 py-1.5 gap-2 text-xs text-black/80 shadow-sm focus-within:ring-2 focus-within:ring-blue-400/50 focus-within:bg-white">
                <Lock size={10} className="text-gray-500" />
                <input 
                    type="text" 
                    value={displayUrl}
                    onChange={(e) => setDisplayUrl(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-center group-focus-within:text-left truncate"
                />
            </div>
        </form>
        
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white w-full h-full overflow-hidden">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-gray-400">Cargando...</span>
                </div>
            </div>
        )}
        
        {iframeError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center p-8 z-0">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <AlertCircle size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No se puede mostrar la vista previa</h3>
                <p className="text-sm text-gray-500 max-w-md mb-6">
                    El sitio web <strong>{new URL(url).hostname}</strong> no permite ser incrustado en otras aplicaciones por motivos de seguridad.
                </p>
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <span>Abrir en nueva pestaña</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        ) : (
            <iframe 
                src={url} 
                className="w-full h-full border-none"
                title="Simulated Browser"
                onLoad={() => setIsLoading(false)}
                onError={() => setIframeError(true)}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
        )}
      </div>
    </div>
  );
};

export default Browser;