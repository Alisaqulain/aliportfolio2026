import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { SceneProvider } from '@/components/layout/scene-provider'
import { CommandPalette } from '@/components/ui/command-palette'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <SceneProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CommandPalette />
    </SceneProvider>
  )
}
