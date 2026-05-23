// Libro de visitas: solo formulario para enviar mensajes a Supabase
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function GuestBook() {
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isCooldown, setIsCooldown] = useState(false)
	const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	// Limpiar feedback después de 3 segundos
	useEffect(() => {
		if (!feedback) return
		const timer = setTimeout(() => setFeedback(null), 3000)
		return () => clearTimeout(timer)
	}, [feedback])

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		const trimmedName = name.trim()
		const trimmedMessage = message.trim()

		if (!trimmedName || !trimmedMessage) return

		setIsLoading(true)

		const { error } = await supabase
			.from('messages')
			.insert({ name: trimmedName, message: trimmedMessage })

		setIsLoading(false)

		if (error) {
			setFeedback({ type: 'error', text: 'Hubo un error, intenta de nuevo' })
			return
		}

		setName('')
		setMessage('')
		setFeedback({ type: 'success', text: '¡Mensaje enviado!' })
		window.dispatchEvent(new CustomEvent('guestbook:new'))

		// Cooldown de 3 segundos para evitar spam
		setIsCooldown(true)
		setTimeout(() => setIsCooldown(false), 3000)
	}

	const isDisabled = isLoading || isCooldown || !name.trim() || !message.trim()

	return (
		<div className="max-w-lg mx-auto">
			<form onSubmit={handleSubmit} className="p-6 sm:p-8">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Tu Nombre"
						value={name}
						onChange={e => setName(e.target.value)}
						maxLength={100}
						required
						className="w-full px-4 py-3 rounded-xl bg-white border border-primary-600 text-primary-800 placeholder:text-primary-600 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-all"
					/>
				</div>

				<div className="mb-4">
					<textarea
						placeholder="Escribe un deseo para Ana Valeria..."
						value={message}
						onChange={e => setMessage(e.target.value)}
						maxLength={500}
						required
						rows={3}
						className="w-full px-4 py-3 rounded-xl bg-white border border-primary-600 text-primary-800 placeholder:text-primary-600 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-all resize-none"
					/>
					<p className="text-right text-xs text-primary-400/60 mt-1 font-sans">
						{message.length}/500
					</p>
				</div>

				<button
					type="submit"
					disabled={isDisabled}
					className="w-full py-3 rounded-xl font-display text-sm tracking-wider uppercase transition-all cursor-pointer
						bg-gradient-to-r from-gold-400 to-gold-500 text-white shadow-md
						hover:from-gold-500 hover:to-gold-600 hover:shadow-lg
						disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Enviando...' : 'Enviar Mensaje'}
				</button>

				{feedback && (
					<p className={`text-center text-sm mt-3 font-sans ${
						feedback.type === 'success' ? 'text-green-600' : 'text-red-500'
					}`}>
						{feedback.text}
					</p>
				)}
			</form>
		</div>
	)
}
