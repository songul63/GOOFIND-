
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            background: '#EFF6FF',
            color: '#0A0F1A',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            textAlign: 'center',
            gap: 12,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 20, color: '#DC2626' }}>Uygulama yüklenemedi</h1>
          <p style={{ margin: 0, maxWidth: 420, fontSize: 14, lineHeight: 1.5 }}>
            Telefonda test için bilgisayarda{' '}
            <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4 }}>
              npm run phone
            </code>{' '}
            çalıştırın. Terminalde çıkan{' '}
            <strong>http://192.168.x.x:4173</strong> adresini telefon tarayıcısında açın (aynı Wi-Fi).
            <code style={{ background: '#E2E8F0', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>
              localhost
            </code>{' '}
            telefonda çalışmaz.
          </p>
          <pre
            style={{
              margin: 0,
              maxWidth: 'min(100%, 640px)',
              overflow: 'auto',
              textAlign: 'left',
              fontSize: 11,
              background: '#fff',
              border: '1px solid #CBD5E1',
              borderRadius: 8,
              padding: 12,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {this.state.error.message}
            {this.state.error.stack ? `\n\n${this.state.error.stack}` : ''}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Safe global logging patch to prevent "Converting circular structure to JSON"
// which happens when Capacitor Core / Vite native bridges intercept console logs containing complex or circular objects.
const patchConsole = () => {
  const methods: ('error' | 'warn' | 'log' | 'info' | 'debug')[] = ['error', 'warn', 'log', 'info', 'debug'];
  methods.forEach(method => {
    const original = console[method];
    if (typeof original === 'function') {
      console[method] = function (...args: any[]) {
        const safeArgs = args.map(arg => {
          if (arg instanceof Error) {
            return `${arg.name}: ${arg.message}\n${arg.stack || ''}`;
          }
          if (typeof arg === 'object' && arg !== null) {
            try {
              JSON.stringify(arg);
              return arg;
            } catch (e) {
              const constructorName = arg.constructor?.name || 'Object';
              const msg = (arg as any).message || (arg as any).error || '';
              return `[Circular/Complex ${constructorName}] ${msg}`.trim();
            }
          }
          return arg;
        });
        original.apply(console, safeArgs);
      };
    }
  });
};
patchConsole();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
