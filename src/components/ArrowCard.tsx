import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  pill?: boolean
}

export default function ArrowCard({ entry, pill }: Props) {
  // Function to determine which icon to use based on collection or tags
  const getIcon = () => {
    if (entry.collection === "blog") return "document";
    if (entry.collection === "projects") return "code";
    return "star"; // default icon
  };

  return (
    <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-white/10 border-white/20 transition-colors duration-300 ease-in-out">
      <div class="flex-1 flex justify-center">
        <div class="p-3 rounded border border-white/25 bg-black/20 backdrop-blur-sm">
          <svg class="size-6 fill-current">
            <use href={`/ui.svg#${getIcon()}`}></use>
          </svg>
        </div>
      </div>

      <div class="flex-1 flex justify-center">
        <div class="p-3 rounded border border-white/25 bg-black/20 backdrop-blur-sm">
          <svg class="size-6 fill-current">
            <use href="/ui.svg#calendar"></use>
          </svg>
        </div>
      </div>

      <div class="flex-1 flex justify-center">
        <div class="p-3 rounded border border-white/25 bg-black/20 backdrop-blur-sm">
          <svg class="size-6 fill-current">
            <use href="/ui.svg#tag"></use>
          </svg>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-white">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
  )
}
