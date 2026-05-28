// Reproductor de música invisible: escucha eventos CustomEvent para play/pause
import { useEffect, useRef } from 'react'

export default function MusicPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		// Configurar audio: inicia en 15% y hace fade in hasta 100% en 3s
		audio.volume = 0.15
		audio.loop = true

		// Fade in suave usando requestAnimationFrame
		// from -> to en duration ms; corta si el audio se pausa
		const fadeIn = (from = 0.15, to = 1, duration = 3000) => {
			audio.volume = from
			const start = performance.now()
			const step = (now: number) => {
				const t = Math.min((now - start) / duration, 1)
				audio.volume = from + (to - from) * t
				if (t < 1 && !audio.paused) requestAnimationFrame(step)
			}
			requestAnimationFrame(step)
		}

		// Escuchar evento del SplashScreen para iniciar
		const handlePlay = () => {
			audio.play().then(() => fadeIn()).catch(() => {
				// Si el browser bloquea, se ignora silenciosamente
			})
		}

		// Escuchar evento del MusicToggle (footer) para toggle
		const handleToggle = () => {
			if (audio.paused) {
				audio.play().then(() => fadeIn()).catch(() => {})
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
			src="/audio/No Crezcas Mas - Tercer Cielo.mp3"
			preload="auto"
		/>
	)
}
