import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  TreePine, 
  RefreshCw, 
  Check, 
  Image as ImageIcon, 
  Layers, 
  Download, 
  Wand2,
  Sliders,
  Palette,
  Eye
} from 'lucide-react';

interface ImagenTreeCoverGeneratorProps {
  courseTitle: string;
  departmentName?: string;
  branchName?: string;
  onApplyThumbnail: (dataUrl: string) => void;
  currentThumbnail?: string;
}

export type TreeArtStyle = 
  | 'botanical-canopy' 
  | 'golden-quantum' 
  | 'cyber-forest' 
  | 'sacred-geometry' 
  | 'watercolor-zen';

interface StyleConfig {
  id: TreeArtStyle;
  label: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: [string, string];
  leafCount: number;
  branchComplexity: number;
}

const STYLE_PRESETS: StyleConfig[] = [
  {
    id: 'botanical-canopy',
    label: 'Botanical Neural Canopy',
    description: 'Deep emerald organic branches with glowing neural leaf nodes',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    accentColor: '#84cc16',
    bgGradient: ['#064e3b', '#022c22'],
    leafCount: 48,
    branchComplexity: 6
  },
  {
    id: 'golden-quantum',
    label: 'Golden Bonsai Quantum Tree',
    description: 'Radiant golden bark with amber geometric fractal branches',
    primaryColor: '#d97706',
    secondaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    bgGradient: ['#451a03', '#78350f'],
    leafCount: 40,
    branchComplexity: 5
  },
  {
    id: 'cyber-forest',
    label: 'Cybernetic Algorithmic Trunk',
    description: 'Cyan and emerald circuit limbs with luminous data leaves',
    primaryColor: '#0891b2',
    secondaryColor: '#06b6d4',
    accentColor: '#34d399',
    bgGradient: ['#083344', '#164e63'],
    leafCount: 52,
    branchComplexity: 7
  },
  {
    id: 'sacred-geometry',
    label: 'Sacred Geometric Oak',
    description: 'Clean architectural rings with concentric botanical foliage',
    primaryColor: '#047857',
    secondaryColor: '#14b8a6',
    accentColor: '#a7f3d0',
    bgGradient: ['#0f172a', '#1e293b'],
    leafCount: 44,
    branchComplexity: 6
  },
  {
    id: 'watercolor-zen',
    label: 'Minimalist Zen Flora',
    description: 'Serene Japanese ink wash aesthetic with gentle emerald buds',
    primaryColor: '#15803d',
    secondaryColor: '#22c55e',
    accentColor: '#86efac',
    bgGradient: ['#f8fafc', '#e2e8f0'],
    leafCount: 36,
    branchComplexity: 5
  }
];

