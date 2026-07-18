import React, { useState, useRef, useEffect } from 'react';
import { FONT_BODY_QUOTED, FONT_DISPLAY_QUOTED } from './lib/typography';
import { 
  X, 
  Upload, 
  Download, 
  Smartphone, 
  Sparkles, 
  Check, 
  RotateCw,
  Crop,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react';

interface ScreenshotOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'tr' | 'en';
}

type LayoutMode = 'frame' | 'blur' | 'fit';
type PresetSize = '1242_2688' | '1284_2778' | '1242_2208';

export const ScreenshotOptimizerModal: React.FC<ScreenshotOptimizerModalProps> = ({ isOpen, onClose, lang }) => {

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; name: string } | null>(null);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('frame');
  const [presetSize, setPresetSize] = useState<PresetSize>('1242_2688');
  
  // Advanced Cropping Options specifically for Android/general screenshots
  const [stripAndroidBars, setStripAndroidBars] = useState<boolean>(true);
  const [customOffsetY, setCustomOffsetY] = useState<number>(0); // Vertical translation
  const [zoomScale, setZoomScale] = useState<number>(100); // Zoom level %

  // Styling options (for 'frame' mockup layout)
  const [titleText, setTitleText] = useState<string>('GOOFIND');
  const [subtitleText, setSubtitleText] = useState<string>(
    lang === 'tr' ? 'Kanada Türk Topluluğu' : "Canada's Turkish Community"
  );
  const [bgStyle, setBgStyle] = useState<string>('slate-navy');
  const [textColorStyle, setTextColorStyle] = useState<string>('white');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [canvasUrl, setCanvasUrl] = useState<string>('');

  // Translations dictionary
  const t = {
    title: lang === 'tr' ? 'App Store Ekran Resmi Boyutlandırıcı & Düzenleyici' : 'App Store Screenshot Optimizer',
    desc: lang === 'tr' 
      ? 'Android telefonunuzdan veya herhangi bir cihazdan aldığınız ekran görüntülerini buraya yükleyerek App Store (6.5" ve 5.5" iPhone) standart boyutlarına kusursuzca dönüştürebilirsiniz.' 
      : 'Upload any screenshot to perfectly convert and format it to App Store size requirements (6.5" or 5.5" Display sizes).',
    androidCutoffTip: lang === 'tr'
      ? '💡 Android durum çubuğu (pil, saat) ve alt buton barı ekran görüntülerinde çirkin durur. "Android barlarını temizle" ayarımız bunları otomatik ve kusursuzca gizler!'
      : '💡 Android status and navigation bars look unprofessional in App Store images. Our "Strip Android Bars" option automatically and perfectly hides them!',
    dropzone: lang === 'tr' ? 'Görseli Sürükleyip Bırakın veya Dosya Seçmek için Tıklayın' : 'Drag & Drop your Screenshot or Click to Select',
    dropzoneSub: lang === 'tr' ? 'Desteklenen formatlar: PNG, JPG, JPEG. (Optimal sonuçlar için telefon ekran görüntüsü yükleyin)' : 'Supports PNG, JPG, JPEG (Works with any mobile device aspect ratio)',
    layoutMode: lang === 'tr' ? 'Yerleşim Tarzı' : 'Layout Style',
    modeFrame: lang === 'tr' ? '⭐ Premium Cihaz Çerçevesi (iPhone Mockup)' : '⭐ Premium iPhone Mockup Frame',
    modeBlur: lang === 'tr' ? 'Blurlu Arka Plan (Genişletilmiş)' : 'Blurred Expanded Background',
    modeFit: lang === 'tr' ? 'Sadece Sığdır (Basit Yeniden Boyutlandır)' : 'Simple Border & Scale Fit',
    dimensions: lang === 'tr' ? 'Hedef Çözünürlük (App Store Uyumlu)' : 'Target Dimensions (App Store Compliant)',
    optionsTitle: lang === 'tr' ? 'Metin ve Görsel Ayarları' : 'Text & Graphic settings',
    labelTitle: lang === 'tr' ? 'Çerçeve Üst Başlık Metni' : 'Mockup Title Text',
    labelSubtitle: lang === 'tr' ? 'Alt Açıklama Metni' : 'Mockup Subtitle Text',
    labelBgColor: lang === 'tr' ? 'Arka Plan Teması' : 'Background Canvas Theme',
    optionStrip: lang === 'tr' ? 'Android Üst/Alt Barlarını Akıllı Temizle (-5% Üst, -8% Alt)' : 'Smart Strip Android Bars (-5% Top, -8% Bottom)',
    optionAdjustY: lang === 'tr' ? 'Hassas Dikey Konum Kaydırma' : 'Precise Vertical Shift Adjustment',
    optionScale: lang === 'tr' ? 'Görsel Yakınlaştırma (Ölçek)' : 'Image Zoom / Scale',
    btnDownload: lang === 'tr' ? 'Uyumlu Görseli İndir (PNG)' : 'Download Compliant Screenshot (PNG)',
    metaInfo: lang === 'tr' ? 'Orijinal Boyut' : 'Original Resolution',
    emptyMessage: lang === 'tr' ? 'Lütfen başlamak için bir ekran görüntüsü yükleyin.' : 'Please upload a mobile screenshot to begin.',
    previewTitle: lang === 'tr' ? 'Canlı App Store Çıktı Önizlemesi (Yüksek Çözünürlüklü)' : 'Live App Store Output Preview (High-Res)',
    bgWhiteTextBlack: lang === 'tr' ? 'Beyaz Arka Plan / Siyah Metin' : 'White Background / Black Text',
    reset: lang === 'tr' ? 'Sıfırla' : 'Reset Defaults',
    presets: {
      '1242_2688': 'Standard iPhone 6.5" (1242 × 2688 px)',
      '1284_2778': 'iPhone 13/14 Pro Max 6.5" (1284 × 2778 px)',
      '1242_2208': lang === 'tr' ? 'iPhone 5.5" Ekranı (1242 × 2208 px)' : 'iPhone 5.5" Display (1242 × 2208 px)',
    }
  };

  const bgThemes = [
    { id: 'slate-navy', label: lang === 'tr' ? 'Modern Gece Görünümü' : 'Slate Cosmic Navy', grad: ['#0f172a', '#1e1b4b', '#1e293b'] },
    { id: 'royal-blue', label: lang === 'tr' ? 'Premium Safir Mavi' : 'Premium Royal Blue', grad: ['#1D4ED8', '#2563EB', '#1e40af'] },
    { id: 'amber-gold', label: lang === 'tr' ? 'Canlı Akşamüstü' : 'Vibrant Amber Twilight', grad: ['#f59e0b', '#d97706', '#b45309'] },
    { id: 'emerald-dark', label: lang === 'tr' ? 'Prestij Zümrüdü' : 'Deep Prestigious Emerald', grad: ['#064e3b', '#022c22', '#065f46'] },
    { id: 'cherry-red', label: lang === 'tr' ? 'Ateşli Karmin Kırmızısı' : 'Vibrant Crimson Red', grad: ['#991b1b', '#7f1d1d', '#b91c1c'] },
    { id: 'pure-white', label: lang === 'tr' ? 'Minimal Süt Beyazı' : 'Minimalist Snow White', grad: ['#ffffff', '#f8fafc', '#f1f5f9'] },
    { id: 'gradient-soft', label: lang === 'tr' ? 'Yumuşak Pastel Gradyan' : 'Soft Dreamy Gradient', grad: ['#e0f2fe', '#f3e8ff', '#fce7f3'] },
  ];

  // Load and cache files selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadImageFile(file);
    }
  };

  const loadImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          width: img.width,
          height: img.height,
          name: file.name
        });
        setUploadedImage(src);
        // Reset scale and vertical translation offset to smart values based on resolution
        setCustomOffsetY(0);
        setZoomScale(100);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Drag-and-drop triggers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadImageFile(file);
    }
  };

  // Reset variables
  const handleReset = () => {
    setCustomOffsetY(0);
    setZoomScale(100);
    setStripAndroidBars(true);
    setTitleText('GOOFIND');
    setSubtitleText(lang === 'tr' ? 'Kanada Türk Topluluğu' : "Canada's Turkish Community");
    setBgStyle('slate-navy');
  };

  // Main canvas rendering effect
  useEffect(() => {
    if (!uploadedImage || !canvasRef.current) return;

    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Ensure crisp high definition pixel rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Establish canvas dimensions based on presetSize
      let targetW = 1242;
      let targetH = 2688;
      if (presetSize === '1284_2778') {
        targetW = 1284;
        targetH = 2778;
      } else if (presetSize === '1242_2208') {
        targetW = 1242;
        targetH = 2208;
      }

      canvas.width = targetW;
      canvas.height = targetH;

      // 2. Clear canvas
      ctx.clearRect(0, 0, targetW, targetH);

      // 3. Find matching background gradient theme
      const currentTheme = bgThemes.find(t => t.id === bgStyle) || bgThemes[0];
      const isPureWhite = currentTheme.id === 'pure-white';
      const isPastel = currentTheme.id === 'gradient-soft';

      // --- DRAW BACKGROUND ---
      if (layoutMode === 'frame' || layoutMode === 'fit') {
        const bgGrad = ctx.createLinearGradient(0, 0, targetW, targetH);
        bgGrad.addColorStop(0, currentTheme.grad[0]);
        bgGrad.addColorStop(0.5, currentTheme.grad[1]);
        bgGrad.addColorStop(1, currentTheme.grad[2]);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, targetW, targetH);

        // Subtle geometric accent grids on background (except pure white)
        if (!isPureWhite) {
          ctx.strokeStyle = isPastel ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
          const bGrid = 90;
          for (let x = 0; x < targetW; x += bGrid) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, targetH); ctx.stroke();
          }
          for (let y = 0; y < targetH; y += bGrid) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(targetW, y); ctx.stroke();
          }
        }
      }

      // --- CROP & TRANSFORMS INTENSITY CALCULATION FOR ORIGINAL SCREENSHOT ---
      // We calculate how to slice/draw the source screenshot.
      // If "Strip Android Bars" is checked, we clip 5% off the top (status bar) and 8% off the bottom (softkey nav bar)
      const srcX = 0;
      let srcY = 0;
      const srcW = img.width;
      let srcH = img.height;

      if (stripAndroidBars) {
        const topClip = Math.floor(img.height * 0.05); // 5% top status bar
        const bottomClip = Math.floor(img.height * 0.08); // 8% bottom navigation bar
        srcY = topClip;
        srcH = img.height - topClip - bottomClip;
      }

      // Zoom Scale customization adjustment
      const scaleFactor = zoomScale / 100;

      // Drawing different modes:
      // A. BLUR EXPANDED SCENE
      if (layoutMode === 'blur') {
        // Draw the full background as enlarged blurred image
        ctx.save();
        // Native filter support for blur in Canvas
        try {
          ctx.filter = 'blur(55px)';
        } catch (e) {
          // Fallback if not supported
        }
        ctx.drawImage(img, -targetW * 0.2, -targetH * 0.2, targetW * 1.4, targetH * 1.4);
        ctx.restore();

        // Dark dim overlay to make the foreground image pop
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.fillRect(0, 0, targetW, targetH);

        // Now draw the processed clean screenshot centred
        drawCenteredCleanScreenshot(ctx, img, srcX, srcY, srcW, srcH, targetW, targetH, scaleFactor);
        
      } else if (layoutMode === 'fit') {
        // Simple scaled border layout
        drawCenteredCleanScreenshot(ctx, img, srcX, srcY, srcW, srcH, targetW, targetH, scaleFactor);

      } else if (layoutMode === 'frame') {
        // ⭐ MOST IMPORTANT: PREMIUM IPHONE DEVICE FRAME CARD LAYOUT
        
        // Compute text colors
        const headerTextColor = isPureWhite ? '#0f172a' : isPastel ? '#1e293b' : '#ffffff';
        const subTextColor = isPureWhite ? '#475569' : isPastel ? '#4b5563' : 'rgba(255, 255, 255, 0.7)';

        const is55 = presetSize === '1242_2208';
        const titleY = is55 ? 130 : 180;
        const titleSize = is55 ? 75 : 85;
        const subY = is55 ? 230 : 295;
        const subSize = is55 ? 38 : 42;
        const subLineHeight = is55 ? 48 : 55;

        // 1. Draw Title Text
        ctx.shadowColor = 'transparent';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Main Title
        ctx.font = `bold ${titleSize}px ${FONT_DISPLAY_QUOTED}`;
        ctx.fillStyle = headerTextColor;
        ctx.fillText(titleText, targetW / 2, titleY);

        // Subtitle text (Supports wrapping if it exceeds canvas bounds)
        ctx.font = `500 ${subSize}px ${FONT_BODY_QUOTED}`;
        ctx.fillStyle = subTextColor;
        const words = subtitleText.split(' ');
        let line = '';
        let currentY = subY;
        const subMaxWidth = targetW - 200;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > subMaxWidth && n > 0) {
            ctx.fillText(line, targetW / 2, currentY);
            line = words[n] + ' ';
            currentY += subLineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, targetW / 2, currentY);

        // 2. Draw Premium iPhone Chassis Mockup Frame
        // Coordinates for Device container frame starting below header
        const shellW = is55 ? 840 : 860;
        const shellH = is55 ? 1460 : 1780;
        const shellX = (targetW - shellW) / 2;
        const shellY = is55 ? 580 : 740; // Push down plenty to leave room for text
        const shellCornerR = is55 ? 70 : 90;

        // Draw shadow under device shell
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 45;
        ctx.shadowOffsetY = 25;
        ctx.fillStyle = '#000000';
        
        // Draw the chassis shell base
        roundRect(ctx, shellX, shellY, shellW, shellH, shellCornerR);
        ctx.fill();
        ctx.restore();

        // Draw Chrome Edge / Metallic outer phone bezel border (sleek premium look)
        ctx.strokeStyle = isPureWhite ? '#64748b' : '#1e293b';
        ctx.lineWidth = 14;
        ctx.stroke();

        // 3. Draw Screenshot inside the Device Shell
        // The container bezel thickness is around 25px
        const bezel = 24;
        const clipX = shellX + bezel;
        const clipY = shellY + bezel;
        const clipW = shellW - (bezel * 2);
        const clipH = shellH - (bezel * 2);
        const clipCornerR = shellCornerR - bezel;

        ctx.save();
        // Clip to the inside of the iPhone screen to keep graphics perfectly confined
        roundRect(ctx, clipX, clipY, clipW, clipH, clipCornerR);
        ctx.clip();

        // Draw screenshot scaled to fit inside the device clip rect beautifully
        // Draw image, adjusting for custom zoom and vertical alignments
        const scaleX = clipW / srcW;
        const scaleY = clipH / srcH;
        // Keep proportional fill-height scale so device is full of screenshot
        const finalScale = Math.max(scaleX, scaleY) * scaleFactor;

        const finalDrawW = srcW * finalScale;
        const finalDrawH = srcH * finalScale;
        
        // Center image horizontally, but allow customized Y offset controls
        const drawX = clipX + (clipW - finalDrawW) / 2;
        const drawY = clipY + (clipH - finalDrawH) / 2 + customOffsetY;

        ctx.drawImage(img, srcX, srcY, srcW, srcH, drawX, drawY, finalDrawW, finalDrawH);

        // Subtly draw iPhone Status bar details on Canvas mockup
        ctx.fillStyle = '#111827';
        
        // 4. Draw Apple Dynamic Island Notch inside clip frame (skip for 5.5" display)
        if (!is55) {
          const islandW = 280;
          const islandH = 55;
          const islandX = clipX + (clipW - islandW) / 2;
          const islandY = clipY + 36;
          const islandRadius = 25;
          ctx.fillStyle = '#000000';
          roundRect(ctx, islandX, islandY, islandW, islandH, islandRadius);
          ctx.fill();
        }

        ctx.restore(); // Undo clipping
      }

      // Convert Canvas to a Data URL for instant live updates
      setCanvasUrl(canvas.toDataURL('image/png'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage, layoutMode, presetSize, stripAndroidBars, customOffsetY, zoomScale, titleText, subtitleText, bgStyle]);

  // Helper drawing routine for centered screenshot in fit/blur modes
  const drawCenteredCleanScreenshot = (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    srcX: number, 
    srcY: number, 
    srcW: number, 
    srcH: number, 
    targetW: number, 
    targetH: number,
    scaleFactor: number
  ) => {
    // Proportional fit dimensions
    const scaleX = (targetW - 120) / srcW;
    const scaleY = (targetH - 240) / srcH;
    const fitScale = Math.min(scaleX, scaleY) * scaleFactor;

    const drawW = srcW * fitScale;
    const drawH = srcH * fitScale;
    
    // Position vertically keeping alignment margins
    const drawX = (targetW - drawW) / 2;
    const drawY = (targetH - drawH) / 2 + customOffsetY;

    // Draw Drop shadow behind centered image
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;

    // Draw background placeholder white card behind image for crisp edges
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(drawX, drawY, drawW, drawH);

    // Turn off shadow for drawing the actual screenshot
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(img, srcX, srcY, srcW, srcH, drawX, drawY, drawW, drawH);
  };

  // Utility to draw round rectangles on HTML Canvas
  const roundRect = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    r: number
  ) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // Immediate Download PNG action
  const handleDownload = () => {
    if (!canvasUrl) return;
    const link = document.createElement('a');
    link.download = `goofind_screenshot_${presetSize}_${Date.now()}.png`;
    link.href = canvasUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Dense glassmorphic blur mask overlay */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Main Responsive Dashboard window */}
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-slate-100 relative z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-300 font-sans antialiased">
        
        {/* Header bar */}
        <div className="px-6 sm:px-10 py-5 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-mid/10 text-primary rounded-xl flex items-center justify-center shadow-inner">
              <Smartphone size={26} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-sm sm:text-base leading-none">
                {t.title}
              </h3>
              <p className="text-[14px] sm:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                {t.presets[presetSize]}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/60 rounded-xl transition-all group shrink-0">
            <X size={22} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
          </button>
        </div>

        {/* Dashboard Inner Workspace */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 flex flex-col lg:flex-row gap-8 min-h-0 bg-slate-50/30">
          
          {/* LEFT SIDE: CONTROLS & CONTROLLER UPLOAD (60% width) */}
          <div className="flex-1 flex flex-col gap-6 max-h-full">
            
            {/* Description Card */}
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-left shrink-0">
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {t.desc}
              </p>
              <p className="text-[15px] font-bold text-amber-700 mt-2 flex items-center gap-1.5 leading-normal">
                {t.androidCutoffTip}
              </p>
            </div>

            {/* Drag & Drop File Picker or Drag zone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 shrink-0 ${
                uploadedImage 
                  ? 'border-green-300 bg-green-50/10 hover:bg-green-50/20' 
                  : 'border-slate-300 hover:border-primary/40 hover:bg-primary/5 bg-white'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform ${uploadedImage ? 'bg-green-100 text-green-600 scale-105' : 'bg-slate-100 text-slate-400'}`}>
                  {uploadedImage ? <Check size={34} className="stroke-[3]" /> : <Upload size={30} />}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700 uppercase tracking-tight">
                    {uploadedImage ? (
                      <span className="text-green-700">{lang === 'tr' ? 'Ekran Görüntüsü Yüklendi!' : 'Screenshot Uploaded Successfully!'}</span>
                    ) : (
                      t.dropzone
                    )}
                  </p>
                  <p className="text-[14px] text-slate-400 font-medium mt-1">
                    {uploadedImage ? `${imageMeta?.name} (${imageMeta?.width}x${imageMeta?.height}px)` : t.dropzoneSub}
                  </p>
                </div>
              </div>
            </div>

            {/* ONLY RENDER CONTROLS PANEL IF GÖRSEL YÜKLENMİŞSE */}
            {uploadedImage ? (
              <div className="space-y-6 flex-1 text-left">
                
                {/* 1. LAYOUT MODELS & SIZE PRESETS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preset dimensions */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Smartphone size={16} /> {t.dimensions}
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {(['1242_2688', '1284_2778', '1242_2208'] as PresetSize[]).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setPresetSize(sz)}
                          className={`w-full py-2 px-4 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                            presetSize === sz 
                              ? 'bg-primary-mid border-primary text-white shadow-md shadow-primary/10' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{t.presets[sz]}</span>
                          {presetSize === sz && <Check size={16} className="stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout selector */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Layers size={15} /> {t.layoutMode}
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {(['frame', 'blur', 'fit'] as LayoutMode[]).map((md) => {
                        const labelMap = {
                          frame: t.modeFrame,
                          blur: t.modeBlur,
                          fit: t.modeFit
                        };
                        return (
                          <button
                            key={md}
                            onClick={() => {
                              setLayoutMode(md);
                              // Auto zoom if simple fit is selected
                              if (md === 'fit') setZoomScale(95);
                              else if (md === 'frame') setZoomScale(100);
                            }}
                            className={`w-full py-2 px-4 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                              layoutMode === md 
                                ? 'bg-primary-mid border-primary text-white shadow-md shadow-primary/10' 
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50'
                            }`}
                          >
                            <span>{labelMap[md]}</span>
                            {layoutMode === md && <Check size={16} className="stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. SPECIFIC DEVICE & MOCKUP ADJUSTMENT FIELDS */}
                <div className="bg-slate-100/40 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                    <h4 className="text-[15px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Sparkles size={16} /> {t.optionsTitle}
                    </h4>
                    <button 
                      onClick={handleReset}
                      className="text-[14px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest flex items-center gap-1"
                    >
                      <RotateCw size={14} className="stroke-[2.5]" /> {t.reset}
                    </button>
                  </div>

                  {/* Android specific auto-crop bar tickbox */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <input 
                      type="checkbox" 
                      id="strip-android"
                      checked={stripAndroidBars}
                      onChange={(e) => setStripAndroidBars(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                    />
                    <label htmlFor="strip-android" className="text-[15px] sm:text-xs font-bold text-slate-700 cursor-pointer select-none leading-tight">
                      {t.optionStrip}
                    </label>
                  </div>

                  {/* Manual vertical adjustment sliders for perfect alignment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[15px] font-bold text-slate-500">
                        <span>{t.optionScale}</span>
                        <span className="font-mono text-slate-700">{zoomScale}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="180" 
                        value={zoomScale} 
                        onChange={(e) => setZoomScale(parseInt(e.target.value))}
                        className="w-full accent-primary h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[15px] font-bold text-slate-500">
                        <span>{t.optionAdjustY}</span>
                        <span className="font-mono text-slate-700">{customOffsetY > 0 ? `+${customOffsetY}` : customOffsetY}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="-200" 
                        max="200" 
                        value={customOffsetY} 
                        onChange={(e) => setCustomOffsetY(parseInt(e.target.value))}
                        className="w-full accent-primary h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Text customization (Only relevant if layoutMode === 'frame') */}
                  {layoutMode === 'frame' && (
                    <div className="space-y-3.5 pt-2 border-t border-slate-200/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[14px] font-black uppercase text-slate-400 tracking-wider">{t.labelTitle}</label>
                          <input 
                            type="text" 
                            value={titleText} 
                            onChange={(e) => setTitleText(e.target.value)}
                            placeholder="GOOFIND"
                            className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:border-primary shrink-0"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[14px] font-black uppercase text-slate-400 tracking-wider">{t.labelSubtitle}</label>
                          <input 
                            type="text" 
                            value={subtitleText} 
                            onChange={(e) => setSubtitleText(e.target.value)}
                            placeholder={lang === 'tr' ? 'Kanada Türk Topluluğu' : "Canada's Turkish Community"}
                            className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:border-primary shrink-0"
                          />
                        </div>
                      </div>

                      {/* Theme selection carousel */}
                      <div className="space-y-1.5">
                        <label className="text-[14px] font-black uppercase text-slate-400 tracking-wider">{t.labelBgColor}</label>
                        <div className="flex flex-wrap gap-2">
                          {bgThemes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setBgStyle(theme.id)}
                              className={`px-3 py-1.5 rounded-lg border text-[14px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                bgStyle === theme.id 
                                  ? 'bg-slate-900 border-slate-900 text-white shadow' 
                                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                              }`}
                            >
                              {/* Color preview circle */}
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shrink-0" 
                                style={{ background: `linear-gradient(135deg, ${theme.grad[0]} 0%, ${theme.grad[1]} 100%)` }}
                              />
                              <span>{theme.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* 3. DOWNLOAD ACTIONS FOOTER */}
                <button 
                  onClick={handleDownload}
                  className="w-full py-4 sm:py-5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-2xl font-black text-xs sm:text-xs uppercase tracking-widest shadow-xl shadow-green-500/10 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Download size={19} className="stroke-[3]" />
                  <span>{t.btnDownload}</span>
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl p-10 bg-white">
                <HelpCircle size={50} className="text-slate-300 mb-2 stroke-[1.5]" />
                <p className="text-xs font-bold text-slate-400">{t.emptyMessage}</p>
              </div>
            )}

          </div>

          {/* RIGHT SIDE: LIVE HD CANVAS PREVIEW VIEW (40% width) */}
          <div className="w-full lg:w-[350px] flex flex-col max-h-full">
            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200/80 mb-4 shrink-0">
              <span className="text-[14px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-center gap-1.5">
                <Eye size={16} /> {t.previewTitle}
              </span>
            </div>

            {/* Simulated Live scroll container for the 1242x2688 real canvas */}
            <div className="flex-1 overflow-auto bg-slate-900 rounded-[2.5rem] p-4 flex justify-center items-center relative aspect-[9/19.5] border-4 border-slate-800 shadow-xl min-h-[400px]">
              
              {/* Actual invisible canvas used for compilation of high-res image */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Responsive scaled visual representation displayed to user */}
              {canvasUrl ? (
                <img 
                  src={canvasUrl} 
                  alt="App Store Live Mockup Preview" 
                  className="max-h-full rounded-[1.8rem] border border-slate-800 object-contain shadow-2xl transition-all"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              ) : (
                <div className="text-center p-6 text-[14px] font-bold text-slate-400 italic">
                  {t.emptyMessage}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
