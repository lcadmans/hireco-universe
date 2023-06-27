import { AdaptiveDpr, AdaptiveEvents, Bounds, Effects, Environment, OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three-stdlib'
import { shallow } from 'zustand/shallow'
import { Scene } from './Scene'
import { BackButton, CustomLoader, QRPanel, VideoOverlay } from './components'
import { content } from './data'
import { appState } from './store'

import { Perf } from 'r3f-perf'
import { processData } from './functions'

extend({ UnrealBloomPass })

function Header() {
	const currentView = appState(state => state.currentView, shallow)
	const setActiveVideo = appState(state => state.setActiveVideo)
	const setIdleMessage = appState(state => state.setIdleMessage)
	const setBrandVideo = appState(state => state.setBrandVideo)

	return (
		<>
			<div className='pointer-events-none absolute top-0 left-0 z-[70]  flex   w-screen p-4 '>
				<div
					className='logo pointer-events-auto flex  items-center'
					onClick={() => {
						if (currentView != 'main') return null
						setActiveVideo('221211 - Hireco 2022 - v7.mp4')
						setIdleMessage(true)
						setBrandVideo(true)
					}}
				>
					<HirecoWhite />
					{/* <p className={'pl-3 text-xs tracking-wider text-white'}>The Hireco Universe</p> */}
				</div>
			</div>
		</>
	)
}

function HirecoWhite() {
	return (
		<>
			<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 70.514 70.598'>
				<g id='Group_5' data-name='Group 5' transform='translate(0 0)'>
					<g id='Group_4' data-name='Group 4' clip-path='url(#clip-path)'>
						<path
							id='Path_5'
							data-name='Path 5'
							d='M45.973,50.244a3.143,3.143,0,0,0,3.413-3.262V23.831a3.143,3.143,0,0,0-3.413-3.262,3.142,3.142,0,0,0-3.411,3.262v8.114l-10.4.011a2.637,2.637,0,0,0-2.866,2.735,2.551,2.551,0,0,0,2.752,2.741l10.516,0v9.547a3.142,3.142,0,0,0,3.411,3.262m-24.6-26.378V47.017a3.143,3.143,0,0,0,3.413,3.263A3.143,3.143,0,0,0,28.2,47.017V23.866A3.143,3.143,0,0,0,24.788,20.6a3.143,3.143,0,0,0-3.413,3.263'
							fill='#fff'
							fill-rule='evenodd'
						/>
						<path id='Path_6' data-name='Path 6' d='M63.567,37.494a28.356,28.356,0,1,1-.05-4.951l3.676,3.516,3.315-3.251a35.3,35.3,0,1,0,.006,4.9l-3.321,3.257Z' fill='#ea8912' fill-rule='evenodd' />
					</g>
				</g>
			</svg>
		</>
	)
}

function IdleMessage() {
	const setCurrentView = appState(state => state.setCurrentView)
	const setActiveVideo = appState(state => state.setActiveVideo)
	const setIdleMessage = appState(state => state.setIdleMessage)
	return (
		<div className='pointer-events-none absolute top-0 left-0 z-[70] flex h-screen w-screen items-end justify-end p-4 text-white'>
			<p
				className={'pointer-events-auto'}
				onClick={() => {
					setCurrentView('idle')
					setActiveVideo(null)
					setIdleMessage(false)
				}}
			>
				{`go idle >`}
			</p>
		</div>
	)
}

function App() {
	const activeRing = appState(state => state.activeRing)
	const fetchData = appState(state => state.fetchData, shallow)
	const activeTile = appState(state => state.activeTile)
	const setFetchData = appState(state => state.setFetchData)
	// const maxDistance = appState(state => state.maxDistance, shallow)
	const boundsMargin = appState(state => state.boundsMargin, shallow)
	const activeVideo = appState(state => state.activeVideo, shallow)
	const setLoaded = appState(state => state.setLoaded)
	const qrPanel = appState(state => state.qrPanel, shallow)
	const boundsDamping = appState(state => state.boundsDamping, shallow)
	const setTextures = appState(state => state.setTextures)
	const idleMessage = appState(state => state.idleMessage, shallow)
	const currentView = appState(state => state.currentView, shallow)
	// const fetchData = appState(state => state.fetchData)
	const setActiveVideo = appState(state => state.setActiveVideo)

	const setActiveRing = appState(state => state.setActiveRing)
	const setActiveTile = appState(state => state.setActiveTile)
	const setQrPanel = appState(state => state.setQrPanel)
	const setCurrentView = appState(state => state.setCurrentView)
	const setFocusElementRef = appState(state => state.setFocusElementRef)
	const setBrandVideo = appState(state => state.setBrandVideo)
	const flyThrough = appState(state => state.flyThrough)
	// const setMaxDistance = appState(state => state.setMaxDistance)

	const masterGroup = useRef()
	const cameraRef = useRef()
	const orbitControlsRef = useRef()

	const { progress } = useProgress()

	useEffect(() => {
		if (progress == 100) {
			setTimeout(() => {
				setLoaded(true)
			}, 3000)
		}
	}, [progress])

	// const { isLoading, error, data } = useQuery({
	// 	queryKey: ['repoData'],
	// 	queryFn: () => fetch('https://cdn.contentful.com/spaces/ndcfmypd0yep/environments/master/entries?access_token=YZXIc9fW0cmy7ymmmZGQ6k8W2vO76zG3XIvsoccZLE8').then(res => res.json())
	// })

	const data = content

	useEffect(() => {
		if (!data) return
		// console.log(data)
		setFetchData(processData(data))
	}, [data])

	useEffect(() => {
		let data = fetchData
		if (!data || data.length < 1) return
	}, [fetchData])

	const sectionTextures = useMemo(() => getTextures({ fetchData }), [fetchData])

	useEffect(() => {
		if (!sectionTextures) return
		setTextures(sectionTextures)
	}, [sectionTextures])

	useEffect(() => {
		if (!orbitControlsRef || !orbitControlsRef.current) return
		if (activeTile) orbitControlsRef.current.enableZoom = false
		else orbitControlsRef.current.enableZoom = true
	}, [activeTile])

	function getCameraInformation(e) {
		let cameraInformation = {}
		cameraInformation.position = cameraRef.current.position.clone()
		cameraInformation.target = orbitControlsRef.current.target.clone()
		console.log(cameraInformation)
	}

	const [dpr, setDpr] = useState(1.5)

	const [state, setState] = useState('Active')
	const [count, setCount] = useState(0)
	const [remaining, setRemaining] = useState(0)

	useEffect(() => {
		if (state == 'Idle' && !flyThrough) {
			setCurrentView('idle')
			setActiveRing('none')
			setActiveTile(null)
			setFocusElementRef(null)
			setActiveVideo(null)
			setQrPanel(null)
			setBrandVideo(false)
			// setMaxDistance(365)
		}
	}, [state])

	const onIdle = () => {
		setState('Idle')
	}

	const onActive = () => {
		setState('Active')
	}

	const onAction = () => {
		setCount(count + 1)
	}

	const [timeoutAmount, setTimeoutAmount] = useState(10_000)

	useEffect(() => {
		if (activeVideo) return setTimeoutAmount(50_000)
		if (activeTile) return setTimeoutAmount(40_000)
		if (currentView == 'page') return setTimeoutAmount(30_000)
		if (currentView == 'main') return setTimeoutAmount(15_000)
	}, [currentView, activeVideo, activeTile])

	const { getRemainingTime } = useIdleTimer({
		onIdle,
		onActive,
		onAction,
		timeout: timeoutAmount,
		throttle: 500
	})

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining(Math.ceil(getRemainingTime() / 1000))
		}, 500)

		return () => {
			clearInterval(interval)
		}
	})

	// console.log(remaining)

	return (
		<>
			{/* <FullScreen handle={handle}>
				<div className='absolute top-0 right-0 w-full'>
					<div
						className='fullscreen-icon relative z-[60] cursor-pointer p-4'
						onClick={() => {
							setFullScreen(!fullScreen)
						}}
					>
						{fullScreen ? (
							<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
								<path id='Icon_open-fullscreen-exit' data-name='Icon open-fullscreen-exit' d='M4.5,0,0,4.5l6.75,6.75L0,18H18V0L11.25,6.75ZM18,18V36l6.75-6.75L31.5,36,36,31.5l-6.75-6.75L36,18Z' fill='#fff' />
							</svg>
						) : (
							<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
								<path id='Icon_open-fullscreen-enter' data-name='Icon open-fullscreen-enter' d='M0,0V18l6.75-6.75L13.5,18,18,13.5,11.25,6.75,18,0ZM22.5,18,18,22.5l6.75,6.75L18,36H36V18l-6.75,6.75Z' fill='#fff' />
							</svg>
						)}
					</div>
				</div> */}
			<div className='h-screen w-screen overflow-hidden'>
				<Header />
				{activeRing != 'none' && !activeVideo ? <ContentOverlay /> : <></>}
				{idleMessage ? <IdleMessage /> : <> </>}

				{activeVideo ? <VideoOverlay /> : <></>}
				<WelcomeToUniverse />

				{/* <ConsoleLogger /> */}
				<CustomLoader />
				{qrPanel ? <QRPanel /> : <></>}
				{/* <Suspense fallback={<CustomLoader />}> */}
				{fetchData && (
					<Canvas
						// onCreated={state => {
						// state.setEvents({ filter: intersections => intersections.filter(i => i.object.visible) })
						// }}
						dpr={dpr}
						className='relative'
						style={{ height: '100vh' }}
						// shadows:
						// gl={{ alpha: false }}
						// camera={{ position: [0, 0.5, 0], fov: 50 }}
						// dpr={[1, 2]}
						// onCreated={() => {
						// 	setActiveRing('none')
						// }}
					>
						<Suspense fallback={null}>
							{/* <PerformanceMonitor onIncline={() => setDpr(1.75)} onDecline={() => setDpr(1.2)}></PerformanceMonitor> */}
							<AdaptiveDpr pixelated />
							<AdaptiveEvents />
							{/* <Perf /> */}

							<group ref={masterGroup}>
								{/* <ambientLight intensity={2} /> */}
								<PerspectiveCamera
									ref={cameraRef}
									// manual={false}
									// aspect={aspects[0] / aspects[1]}
									aspect={window.innerWidth / window.innerHeight}
									fov={60}
									// position={Object.values(cameraPositions[0].position)}
									// position={Object.values(cameraPositionsStore.focus[activeRing].position)}
									// position={[0, 0, 0]}
									position={[-1, -1, -1]}
									// target={[5, 5, 5]}
									near={0.1}
									// far={600/}
									makeDefault
								/>
								<OrbitControls
									// camera={cameraRef.current}
									makeDefault
									minPolarAngle={0.5}
									maxPolarAngle={Math.PI / 2}
									// maxAzimuthAngle={Math.PI / 5}
									minDistance={5}
									maxDistance={365}
									ref={orbitControlsRef}
									enablePan={false}
									autoRotate={flyThrough}
									// onChange={e => getCameraInformation(e)}
									// onStart={() => console.log('start')}
									// onEnd={e => getCameraInformation(e)}
								/>

								<Environment files='./environment/nedula v6.hdr' background={true} />

								{/* <color attach='background' args={['#191920']} opacity={1} /> */}
								{/* <fog attach='fog' args={['#000000', 200, 1500]} /> */}
								<hemisphereLight color='white' groundColor='#ff0f00' position={[-7, 25, 13]} intensity={1} />

								<Bounds damping={boundsDamping} margin={boundsMargin}>
									<Scene cameraRef={cameraRef} orbitControlsRef={orbitControlsRef}></Scene>
								</Bounds>
								{/* <EffectComposer>
									<Bloom
										intensity={2}
										luminanceThreshold={1}
										luminanceSmoothing={0.025}
										// width={Resizer.AUTO_SIZE} // render width
										// height={Resizer.AUTO_SIZE}
										// kernelSize={KernelSize.LARGE}
										// blurPass={undefined}
										// mipmapBlur={false}
									/>
								</EffectComposer> */}
								<Effects disableGamma>
									{/* threshhold has to be 1, so nothing at all gets bloom by default */}
									<unrealBloomPass threshold={1.4} strength={0.4} radius={0.25} />
									{/* <vignetteShader /> */}
									{/* <Vignette eskil={false} offset={0.5} darkness={1} blendFunction={'add'} /> */}
								</Effects>
								{/* <Stars
									radius={500}
									depth={500}
									count={5000}
									// factor={4}
									saturation={1}
									// fade
									speed={5}
								/> */}
							</group>
						</Suspense>
					</Canvas>
				)}
				{/* </FullScreen> */}
				{/* </Suspense> */}
			</div>
		</>
	)
}

