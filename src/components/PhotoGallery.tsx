// Galería privada de fotos subidas por invitados desde Supabase Storage
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SECRET_KEY = 'anavaleria2026'

interface PhotoFile {
	name: string
	url: string
}

export default function PhotoGallery() {
	const [photos, setPhotos] = useState<PhotoFile[]>([])
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const key = params.get('key')

		if (key === SECRET_KEY) {
			setIsAuthorized(true)
			fetchPhotos()
		} else {
			setIsLoading(false)
		}
	}, [])

	async function fetchPhotos() {
		const { data, error } = await supabase.storage
			.from('event-photos')
			.list('', { sortBy: { column: 'created_at', order: 'desc' } })

		if (!error && data) {
			const photoFiles = data
				.filter(file => file.name !== '.emptyFolderPlaceholder')
				.map(file => ({
					name: file.name,
					url: supabase.storage.from('event-photos').getPublicUrl(file.name).data.publicUrl,
				}))
			setPhotos(photoFiles)
		}
		setIsLoading(false)
	}

	// Descargar foto individual
	async function handleDownload(photo: PhotoFile) {
		const response = await fetch(photo.url)
		const blob = await response.blob()
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = photo.name
		link.click()
		URL.revokeObjectURL(link.href)
	}

	// Descargar todas las fotos
	async function handleDownloadAll() {
		for (const photo of photos) {
			await handleDownload(photo)
		}
	}

	if (!isAuthorized && !isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center px-6">
				<p className="font-serif text-xl text-primary-800/60 italic text-center">
					Esta página es privada
				</p>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="font-sans text-sm text-primary-500/60 animate-pulse">
					Cargando fotos...
				</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen py-16 px-6" style={{ backgroundColor: '#F0F8FF' }}>
			<div className="max-w-4xl mx-auto">
				<p className="font-display text-xs tracking-[0.35em] text-gold-500 uppercase text-center mb-2">
					Recuerdos del evento
				</p>
				<h1 className="font-serif text-3xl sm:text-4xl text-primary-800 italic text-center mb-4">
					Fotos de tus Invitados
				</h1>

				{photos.length === 0 ? (
					<p className="text-center text-primary-500/60 font-sans text-sm italic mt-10">
						Aún no hay fotos subidas
					</p>
				) : (
					<>
						{/* Botón descargar todas */}
						<div className="text-center mb-8">
							<button
								onClick={handleDownloadAll}
								className="inline-block px-8 py-3 rounded-full font-display text-xs tracking-widest uppercase text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
								style={{ background: 'linear-gradient(135deg, #D4AF37, #B8860B)' }}
							>
								Descargar todas ({photos.length})
							</button>
						</div>

						{/* Grid de fotos */}
						<div className="columns-2 md:columns-3 gap-3 space-y-3">
							{photos.map((photo) => (
								<div key={photo.name} className="break-inside-avoid group relative">
									<img
										src={photo.url}
										alt={photo.name}
										className="w-full rounded-2xl shadow-md"
										loading="lazy"
									/>
									<button
										onClick={() => handleDownload(photo)}
										className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
										title="Descargar"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
										</svg>
									</button>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}
