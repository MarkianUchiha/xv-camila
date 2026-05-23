// Overlay de bienvenida: cualquier toque cierra el splash y arranca la música
import { useState } from 'react'

export default function SplashScreen() {
	const [isVisible, setIsVisible] = useState(true)

	const handleOpen = () => {
		// Dispara evento para que MusicPlayer arranque la música
		window.dispatchEvent(new CustomEvent('music:play'))
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div
			onClick={handleOpen}
			className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
			style={{
				backgroundImage: 'linear-gradient(180deg, rgba(15,28,38,0.85) 0%, rgba(15,28,38,0.65) 50%, rgba(15,28,38,0.9) 100%), url(/gallery/portada-Vale.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* Card glass translúcida */}
			<div
				className="mx-6 px-10 py-12 rounded-2xl text-center"
				style={{
					background: 'rgba(255, 255, 255, 0.08)',
					backdropFilter: 'blur(12px)',
					WebkitBackdropFilter: 'blur(12px)',
					border: '1px solid rgba(255, 255, 255, 0.12)',
				}}
			>
				<p className="font-display text-xs tracking-[0.4em] text-gold-400/70 uppercase mb-6">
					Estás invitado
				</p>

				<h2 className="font-serif text-4xl sm:text-5xl text-white/90 italic leading-tight">
					Ana Valeria
				</h2>

				<p className="font-sans text-sm text-white/50 mt-3">
					Mis XV Años
				</p>

				<div className="w-16 h-px bg-gold-400/30 mx-auto my-8" />

				<p className="font-sans text-xs text-white/30 animate-pulse">
					Toca para abrir la invitación
				</p>
			</div>
		</div>
	)
}
