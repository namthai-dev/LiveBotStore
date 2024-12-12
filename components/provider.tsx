import { StackProvider, StackTheme } from "@stackframe/stack";
import { ThemeProvider } from 'next-themes'

export function Provider({
    children,
    ...props
}: React.ComponentProps<typeof StackProvider>) {
    return <StackProvider {...props}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <StackTheme>
                {children}
            </StackTheme>
        </ThemeProvider>
    </StackProvider>
}
