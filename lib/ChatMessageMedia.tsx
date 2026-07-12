import React, { useRef } from 'react';
import { Image as ImageIcon, Loader2, SendHorizontal, X } from 'lucide-react';

type Lang = 'en' | 'tr';

type ChatImageAttachButtonProps = {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  title?: string;
  compact?: boolean;
};

export function ChatImageAttachButton({
  onFileChange,
  disabled = false,
  className = '',
  buttonClassName = '',
  title,
  compact = false,
}: ChatImageAttachButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        title={title}
        className={
          buttonClassName ||
          `${compact ? 'w-9 h-9' : 'w-11 h-11'} rounded-full bg-transparent hover:bg-slate-200/80 text-slate-500 hover:text-primary flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 shrink-0`
        }
      >
        <ImageIcon size={compact ? 18 : 20} />
      </button>
    </div>
  );
}

type ChatSendArrowButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  title?: string;
  size?: 'md' | 'lg';
};

export function ChatSendArrowButton({
  onClick,
  disabled = false,
  type = 'button',
  title,
  size = 'md',
}: ChatSendArrowButtonProps) {
  const dimension = size === 'lg' ? 'w-12 h-12' : 'w-11 h-11';
  const iconSize = size === 'lg' ? 22 : 20;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`${dimension} shrink-0 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <SendHorizontal size={iconSize} strokeWidth={2.5} />
    </button>
  );
}

type ChatMessageComposerProps = {
  onSend: () => void;
  onImagePick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage?: string | null;
  onClearImage?: () => void;
  isUploadingImage?: boolean;
  lang: Lang;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  inputName?: string;
  inputId?: string;
  mode?: 'input' | 'textarea';
  disabled?: boolean;
  showImageAttach?: boolean;
  leftSlot?: React.ReactNode;
  asForm?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  sendTitle?: string;
};

export function ChatMessageComposer({
  onSend,
  onImagePick,
  selectedImage,
  onClearImage,
  isUploadingImage = false,
  lang,
  placeholder,
  inputRef,
  inputName,
  inputId,
  mode = 'input',
  disabled = false,
  showImageAttach = true,
  leftSlot,
  asForm = false,
  onSubmit,
  className = '',
  sendTitle,
}: ChatMessageComposerProps) {
  const resolvedPlaceholder = placeholder || (
    selectedImage
      ? (lang === 'en' ? 'Add a caption...' : 'Açıklama ekle...')
      : (lang === 'en' ? 'Type a message...' : 'Mesaj yazın...')
  );

  const handleEnterSend = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && mode === 'input') {
      e.preventDefault();
      onSend();
    }
  };

  const composerBar = (
    <div
      className={`flex gap-1 bg-slate-50 rounded-[2rem] border border-slate-200 p-1.5 pl-2 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-inner ${
        mode === 'textarea' ? 'items-end' : 'items-center'
      }`}
    >
      {leftSlot}
      {showImageAttach && onImagePick && (
        <ChatImageAttachButton
          onFileChange={onImagePick}
          disabled={disabled || isUploadingImage}
          compact
          title={lang === 'en' ? 'Attach image' : 'Görsel ekle'}
        />
      )}
      {mode === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={inputId}
          name={inputName}
          rows={2}
          placeholder={resolvedPlaceholder}
          disabled={disabled || isUploadingImage}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="flex-1 min-w-0 bg-transparent px-2 py-2.5 outline-none font-medium text-sm text-slate-800 placeholder:text-slate-400 resize-none min-h-[44px] max-h-[120px]"
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={inputId}
          name={inputName}
          type="text"
          placeholder={resolvedPlaceholder}
          disabled={disabled || isUploadingImage}
          onKeyDown={handleEnterSend}
          className="flex-1 min-w-0 bg-transparent px-2 py-2.5 outline-none font-medium text-sm md:text-base text-slate-800 placeholder:text-slate-400"
        />
      )}
      <ChatSendArrowButton
        type={asForm ? 'submit' : 'button'}
        onClick={asForm ? undefined : onSend}
        disabled={disabled || isUploadingImage}
        title={sendTitle || (lang === 'en' ? 'Send message' : 'Mesaj gönder')}
        size={mode === 'textarea' ? 'md' : 'md'}
      />
    </div>
  );

  const content = (
    <div className={`space-y-3 ${className}`}>
      {selectedImage && onClearImage && (
        <ChatImagePreviewStrip
          imageUrl={selectedImage}
          onClear={onClearImage}
          lang={lang}
          isUploading={isUploadingImage}
        />
      )}
      {isUploadingImage && !selectedImage && (
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest animate-pulse px-2 py-1">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span>{lang === 'en' ? 'Processing image...' : 'Görsel hazırlanıyor...'}</span>
        </div>
      )}
      {composerBar}
    </div>
  );

  if (asForm) {
    return (
      <form
        onSubmit={(e) => {
          if (onSubmit) {
            onSubmit(e);
            return;
          }
          e.preventDefault();
          onSend();
        }}
      >
        {content}
      </form>
    );
  }

  return content;
}

type ChatImagePreviewStripProps = {
  imageUrl: string;
  onClear: () => void;
  lang: Lang;
  isUploading?: boolean;
};

export function ChatImagePreviewStrip({
  imageUrl,
  onClear,
  lang,
  isUploading = false,
}: ChatImagePreviewStripProps) {
  return (
    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white shrink-0">
          <img src={imageUrl} className="w-full h-full object-cover" alt="Attachment preview" />
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 size={18} className="text-white animate-spin" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-black tracking-widest text-primary uppercase">
            {lang === 'en' ? 'Ready to Send' : 'Gönderime Hazır'}
          </p>
          <p className="text-[13px] font-bold text-slate-400 mt-0.5 truncate">
            {lang === 'en' ? 'Add a caption or send now.' : 'Açıklama ekleyin veya direkt gönderin.'}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all active:scale-95 shrink-0"
        aria-label={lang === 'en' ? 'Remove image' : 'Görseli kaldır'}
      >
        <X size={18} />
      </button>
    </div>
  );
}

type ChatMessageImageBubbleProps = {
  imageUrl: string;
  onPreview?: (imageUrl: string) => void;
  isOnPrimaryBg?: boolean;
  lang: Lang;
  className?: string;
};

export function ChatMessageImageBubble({
  imageUrl,
  onPreview,
  isOnPrimaryBg = false,
  lang,
  className = '',
}: ChatMessageImageBubbleProps) {
  return (
    <div
      onClick={() => onPreview?.(imageUrl)}
      className={`mb-2 max-w-xs overflow-hidden rounded-2xl border hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-sm relative group/img ${
        isOnPrimaryBg ? 'border-white/20' : 'border-black/5'
      } ${className}`}
    >
      <img
        src={imageUrl}
        alt="Attached"
        className="w-full h-auto object-cover max-h-64 sm:max-h-72"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover/img:opacity-100 bg-black/50 text-white text-[12px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm transition-all">
          {lang === 'en' ? 'View' : 'Büyüt'}
        </span>
      </div>
    </div>
  );
}

type ChatMessageBodyProps = {
  content?: string;
  imageUrl?: string;
  type?: 'text' | 'image';
  onImagePreview?: (imageUrl: string) => void;
  isOnPrimaryBg?: boolean;
  lang: Lang;
  textClassName?: string;
};

export function ChatMessageBody({
  content,
  imageUrl,
  type,
  onImagePreview,
  isOnPrimaryBg = false,
  lang,
  textClassName = 'text-sm font-medium leading-relaxed break-words whitespace-pre-wrap',
}: ChatMessageBodyProps) {
  const showImage = (type === 'image' || !!imageUrl) && !!imageUrl;
  const showText = !!content && content !== '📷';

  return (
    <>
      {showImage && (
        <ChatMessageImageBubble
          imageUrl={imageUrl!}
          onPreview={onImagePreview}
          isOnPrimaryBg={isOnPrimaryBg}
          lang={lang}
        />
      )}
      {showText && <div className={textClassName}>{content}</div>}
    </>
  );
}
