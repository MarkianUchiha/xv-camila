// Muestra un mensaje real de Supabase que rota cada 5 segundos
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Message {
	id: string
	name: string
	message: string
}

export default function RandomWish() {
	const [messages, setMessages] = useState<Message[]>([])
	const [index, setIndex] = useState(0)
	const [isVisible, setIsVisible] = useState(true)

	// Cargar mensajes al montar
	useEffect(() => {
		async function fetchMessages() {
			const { data } = await supabase
				.from('messages')
				.select('id, name, message')
				.order('created_at', { ascending: false })
				.limit(20)

			if (data && data.length > 0) {
				setMessages(data)
			}
		}
		fetchMessages()
	}, [])

	// Rotar cada 5 segundos
	useEffect(() => {
		if (messages.length <= 1) return

		const interval = setInterval(() => {
			setIsVisible(false)
			setTimeout(() => {
				setIndex(prev => (prev + 1) % messages.length)
				setIsVisible(true)
			}, 400)
		}, 5000)

		return () => clearInterval(interval)
	}, [messages])

	// Escuchar cuando se envía un mensaje nuevo desde el GuestBook
	useEffect(() => {
		const handleNew = () => {
			supabase
				.from('messages')
				.select('id, name, message')
				.order('created_at', { ascending: false })
				.limit(20)
				.then(({ data }) => {
					if (data && data.length > 0) {
						setMessages(data)
						setIndex(0)
					}
				})
		}

		window.addEventListener('guestbook:new', handleNew)
		return () => window.removeEventListener('guestbook:new', handleNew)
	}, [])

	if (messages.length === 0) return null

	const msg = messages[index]

	return (
		<div className="max-w-lg mx-auto mt-8 rounded-2xl p-6" style={{ backgroundColor: '#F0F8FF' }}>
			<div
				className="glass p-5 text-center transition-opacity duration-400"
				style={{ opacity: isVisible ? 1 : 0 }}
			>
				<p className="font-serif text-primary-800 text-base leading-relaxed italic mb-3">
					"{msg.message}"
				</p>
				<p className="font-display text-xs tracking-wider text-gold-500 uppercase">
					{msg.name}
				</p>
			</div>
		</div>
	)
}
