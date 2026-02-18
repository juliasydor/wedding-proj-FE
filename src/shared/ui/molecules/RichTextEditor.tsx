'use client';

import { useRef, useCallback } from 'react';
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({ onClick, active, children, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'p-1.5 rounded transition-colors',
        active
          ? 'bg-secondary/20 text-secondary'
          : 'text-subtitle hover:text-foreground hover:bg-quaternary'
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Digite seu texto aqui...',
  className,
  minHeight = '150px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();

    // Trigger onChange after command
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return (
    <div className={cn('border border-border rounded-xl overflow-hidden bg-input-bg', className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-2 border-b border-border/50 bg-quaternary/30 flex-wrap">
        <ToolbarButton onClick={() => execCommand('bold')} title="Negrito">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('italic')} title="Itálico">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('underline')} title="Sublinhado">
          <Underline className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border/50 mx-1" />

        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Lista">
          <List className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border/50 mx-1" />

        <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Alinhar à esquerda">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Centralizar">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('justifyRight')} title="Alinhar à direita">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border/50 mx-1" />

        <select
          onChange={(e) => {
            if (e.target.value) {
              execCommand('fontSize', e.target.value);
            }
          }}
          defaultValue=""
          className="text-xs bg-transparent border border-border/50 rounded px-1.5 py-1 text-foreground"
        >
          <option value="" disabled>Tamanho</option>
          <option value="1">Pequeno</option>
          <option value="3">Normal</option>
          <option value="5">Grande</option>
          <option value="7">Muito Grande</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        className={cn(
          'px-4 py-3 text-foreground text-sm focus:outline-none',
          'empty:before:content-[attr(data-placeholder)] empty:before:text-subtitle empty:before:pointer-events-none',
          '[&_b]:font-bold [&_i]:italic [&_u]:underline',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5'
        )}
        style={{ minHeight }}
      />
    </div>
  );
}
