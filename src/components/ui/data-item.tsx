import { LucideIcon } from "lucide-react"

interface DataItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function DataItem({ icon: Icon, label, value }: DataItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-5 text-gray-500 mt-0.5" />
      <div>
        <h2 className="text-sm font-medium text-gray-950">{label}</h2>
        <p className="text-lg font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  )
}