export default App

function WelcomeToUniverse() {
	const setCurrentView = appState(state => state.setCurrentView)
	const currentView = appState(state => state.currentView, shallow)
	return (
		<div className={` absolute z-50 h-screen w-screen bg-black bg-opacity-60 text-white transition-opacity ${currentView != 'idle' ? 'pointer-events-none opacity-0' : ''}`} onClick={() => setCurrentView('main')}>
			<div className='flex h-full flex-col justify-end pl-[10vw] pb-[10vh]'>
				<div className='flex flex-col justify-start text-left '>
					<p class={'text-[8em] font-bold uppercase text-orange-500'}>WELCOME TO</p>
					<p class={'text-[4.75em] font-bold uppercase'}>THE HIRECO UNIVERSE</p>
					<p class={'pt-3  text-[2.33em] font-bold uppercase '}>YOUR DIGITAL TRANSPORT SOLUTION AWAITS</p>
					<div className='flex items-center justify-start pt-12 align-middle '>
						<svg xmlns='http://www.w3.org/2000/svg' width='30.714' height='31.438' viewBox='0 0 30.714 31.438'>
							<path
								id='Icon_material-touch-app'
								data-name='Icon material-touch-app'
								d='M12.326,14.584V10.007a3.059,3.059,0,1,1,6.119,0v4.577a5.507,5.507,0,1,0-6.119,0ZM24.368,20.25l-5.556-2.766a1.723,1.723,0,0,0-.661-.135h-.93V10.007a1.836,1.836,0,1,0-3.671,0V23.15l-4.2-.881a2.139,2.139,0,0,0-.294-.037,1.369,1.369,0,0,0-.967.4l-.967.979L13.17,29.66a1.842,1.842,0,0,0,1.3.538h8.309a1.782,1.782,0,0,0,1.762-1.566l.918-6.449a1.759,1.759,0,0,0-1.089-1.934Z'
								transform='translate(14.435 -8.071) rotate(41)'
								fill='#fff'
							/>
						</svg>

						<p class={'pl-3 text-[2.5em] font-thin uppercase'}>Tap to explore</p>
					</div>
				</div>
			</div>
		</div>
	)
}

