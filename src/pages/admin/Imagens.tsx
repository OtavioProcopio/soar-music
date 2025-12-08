import React, { useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Upload, Image as ImageIcon, CheckCircle, X, Copy } from 'lucide-react'

interface UploadedImage {
  url: string
  path: string
}

export const AdminImagens: React.FC = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setError(null)
    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} não é uma imagem válida`)
        }

        const { url, path } = await adminService.uploadImagem(file)
        return { url, path }
      })

      const results = await Promise.all(uploadPromises)
      setUploadedImages([...results, ...uploadedImages])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copiada para a área de transferência!')
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Upload de Imagens</h1>
        <p className="text-gray-400">Enviar imagens para o Supabase Storage</p>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`mb-6 border-2 border-dashed rounded-xl p-12 text-center transition ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-gray-700 bg-gray-900 hover:border-purple-500/50'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Upload className="w-10 h-10 text-purple-500" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Arraste imagens aqui ou clique para selecionar
            </h3>
            <p className="text-gray-400 mb-4">
              Formatos suportados: JPG, PNG, GIF, WebP
            </p>
          </div>

          <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={uploading}
            />
            Selecionar Arquivos
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Loading State */}
      {uploading && (
        <div className="mb-6 bg-purple-500/10 border border-purple-500 text-purple-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Enviando imagens...</span>
          </div>
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-white">
              Imagens Enviadas ({uploadedImages.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition"
              >
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={image.url}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 break-all">{image.path}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 mb-1">URL Pública:</p>
                    <p className="text-xs text-white break-all">{image.url}</p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(image.url)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedImages.length === 0 && !uploading && (
        <div className="text-center py-12 text-gray-400">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhuma imagem enviada ainda</p>
        </div>
      )}
    </div>
  )
}
