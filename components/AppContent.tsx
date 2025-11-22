import React, { useState } from 'react';
import { Code, Cpu, Globe, ExternalLink, Mail, MapPin, Phone, Github, Linkedin, Check, Copy } from 'lucide-react';

// --- PROPS for Components that might receive openApp ---
interface AppContentProps {
    onOpenApp?: (id: string, props?: any) => void;
}

export const AboutMe = () => (
  <div className="space-y-6 animate-fadeIn text-white">
    <div className="flex flex-col items-center mb-8">
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Perfil" className="w-32 h-32 rounded-full border-4 border-white/10 mb-4 shadow-lg object-cover" />
      <h2 className="text-2xl font-bold">Azul Estudio</h2>
      <p className="text-white/60 text-sm">Desarrollador Creativo Full Stack</p>
    </div>
    
    <div className="space-y-4">
      <p className="leading-relaxed text-white/80">
        ¡Hola! Soy un desarrollador apasionado por crear experiencias web interactivas. 
        Me especializo en React, TypeScript y diseño UI/UX moderno. 
        ¡Todo este portafolio es una simulación de sistema operativo construida con tecnologías web!
      </p>
      <p className="leading-relaxed text-white/80">
        Creo en el código limpio, el diseño pixel-perfect y la creación de interfaces 
        intuitivas que los usuarios disfruten utilizar.
      </p>
    </div>
  </div>
);

export const Projects: React.FC<AppContentProps> = ({ onOpenApp }) => {
    const projects = [
        { id: 1, title: "Wikipedia Clone", url: "https://es.m.wikipedia.org/wiki/React", desc: "Una réplica funcional usando Wikipedia como fuente.", tech: "React" },
        { id: 2, title: "Three.js Demo", url: "https://threejs.org/", desc: "Experimentos 3D en el navegador.", tech: "WebGL" },
        { id: 3, title: "CSS Tricks", url: "https://css-tricks.com/", desc: "Blog de recursos para desarrolladores frontend.", tech: "CSS" },
        { id: 4, title: "Vite JS", url: "https://vitejs.dev/", desc: "Documentación oficial de la herramienta de build.", tech: "Vite" },
    ];

    const handleOpenProject = (url: string) => {
        if (onOpenApp) {
            onOpenApp('browser', { initialUrl: url });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            {projects.map((proj) => (
            <div 
                key={proj.id} 
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer flex flex-col"
                onClick={() => handleOpenProject(proj.url)}
            >
                <div className="h-32 bg-black/30 rounded-lg mb-3 overflow-hidden relative">
                    <img src={`https://picsum.photos/400/200?random=${proj.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Proyecto" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <ExternalLink className="text-white" />
                    </div>
                </div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                    {proj.title}
                </h3>
                <p className="text-sm text-white/60 mt-1 flex-1">{proj.desc}</p>
                <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{proj.tech}</span>
                </div>
            </div>
            ))}
        </div>
    );
};

export const Experience = () => (
  <div className="space-y-8 relative border-l border-white/10 ml-3 pl-8 py-2 text-white">
    {[
      { role: "Ingeniero Frontend Senior", company: "Tech Giants Inc.", year: "2022 - Presente", desc: "Liderando el equipo frontend en la reconstrucción de la plataforma principal usando React 18 y Next.js." },
      { role: "Desarrollador UI/UX", company: "Agencia Creativa", year: "2020 - 2022", desc: "Diseño e implementación de sitios web interactivos galardonados para clientes internacionales." },
      { role: "Desarrollador Web Junior", company: "StartUp Hub", year: "2018 - 2020", desc: "Desarrollo Full Stack usando el stack MERN. Integración de pasarelas de pago y funciones en tiempo real." },
    ].map((job, idx) => (
        <div key={idx} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#1e1e1e]"></div>
            <h3 className="text-xl font-bold">{job.role}</h3>
            <div className="text-blue-400 text-sm font-medium mb-2">{job.company} • {job.year}</div>
            <p className="text-white/70">{job.desc}</p>
        </div>
    ))}
  </div>
);

export const Skills = () => {
    const skills = [
        { name: "React", level: 95, color: "bg-blue-500" },
        { name: "TypeScript", level: 90, color: "bg-blue-600" },
        { name: "Tailwind CSS", level: 92, color: "bg-cyan-400" },
        { name: "Node.js", level: 85, color: "bg-green-500" },
        { name: "Framer Motion", level: 88, color: "bg-purple-500" },
        { name: "UI Design", level: 80, color: "bg-pink-500" },
    ];

    return (
        <div className="space-y-6 text-white">
            <div className="grid grid-cols-2 gap-4">
                {skills.map(skill => (
                    <div key={skill.name} className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-white/50">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${skill.color}`} 
                                style={{ width: `${skill.level}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Code size={20}/> Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                    {["Next.js", "GraphQL", "Docker", "AWS", "Figma", "Git", "Redux", "Vite", "Webpack", "Jest"].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Contact: React.FC<AppContentProps> = ({ onOpenApp }) => {
  const [copied, setCopied] = useState(false);
  const email = "contacto@azulestudio.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Opcional: También intentar abrir el cliente de correo
    window.location.href = `mailto:${email}`;
  };

  const handleOpenLink = (url: string) => {
    // Abrir en una pestaña nueva real para evitar bloqueo de iframes (X-Frame-Options)
    // que ocurre con GitHub, LinkedIn, etc.
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full justify-center items-center text-center space-y-8 text-white animate-fadeIn">
       <div className="bg-white/10 p-6 rounded-full mb-4 shadow-lg ring-1 ring-white/20">
          <Mail size={48} className="text-blue-400" />
       </div>
       
       <div>
            <h2 className="text-3xl font-bold mb-2">Contáctame</h2>
            <p className="text-white/60 max-w-md mx-auto">
                Actualmente estoy disponible para trabajos freelance y oportunidades a tiempo completo. 
                Si tienes un proyecto que necesita un toque creativo, hablemos.
            </p>
       </div>
  
       <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* Email Button */}
          <button 
            onClick={handleCopyEmail}
            className="flex items-center justify-between bg-white/10 p-3 px-4 rounded-xl hover:bg-white/20 transition-all active:scale-95 border border-white/5 group"
          >
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span className="text-sm">{email}</span>
              </div>
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white/30 group-hover:text-white" />}
          </button>

          {/* Github Button */}
          <button 
            onClick={() => handleOpenLink("https://github.com")}
            className="flex items-center gap-3 bg-white/10 p-3 px-4 rounded-xl hover:bg-white/20 transition-all active:scale-95 border border-white/5 text-left"
          >
              <Github size={18} className="text-white" />
              <span className="text-sm">github.com/azulestudio</span>
          </button>

          {/* LinkedIn Button */}
          <button 
            onClick={() => handleOpenLink("https://linkedin.com")}
            className="flex items-center gap-3 bg-white/10 p-3 px-4 rounded-xl hover:bg-white/20 transition-all active:scale-95 border border-white/5 text-left"
          >
              <Linkedin size={18} className="text-blue-500" />
              <span className="text-sm">linkedin.com/in/azulestudio</span>
          </button>
       </div>
    </div>
  );
};