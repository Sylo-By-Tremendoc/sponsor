import type { ReactNode } from "react"
import { cn } from "../../../utils/class-name"

export const Section = ({ children, className }: { children: ReactNode, className?: string }) => {
   return (
      <section className={cn("py-10 px-4 md:py-20 md:px-32 overflow-hidden", className)}>
         {children}
      </section>
   )
}

export const TitleText = ({ children, className }: { children: ReactNode, className?: string }) => {
   return (
      <h2 className={cn("m-auto text-xl sm:text-2xl md:max-w-xl leading-snug mb-8", className)}>
         {children}
      </h2>
   )
} 