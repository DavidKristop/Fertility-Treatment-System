interface LoaderProps {
  size?: "sm" | "md" | "lg"
}

export default function Loader({ size = "md"}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }
  return (
    <div className={"flex items-center justify-center py-12"}>
      <div className="flex flex-col items-center gap-4">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`} />
      </div>
    </div>
  )
}