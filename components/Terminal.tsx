import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onOpenApp?: (id: string, props?: any) => void;
}

const TerminalApp: React.FC<TerminalProps> = ({ onOpenApp }) => {
  const [history, setHistory] = useState<string[]>([
    "Bienvenido a Azul Estudio Terminal v1.0.0",
    "Escribe 'help' para ver la lista de comandos disponibles.",
    ""
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const parts = cleanCmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    let output = "";

    switch (mainCmd) {
      case 'help':
        setHistory(prev => [...prev, `guest@azul-estudio ~ % ${cmd}`, 
          "Comandos disponibles:",
          "  help        - Muestra esta ayuda",
          "  whoami      - Muestra el usuario actual",
          "  ls          - Lista las 'apps' disponibles",
          "  open [app]  - Abre una aplicación (ej: open projects)",
          "  clear       - Limpia la pantalla",
          "  date        - Muestra la fecha actual",
          "  cat [file]  - Lee un archivo (ej: cat skills.txt)",
          ""
        ]);
        return;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = "guest_user";
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'ls':
        output = "about  projects  experience  skills  contact  browser  skills.txt  secret.txt";
        break;
      case 'cat':
        if (arg === 'skills.txt') {
            output = "React, TypeScript, Tailwind, Node.js, UI/UX Design...";
        } else if (arg === 'secret.txt') {
            output = "¡Has encontrado el easter egg! 🥚 Gracias por visitar mi portafolio.";
        } else if (!arg) {
            output = "cat: falta el argumento de archivo";
        } else {
            output = `cat: ${arg}: No existe el archivo o directorio`;
        }
        break;
      case 'open':
        if (arg) {
            const validApps = ['about', 'projects', 'experience', 'skills', 'contact', 'browser', 'terminal'];
            if (validApps.includes(arg)) {
                output = `Abriendo ${arg}...`;
                if (onOpenApp) onOpenApp(arg);
            } else {
                output = `Error: Aplicación '${arg}' no encontrada.`;
            }
        } else {
            output = "Uso: open [nombre_app]";
        }
        break;
      case '':
        break;
      default:
        output = `zsh: command not found: ${mainCmd}`;
    }

    if (cleanCmd !== 'clear') {
        setHistory(prev => [...prev, `guest@azul-estudio ~ % ${cmd}`, output]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div 
        className="h-full w-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-4 overflow-auto"
        onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
      ))}
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2 text-blue-400">guest@azul-estudio ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-white/90"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
};

export default TerminalApp;