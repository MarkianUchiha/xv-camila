// Muro de mensajes privado: muestra todos los mensajes de Supabase
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Message {
	id: string
	name: string
	message: string
	created_at: string
}

// Formatea fecha a español: "5 de mayo, 2026"
function formatDate(dateStr: string): string {
	return new Intl.DateTimeFormat('es-MX', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(dateStr))
}

const SECRET_KEY = 'anavaleria2026'

export default function MessageWall() {
	const [messages, setMessages] = useState<Message[]>([])
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	// Verificar key en la URL al montar
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const key = params.get('key')

		if (key === SECRET_KEY) {
			setIsAuthorized(true)
			fetchMessages()
		} else {
			setIsLoading(false)
		}
	}, [])

	async function fetchMessages() {
		const { data, error } = await supabase
			.from('messages')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(50)

		if (!error && data) {
			setMessages(data)
		}
		setIsLoading(false)
	}

	// Si no tiene la key correcta
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
					Cargando mensajes...
				</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen py-16 px-6" style={{ backgroundColor: '#F0F8FF' }}>
			<div className="max-w-2xl mx-auto">
				<p className="font-display text-xs tracking-[0.35em] text-gold-500 uppercase text-center mb-2">
					Tus invitados te escribieron
				</p>
				<h1 className="font-serif text-3xl sm:text-4xl text-primary-800 italic text-center mb-10">
					Mensajes para ti
				</h1>

				{messages.length === 0 ? (
					<p className="text-center text-primary-500/60 font-sans text-sm italic">
						Aún no hay mensajes
					</p>
				) : (
					<div className="grid gap-4">
						{messages.map(msg => (
							<div key={msg.id} className="glass p-5 text-center">
								<p className="font-serif text-primary-800 text-base leading-relaxed italic mb-3">
									"{msg.message}"
								</p>
								<p className="font-display text-xs tracking-wider text-gold-500 uppercase">
									{msg.name}
								</p>
								<p className="font-sans text-[10px] text-primary-400/50 mt-1">
									{formatDate(msg.created_at)}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
