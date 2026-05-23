// Botón de pause/play para el footer: se comunica con MusicPlayer via CustomEvent
import { useState, useEffect } from 'react'

export default function MusicToggle() {
	const [isPlaying, setIsPlaying] = useState(true)

	useEffect(() => {
		// Escuchar cambios de estado del MusicPlayer
		const handleState = (e: Event) => {
			const detail = (e as CustomEvent).detail
			setIsPlaying(detail.isPlaying)
		}

		window.addEventListener('music:state', handleState)
		return () => window.removeEventListener('music:state', handleState)
	}, [])

	const handleClick = () => {
		window.dispatchEvent(new CustomEvent('music:toggle'))
		setIsPlaying(!isPlaying)
	}

	return (
		<button
			onClick={handleClick}
			className="inline-flex items-center gap-2 text-white/40 hover:text-gold-400/60 transition-colors text-xs font-sans cursor-pointer"
			aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
		>
			{/* Ícono de nota musical */}
			<svg
				className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`}
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
			</svg>
			<span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
		</button>
	)
}
