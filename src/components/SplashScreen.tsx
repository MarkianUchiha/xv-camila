// Splash con sobre + sello de cera: 2 toques (abrir sobre → entrar al sitio)
import { useState } from 'react'

type SplashState = 'closed' | 'opening' | 'entering'

export default function SplashScreen() {
	const [isVisible, setIsVisible] = useState(true)
	const [state, setState] = useState<SplashState>('closed')

	const handleTap = () => {
		if (state === 'closed') {
			// Primer tap: abre el sobre
			setState('opening')
		} else if (state === 'opening') {
			// Segundo tap: arranca música y oculta el splash con fade
			setState('entering')
			window.dispatchEvent(new CustomEvent('music:play'))
			setTimeout(() => setIsVisible(false), 600)
		}
	}

	if (!isVisible) return null

	return (
		<div
			onClick={handleTap}
			className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-500"
			style={{
				backgroundImage: 'url(/splash/Splashbg.webp)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: state === 'entering' ? 0 : 1,
			}}
		>
			{/* Contenedor del sobre */}
			<div className="envelope" data-state={state}>
				{/* Cuerpo del sobre - fondo cremoso con líneas decorativas */}
				<div className="env-body" />

				{/* Tarjeta interior - sibling para poder emerger sin clipping */}
				<div className="env-card">
					<p className="font-display text-[10px] tracking-[0.4em] text-gold-600 uppercase mb-3">
						Estás invitado
					</p>
					<h2 className="font-script text-4xl sm:text-5xl text-primary-800 leading-none">
						Camila Isabella
					</h2>
					<div className="w-10 h-px bg-gold-400 mx-auto my-3" />
					<p className="font-sans text-[11px] text-primary-700 tracking-wider">
						Mis XV Años
					</p>
				</div>

				{/* Solapa del sobre - rota al abrir */}
				<div className="env-flap" />

				{/* Sello de cera dorado con monograma */}
				<div className="env-seal">
					<span className="font-script text-2xl text-gold-100 leading-none -translate-x-0.5">CI</span>
				</div>
			</div>

			{/* Pista de interacción: posición distinta según estado */}
			{state === 'closed' ? (
				<p className="absolute bottom-12 font-sans text-xs text-primary-900/70 animate-pulse tracking-wider">
					Toca para abrir
				</p>
			) : (
				<p className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-10 sm:mt-14 font-sans text-xs text-primary-800 animate-pulse tracking-wider">
					Toca para entrar
				</p>
			)}

			<style>{`
				/* === Sobre: caja contenedora con perspective 3D === */
				.envelope {
					position: relative;
					width: 320px;
					height: 200px;
					perspective: 1000px;
				}
				@media (min-width: 640px) {
					.envelope {
						width: 400px;
						height: 250px;
					}
				}

				/* === Cuerpo del sobre: fondo crema con líneas diagonales del bolsillo === */
				.env-body {
					position: absolute;
					inset: 0;
					background-color: #efe0ce;
					border-radius: 4px;
					box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.05);
					/* Líneas diagonales que simulan el bolsillo trasero del sobre */
					background-image:
						linear-gradient(135deg, transparent 49%, rgba(0,0,0,0.04) 49%, rgba(0,0,0,0.04) 51%, transparent 51%),
						linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.04) 49%, rgba(0,0,0,0.04) 51%, transparent 51%);
					background-size: 50% 100%, 50% 100%;
					background-position: 0 0, 100% 0;
					background-repeat: no-repeat;
					z-index: 1;
				}

				/* === Tarjeta interior: empieza oculta dentro del sobre === */
				.env-card {
					position: absolute;
					inset: 16px;
					background: #ffffff;
					border-radius: 3px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 24px 16px;
					text-align: center;
					box-shadow: 0 2px 8px rgba(0,0,0,0.1);
					opacity: 0;
					transform: translateY(0);
					transition: opacity 0.4s ease-out 0.5s, transform 0.7s ease-out 0.5s;
					z-index: 2;
				}

				/* === Solapa superior: triángulo que cubre la mitad de arriba === */
				.env-flap {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 60%;
					background: #e0c0b8;
					clip-path: polygon(0 0, 100% 0, 50% 100%);
					transform-origin: top center;
					transform: rotateX(0deg);
					transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 0 2px 4px rgba(0,0,0,0.1);
					z-index: 3;
				}

				/* === Sello de cera dorado con borde dasheado === */
				.env-seal {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 56px;
					height: 56px;
					border-radius: 50%;
					background: radial-gradient(circle at 30% 30%, #d6bb7b, #b89968 60%, #8a6f48);
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow:
						0 4px 12px rgba(0,0,0,0.3),
						inset 0 -2px 4px rgba(0,0,0,0.2),
						inset 0 2px 3px rgba(255,255,255,0.3);
					z-index: 4;
					transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
				.env-seal::before {
					/* Borde decorativo dashed del sello */
					content: '';
					position: absolute;
					inset: 4px;
					border: 1px dashed rgba(255,255,255,0.3);
					border-radius: 50%;
				}

				/* === Estado: opening — sello revienta, solapa abre, tarjeta emerge === */
				.envelope[data-state="opening"] .env-seal {
					opacity: 0;
					transform: translate(-50%, -50%) scale(1.4) rotate(15deg);
				}
				.envelope[data-state="opening"] .env-flap {
					transform: rotateX(-180deg);
				}
				.envelope[data-state="opening"] .env-card {
					opacity: 1;
					transform: translateY(-60%);
					z-index: 5;
				}
			`}</style>
		</div>
	)
}