function ContentOverlay(props) {
	const setActiveRing = appState(state => state.setActiveRing)
	const setActiveTile = appState(state => state.setActiveTile)

	const activeRing = appState(state => state.activeRing, shallow)
	const activeTile = appState(state => state.activeTile, shallow)
	const currentView = appState(state => state.currentView, shallow)
	const setActiveVideo = appState(state => state.setActiveVideo, shallow)
	const ringNames = appState(state => state.ringNames)
	const setQrPanel = appState(state => state.setQrPanel)

	const fetchData = appState(state => state.fetchData, shallow)
	const currentSectionCopy = fetchData.filter(item => item.id == activeTile)[0]

	const { whatsapp, linkedIn, testimonials } = currentSectionCopy || false

	// console.log(whatsapp)
	// console.log(linkedIn)

	let testimonial, test
	// console.log('testimonials')
	// console.log(testimonials)
	if (testimonials && testimonials.content) {
		let testimonialEntry = testimonials.content.filter(item => item.content[0].value)[0] || null
		if (testimonialEntry) testimonial = testimonialEntry.content[0].value
	}

	// console.log(whatsapp)

	return (
		<div className={`wrap grad-left pointer-events-none absolute  z-40 flex h-screen w-1/2 items-center pl-10 pr-[30%] `}>
			<div className='content flex h-full flex-col justify-around text-white'>
				<div className='relative z-[90]'>
					<BackButton />
				</div>
				{currentView == 'page' ? (
					<>
						<div className='testimonial  text-xl'>
							{activeRing == 'ring_2' && activeTile ? (
								<>
									{testimonial ? <p class={'text-right text-orange-500'}>"{testimonial}"</p> : <> </>}
									<div
										className='pointer-events-auto pt-12'
										// onClick={() => {
										// 	console.log('first')
										// 	setQrPanel(true)
										// }}
									>
										{whatsapp ? (
											<div
												className='linkedIn flex  items-center justify-end'
												onClick={() => {
													setQrPanel('https://api.whatsapp.com/send/?phone=+44' + whatsapp.substring(1))
												}}
											>
												<p class={' pr-4 text-right  font-bold text-white'}>Whatsapp</p>
												<div className='flex h-[40px] w-[40px] rounded-full bg-white p-2'>
													<svg xmlns='http://www.w3.org/2000/svg' version='1.1' id='Icons' viewBox='0 0 32 32' width={'30px'}>
														<path fill='#25D366' d='M17,0C8.7,0,2,6.7,2,15c0,3.4,1.1,6.6,3.2,9.2l-2.1,6.4c-0.1,0.4,0,0.8,0.3,1.1C3.5,31.9,3.8,32,4,32  c0.1,0,0.3,0,0.4-0.1l6.9-3.1C13.1,29.6,15,30,17,30c8.3,0,15-6.7,15-15S25.3,0,17,0z' />
														<path
															fill='#FFFFFF'
															d='M25.7,20.5c-0.4,1.2-1.9,2.2-3.2,2.4C22.2,23,21.9,23,21.5,23c-0.8,0-2-0.2-4.1-1.1c-2.4-1-4.8-3.1-6.7-5.8  L10.7,16C10.1,15.1,9,13.4,9,11.6c0-2.2,1.1-3.3,1.5-3.8c0.5-0.5,1.2-0.8,2-0.8c0.2,0,0.3,0,0.5,0c0.7,0,1.2,0.2,1.7,1.2l0.4,0.8  c0.3,0.8,0.7,1.7,0.8,1.8c0.3,0.6,0.3,1.1,0,1.6c-0.1,0.3-0.3,0.5-0.5,0.7c-0.1,0.2-0.2,0.3-0.3,0.3c-0.1,0.1-0.1,0.1-0.2,0.2  c0.3,0.5,0.9,1.4,1.7,2.1c1.2,1.1,2.1,1.4,2.6,1.6l0,0c0.2-0.2,0.4-0.6,0.7-0.9l0.1-0.2c0.5-0.7,1.3-0.9,2.1-0.6  c0.4,0.2,2.6,1.2,2.6,1.2l0.2,0.1c0.3,0.2,0.7,0.3,0.9,0.7C26.2,18.5,25.9,19.8,25.7,20.5z'
														/>
													</svg>
												</div>
											</div>
										) : (
											<></>
										)}
										{whatsapp ? (
											<div
												className='linkedIn flex  items-center justify-end pt-2'
												onClick={() => {
													setQrPanel(linkedIn)
												}}
											>
												<p class={' pr-4 text-right  font-bold text-white'}>LinkedIn</p>
												<div className='flex h-[40px] w-[40px] rounded-full bg-white p-2'>
													<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' data-supported-dps='24x24' fill='#2B55B7' class='mercado-match' focusable='false' width={'30px'}>
														<path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z'></path>
													</svg>
												</div>
											</div>
										) : (
											<></>
										)}
									</div>
								</>
							) : (
								<> </>
							)}
						</div>
						<div className='ask-me-more pointer-events-auto pt-12 text-xl'>
							<p class={'font-bold uppercase text-orange-500'}>Want to know more about</p>
							{['ring_2', 'ring_3', 'ring_4', 'ring_5', 'ring_6'].map((ring, index) => {
								const ringName = ringNames[ring]
								return (
									<p
										class={'cursor-pointer font-bold uppercase '}
										onClick={() => {
											// setCurrentView('page')
											setActiveRing(ring)
											setActiveTile(null)
											setActiveVideo(null)
											// setFocusElementRef(null)
										}}
									>
										{'> ' + ringName}
									</p>
								)
							})}
						</div>
						<div className=''></div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

function getTextures(props) {
	const { fetchData } = props
	const data = fetchData
	if (!data) return null

	let imageTextures = []
	let finalImageUrls = []
	data.forEach(a => {
		// console.log(a)
		let image, imageString, imageSrc
		imageSrc = a.image
		if (!imageSrc) imageString = `./images/hireco_dummy.jpeg`
		else imageString = `./images/${imageSrc}`

		let adjustedPath = imageString

		if (adjustedPath.includes('dummy.mp4') == true) {
			// videoUrl = image
			adjustedPath = './images/hireco_dummy.jpeg'
		}

		if (adjustedPath.includes('.png')) {
			adjustedPath.replace('.png', '.jpg')
		}

		if (adjustedPath.includes('.mp4') && adjustedPath.includes('dummy.mp4') == false) {
			adjustedPath = './images/video screens/' + imageSrc.replace('.mp4', '.jpg')
		}
		finalImageUrls.push(adjustedPath)
	})

	const loadedTextures = ([...finalImageUrls] = useLoader(THREE.TextureLoader, [...finalImageUrls]))

	return loadedTextures
}
