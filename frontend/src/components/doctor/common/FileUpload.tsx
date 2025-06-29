"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, FileText } from "lucide-react"

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  accept?: string
  maxSize?: number
  multiple?: boolean
  label?: string
  className?: string
}

export default function FileUpload({
  files,
  onFilesChange,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 10,
  multiple = true,
  label = "Tải lên file đính kèm",
  className = "",
}: FileUploadProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      onFilesChange(Array.from(selectedFiles))
    }
  }

  return (
    <div className={className}>
      <Label htmlFor="attachments">{label}</Label>
      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">Kéo thả file hoặc click để chọn</p>
        <p className="text-xs text-gray-400 mb-4">PDF, JPG, PNG (tối đa {maxSize}MB mỗi file)</p>
        <input
          type="file"
          id="attachments"
          multiple={multiple}
          accept={accept}
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button type="button" variant="outline" onClick={() => document.getElementById("attachments")?.click()}>
          Chọn file
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">File đã chọn:</p>
          <div className="space-y-1">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
                <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
