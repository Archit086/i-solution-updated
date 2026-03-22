import { cn } from "../../lib/utils"
import { Avatar, AvatarImage } from "./avatar"

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border border-border-default",
        "bg-gradient-to-b from-body to-pure-white",
        "p-4 text-start sm:p-6",
        "hover:shadow-md",
        "w-[320px] sm:w-[320px]",
        "transition-all duration-300",
        className
      )}
      style={{
         background: 'linear-gradient(180deg, #F4F7F5 0%, #FFFFFF 100%)'
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border border-border-default">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start text-left">
          <h3 className="text-md font-bold font-display leading-none text-text-dark">
            {author.name}
          </h3>
          <p className="text-xs text-brand-teal mt-1 font-semibold uppercase tracking-wider">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-text-body font-body leading-relaxed text-left">
        {text}
      </p>
    </Card>
  )
}
