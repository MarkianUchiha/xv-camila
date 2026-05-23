import { useState, useEffect } from 'react'

// Fecha objetivo: 16 de mayo de 2026 a las 18:00 hrs (CST / America/Mexico_City)
const TARGET_DATE = new Date('2026-05-16T18:00:00-06:00')

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
}

// Calcula el tiempo restante hasta la fecha del evento
function getTimeLeft(): TimeLeft | null {
	const now = new Date()
	const diff = TARGET_DATE.getTime() - now.getTime()

	if (diff <= 0) return null

	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	}
}

// Componente individual de cada unidad del countdown
function TimeUnit({ value, label }: { value: number; label: string }) {
	return (
		<div className="flex flex-col items-center px-3 md:px-5">
			<span
				className="text-4xl md:text-5xl font-serif text-primary-800 tabular-nums leading-none"
				style={{ fontVariantNumeric: 'tabular-nums' }}
			>
				{String(value).padStart(2, '0')}
			</span>
			<span className="text-[10px] md:text-xs font-display uppercase tracking-[0.2em] text-primary-600 mt-2">
				{label}
			</span>
		</div>
	)
}

// Countdown regresivo al evento - se actualiza cada segundo
export default function Countdown() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft())

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	// Si la fecha ya pasó
	if (!timeLeft) {
		return (
			<div className="glass px-8 py-6 text-center">
				<p className="font-serif text-2xl text-gold-500 italic">
					¡Hoy es el gran día!
				</p>
			</div>
		)
	}

	return (
		<div className="glass px-6 py-5 md:px-10 md:py-6">
			<div className="flex items-center justify-center">
				<TimeUnit value={timeLeft.days} label="Días" />
				<span className="text-2xl text-gold-400 font-light mx-1 self-start mt-1">:</span>
				<TimeUnit value={timeLeft.hours} label="Horas" />
				<span className="text-2xl text-gold-400 font-light mx-1 self-start mt-1">:</span>
				<TimeUnit value={timeLeft.minutes} label="Min" />
				<span className="text-2xl text-gold-400 font-light mx-1 self-start mt-1">:</span>
				<TimeUnit value={timeLeft.seconds} label="Seg" />
			</div>
		</div>
	)
}
