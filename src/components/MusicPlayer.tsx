// Reproductor de música invisible: escucha eventos CustomEvent para play/pause
import { useEffect, useRef } from 'react'

export default function MusicPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		// Configurar audio
		audio.volume = 0.4
		audio.loop = true

		// Escuchar evento del SplashScreen para iniciar
		const handlePlay = () => {
			audio.play().catch(() => {
				// Si el browser bloquea, se ignora silenciosamente
			})
		}

		// Escuchar evento del MusicToggle (footer) para toggle
		const handleToggle = () => {
			if (audio.paused) {
				audio.play().catch(() => {})
			} else {
				audio.pause()
			}
			// Notificar el estado actual al toggle del footer
			window.dispatchEvent(new CustomEvent('music:state', {
				detail: { isPlaying: !audio.paused }
			}))
		}

		window.addEventListener('music:play', handlePlay)
		window.addEventListener('music:toggle', handleToggle)

		return () => {
			window.removeEventListener('music:play', handlePlay)
			window.removeEventListener('music:toggle', handleToggle)
		}
	}, [])

	return (
		<audio
			ref={audioRef}
			src="/audio/Ariana Grande, - Love Me Harder.mp3"
			preload="auto"
		/>
	)
}
