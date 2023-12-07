import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Button from "../Button";
import { useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[],
  onSelect: (category: string) => void,
  selectedCategory: string
}

const TRANSLATE_AMOUNT = 200

export default function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillProps) {
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(true)

  const [translate, setTranslate] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    // Overflow x allows us to have this div which "toggles" side to side
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div

        className="flex whitespace-nowrap gap-3
      transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}>
        {categories.map(category => (
          <Button key={category} variant={selectedCategory === category ? 'dark' : 'default'} className="py-1 px-3 rounded-lg whitespace-nowrap"
            onClick={() => onSelect(category)}>
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible &&
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button variant={'ghost'} size={'icon'} className="h-full aspect-square w-auto p-1.5"
            onClick={() => setTranslate(translate => {
              const newTranslate = translate - TRANSLATE_AMOUNT
              if (newTranslate <= 0) {
                return 0
              }
              return newTranslate
            })}>
            <ChevronLeftIcon />
          </Button>
        </div>
      }
      {isRightVisible &&
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button variant={'ghost'} size={'icon'} className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate(translate => {
                if (containerRef.current == null) return translate
                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth

                if (newTranslate + width >= edge) {
                  return edge - width
                }

                return newTranslate
              })
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      }
    </div>
  )
}