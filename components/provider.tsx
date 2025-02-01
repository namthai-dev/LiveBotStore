import { StackProvider, StackTheme } from '@stackframe/stack';
import { ThemeProvider } from 'next-themes';
import { ReactQueryClientProvider } from './react-query-client-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof StackProvider>) {
  return (
    <StackProvider {...props}>
      <EdgeStoreProvider>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StackTheme>{children}</StackTheme>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </EdgeStoreProvider>
    </StackProvider>
  );
}
