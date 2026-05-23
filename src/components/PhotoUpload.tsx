// Subir fotos del evento a Supabase Storage (mobile-first, sin drag & drop)
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const MAX_FILES = 5
const MAX_SIZE_MB = 50
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']

interface FilePreview {
	file: File
	url: string
}

export default function PhotoUpload() {
	const [previews, setPreviews] = useState<FilePreview[]>([])
	const [isUploading, setIsUploading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files) return

		setFeedback(null)
		const newPreviews: FilePreview[] = []

		for (const file of Array.from(files)) {
			// Validar tipo
			if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
				setFeedback({ type: 'error', text: `${file.name} no es una imagen válida` })
				continue
			}

			// Validar tamaño
			if (file.size > MAX_SIZE_MB * 1024 * 1024) {
				setFeedback({ type: 'error', text: `${file.name} supera los ${MAX_SIZE_MB}MB` })
				continue
			}

			// Validar máximo de archivos
			if (previews.length + newPreviews.length >= MAX_FILES) {
				setFeedback({ type: 'error', text: `Máximo ${MAX_FILES} fotos por envío` })
				break
			}

			// Crear preview (HEIC no tiene preview en browser)
			const url = file.type.includes('heic') ? '' : URL.createObjectURL(file)
			newPreviews.push({ file, url })
		}

		setPreviews(prev => [...prev, ...newPreviews])

		// Limpiar input para poder seleccionar los mismos archivos de nuevo
		e.target.value = ''
	}

	function removeFile(index: number) {
		setPreviews(prev => {
			const removed = prev[index]
			if (removed.url) URL.revokeObjectURL(removed.url)
			return prev.filter((_, i) => i !== index)
		})
	}

	// Formatear tamaño de archivo
	function formatSize(bytes: number): string {
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
	}

	async function handleUpload() {
		if (previews.length === 0) return

		setIsUploading(true)
		setFeedback(null)
		setProgress(0)

		let uploaded = 0

		const uploads = previews.map(async ({ file }) => {
			const timestamp = Date.now()
			const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
			const path = `${timestamp}_${safeName}`

			const { error } = await supabase.storage
				.from('event-photos')
				.upload(path, file)

			uploaded++
			setProgress(Math.round((uploaded / previews.length) * 100))

			return error
		})

		const results = await Promise.all(uploads)
		const errors = results.filter(Boolean)

		setIsUploading(false)

		if (errors.length > 0) {
			setFeedback({ type: 'error', text: `Error al subir ${errors.length} foto(s)` })
		} else {
			// Limpiar previews
			previews.forEach(p => { if (p.url) URL.revokeObjectURL(p.url) })
			setPreviews([])
			setProgress(0)
			setFeedback({ type: 'success', text: '¡Fotos subidas exitosamente!' })
		}
	}

	return (
		<div className="max-w-lg mx-auto">
			<div className="glass-strong p-6 sm:p-8">
				{/* Botón para seleccionar fotos */}
				<label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-primary-300 rounded-xl cursor-pointer hover:border-gold-400 transition-colors">
					<svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
					</svg>
					<span className="font-sans text-sm text-primary-600">
						Toca para seleccionar fotos
					</span>
					<span className="font-sans text-[10px] text-primary-400">
						JPG, PNG, WEBP o HEIC · Máx {MAX_SIZE_MB}MB · Hasta {MAX_FILES} fotos
					</span>
					<input
						type="file"
						accept="image/jpeg,image/png,image/webp,image/heic,.heic"
						multiple
						onChange={handleFileSelect}
						className="hidden"
					/>
				</label>

				{/* Previews */}
				{previews.length > 0 && (
					<div className="mt-6">
						<div className="grid grid-cols-3 gap-3">
							{previews.map((preview, i) => (
								<div key={i} className="relative group">
									{preview.url ? (
										<img
											src={preview.url}
											alt={preview.file.name}
											className="w-full aspect-square object-cover rounded-xl"
										/>
									) : (
										// Placeholder para HEIC
										<div className="w-full aspect-square rounded-xl bg-primary-100 flex items-center justify-center">
											<span className="text-xs text-primary-400">HEIC</span>
										</div>
									)}
									{/* Botón eliminar */}
									<button
										type="button"
										onClick={() => removeFile(i)}
										className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow-md cursor-pointer"
									>
										✕
									</button>
									<p className="text-[9px] text-primary-400 text-center mt-1 truncate">
										{formatSize(preview.file.size)}
									</p>
								</div>
							))}
						</div>

						{/* Barra de progreso */}
						{isUploading && (
							<div className="mt-4 w-full bg-primary-100 rounded-full h-2 overflow-hidden">
								<div
									className="h-full rounded-full transition-all duration-300"
									style={{
										width: `${progress}%`,
										background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
									}}
								/>
							</div>
						)}

						{/* Botón subir */}
						<button
							type="button"
							onClick={handleUpload}
							disabled={isUploading}
							className="w-full mt-4 py-3 rounded-xl font-display text-sm tracking-wider uppercase transition-all cursor-pointer
								bg-gradient-to-r from-gold-400 to-gold-500 text-white shadow-md
								hover:from-gold-500 hover:to-gold-600 hover:shadow-lg
								disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isUploading ? `Subiendo... ${progress}%` : `Subir ${previews.length} foto${previews.length > 1 ? 's' : ''}`}
						</button>
					</div>
				)}

				{/* Feedback */}
				{feedback && (
					<p className={`text-center text-sm mt-4 font-sans ${
						feedback.type === 'success' ? 'text-green-600' : 'text-red-500'
					}`}>
						{feedback.text}
					</p>
				)}
			</div>
		</div>
	)
}