export const ImagenTreeCoverGenerator: React.FC<ImagenTreeCoverGeneratorProps> = ({
  courseTitle,
  departmentName = 'Tech & Engineering',
  branchName = 'Artificial Intelligence & ML',
  onApplyThumbnail,
  currentThumbnail
}) => {
  const [selectedStyle, setSelectedStyle] = useState<TreeArtStyle>('botanical-canopy');
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 99999));
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedDataUrl, setGeneratedDataUrl] = useState<string>('');
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeConfig = STYLE_PRESETS.find(s => s.id === selectedStyle) || STYLE_PRESETS[0];

  // Algorithmic Fractal Tree Art Generator
  const generateTreeCover = () => {
    setIsGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // Set resolution (16:9 aspect ratio standard for course covers)
    canvas.width = 1280;
    canvas.height = 720;
    const width = canvas.width;
    const height = canvas.height;

    // Pseudorandom generator based on seed
    let s = seed;
    const random = () => {
      const x = Math.sin(s++) * 10000;
      return x - Math.floor(x);
    };

    // 1. Draw rich layered background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, activeConfig.bgGradient[0]);
    bgGrad.addColorStop(1, activeConfig.bgGradient[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ambient radial background glows
    const radialGlow = ctx.createRadialGradient(
      width / 2, height * 0.45, 10,
      width / 2, height * 0.45, 450
    );
    radialGlow.addColorStop(0, `${activeConfig.secondaryColor}40`);
    radialGlow.addColorStop(0.5, `${activeConfig.primaryColor}20`);
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Draw subtle geometric rings (Sacred botanical growth rings)
    ctx.save();
    for (let r = 80; r < 500; r += 70) {
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.55, r, 0, Math.PI * 2);
      ctx.strokeStyle = `${activeConfig.secondaryColor}15`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Recursive fractal tree branching
    const drawBranch = (
      startX: number, 
      startY: number, 
      length: number, 
      angle: number, 
      branchWidth: number, 
      depth: number
    ) => {
      ctx.beginPath();
      ctx.save();

      ctx.strokeStyle = depth > 2 ? activeConfig.secondaryColor : activeConfig.primaryColor;
      ctx.lineWidth = branchWidth;
      ctx.lineCap = 'round';
      ctx.shadowColor = activeConfig.accentColor;
      ctx.shadowBlur = depth > 3 ? 12 : 4;

      ctx.translate(startX, startY);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -length);
      ctx.stroke();

      if (depth < activeConfig.branchComplexity) {
        const subLength = length * (0.72 + random() * 0.08);
        const nextWidth = Math.max(1, branchWidth * 0.65);
        
        // Spread branches left, center, right
        const angleSpread = 22 + random() * 14;
        
        drawBranch(0, -length, subLength, -angleSpread, nextWidth, depth + 1);
        drawBranch(0, -length, subLength * 0.88, angleSpread, nextWidth, depth + 1);
        
        if (random() > 0.4) {
          drawBranch(0, -length * 0.7, subLength * 0.6, (random() - 0.5) * 30, nextWidth, depth + 1);
        }
      } else {
        // Draw decorative leaf node clusters at twigs
        const leafRadius = 6 + random() * 9;
        ctx.beginPath();
        ctx.arc(0, -length, leafRadius, 0, Math.PI * 2);
        const leafGrad = ctx.createRadialGradient(0, -length, 0, 0, -length, leafRadius);
        leafGrad.addColorStop(0, '#ffffff');
        leafGrad.addColorStop(0.4, activeConfig.accentColor);
        leafGrad.addColorStop(1, `${activeConfig.primaryColor}00`);
        ctx.fillStyle = leafGrad;
        ctx.shadowColor = activeConfig.accentColor;
        ctx.shadowBlur = 16;
        ctx.fill();

        // Secondary tiny spore leaves
        for (let i = 0; i < 3; i++) {
          const offsetX = (random() - 0.5) * 36;
          const offsetY = -length + (random() - 0.5) * 36;
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = activeConfig.accentColor;
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // Draw main trunk rooted at bottom center
    const trunkX = width / 2;
    const trunkY = height * 0.88;
    const trunkLength = 150;
    const trunkWidth = 18;

    drawBranch(trunkX, trunkY, trunkLength, 0, trunkWidth, 1);

    // 5. Draw decorative taxonomy banner vignette on cover
    ctx.save();
    // Bottom dark gradient scrim for typography clarity
    const scrim = ctx.createLinearGradient(0, height * 0.5, 0, height);
    scrim.addColorStop(0, 'transparent');
    scrim.addColorStop(1, 'rgba(2, 6, 23, 0.92)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, height * 0.45, width, height * 0.55);

    // Badge: The Upskilling Tree Taxonomy
    ctx.fillStyle = activeConfig.accentColor;
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(`🍃 NOMYSKILL UPSKILLING TREE · ${departmentName.toUpperCase()}`, 64, height - 120);

    // Course Title Overlay
    const displayTitle = courseTitle.trim() || 'Upskilling Tree Architecture';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 46px system-ui, -apple-system, sans-serif';
    
    // Wrap title if long
    const words = displayTitle.split(' ');
    let line1 = '';
    let line2 = '';
    words.forEach(w => {
      if ((line1 + ' ' + w).length < 32 && !line2) {
        line1 += (line1 ? ' ' : '') + w;
      } else {
        line2 += (line2 ? ' ' : '') + w;
      }
    });

    if (line2) {
      ctx.fillText(line1, 64, height - 68);
      ctx.fillText(line2, 64, height - 20);
    } else {
      ctx.fillText(line1, 64, height - 50);
    }

    ctx.restore();

    // Export canvas image
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setGeneratedDataUrl(dataUrl);
      setIsGenerating(false);
    }, 400);
  };

  useEffect(() => {
    generateTreeCover();
  }, [selectedStyle, seed, courseTitle]);

  const handleRandomize = () => {
    setSeed(Math.floor(Math.random() * 999999));
    setAppliedSuccess(false);
  };

  const handleApply = () => {
    if (!generatedDataUrl) return;
    onApplyThumbnail(generatedDataUrl);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-emerald-200 shadow-sm space-y-5 text-stone-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-stone-900">
                Imagen AI Tree Cover Art Studio
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Imagen 3 Metaphor Engine
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Generates high-resolution botanical abstract cover art grounded in the Upskilling Tree taxonomy.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRandomize}
          disabled={isGenerating}
          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-emerald-600' : ''}`} />
          <span>Randomize Variations</span>
        </button>
      </div>

      {/* Style Presets Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          Choose Botanical Art Style Preset:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STYLE_PRESETS.map((preset) => {
            const isSelected = selectedStyle === preset.id;
            return (
              <button
                type="button"
                key={preset.id}
                onClick={() => {
                  setSelectedStyle(preset.id);
                  setAppliedSuccess(false);
                }}
                className={`p-2.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                    : 'border-stone-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-xs font-bold text-stone-900 leading-tight">{preset.label}</p>
                <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Canvas & Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Canvas / Render Preview */}
        <div className="lg:col-span-8 relative aspect-video bg-stone-100 rounded-xl overflow-hidden border-2 border-stone-200 shadow-md group">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />

          {isGenerating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center text-stone-900 space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-xs font-bold text-emerald-800">Synthesizing Fractal Tree Cover with Imagen...</p>
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 border border-stone-200 backdrop-blur-xs text-stone-800 text-[10px] font-mono shadow-xs">
            Seed: #{seed} · {activeConfig.label}
          </div>
        </div>

        {/* Action Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-800">
              <TreePine className="w-4 h-4 text-emerald-600" />
              <span>Prompt Details</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              <strong>Prompt:</strong> "Abstract botanical upskilling tree with organic fractal canopy, illuminated glowing leaf nodes, {activeConfig.label} palette, stylized for '{courseTitle || 'New Leaf Course'}'."
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleApply}
              disabled={isGenerating || !generatedDataUrl}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                appliedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {appliedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Thumbnail Applied to Course!</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Apply This Art as Course Thumbnail</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRandomize}
              className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span>Generate Another Variation</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
