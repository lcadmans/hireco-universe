import * as THREE from 'three'
import { Object3D } from 'three'
import { shallow } from 'zustand/shallow'
import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { shaderMaterial, Plane, Html, Line, Text, useTexture } from '@react-three/drei'
import { animated, a, update, useSpring, config } from '@react-spring/three'

import { SmallTilePlane } from './'
import { appState } from '../../store'

export const TilePlane = props => {
	const { imageSrc, id, linePoints, section, activeScales, currentRingName, plane, otherImagesArray } = props
	// console.log(imageTexture)

	const activeTile = appState(state => state.activeTile)
	const setActiveTile = appState(state => state.setActiveTile)
	const setActiveTileRef = appState(state => state.setActiveTileRef)
	const setFocusElementRef = appState(state => state.setFocusElementRef)
	const ringNameFromSection = appState(state => state.ringNameFromSection)
	const setActiveVideo = appState(state => state.setActiveVideo)
	const activeVideo = appState(state => state.activeVideo, shallow)
	const currentView = appState(state => state.currentView, shallow)
	const activeRing = appState(state => state.activeRing, shallow)
	const qrPanel = appState(state => state.qrPanel, shallow)
	const textures = appState(state => state.textures, shallow)
	const fetchData = appState(state => state.fetchData, shallow)

	// console.log(id)
	// console.log(id)
	// fetchData.forEach(a => {
	//   // console.log(id)
	//   console.log(a)
	// })
	let index = fetchData.findIndex(p => p.id == id)
	const imageTexture = textures[index]

	// const [isVideo, setIsVideo] = useState(false)

	const meshRef = useRef()
	const groupRef = useRef()

	let videoUrl, isVideo

	const contentSection = ringNameFromSection[section]

	useEffect(() => {
		if (activeTile == id) {
			setFocusElementRef(groupRef)
		} else {
		}
	}, [activeTile])

	if (imageSrc.includes('dummy.mp4') == true) {
		videoUrl = imageSrc
	}

	if (imageSrc.includes('.mp4') && imageSrc.includes('dummy.mp4') == false) {
		videoUrl = imageSrc
	}

	// // if (adjustedPath.includes('.gif')) adjustedPath = './images/hireco_dummy.jpeg'

	// // // console.log(adjustedPath)
	// let image
	// // let [image] = useTexture(THREE.TextureLoader, [adjustedPath])
	// // try {
	// // ;[image] = useTexture([adjustedPath])
	// image = useLoader(THREE.TextureLoader, adjustedPath)
	// // image = useTexture(adjustedPath)
	// // } catch (e) {
	// // image = useLoader(THREE.TextureLoader, './images/hireco_dummy.jpeg')
	// // }

	let aspectRatio = 1
	// let aspectRatio = 1

	if (imageTexture && imageTexture.source) {
		const width = imageTexture.source.data.width
		const height = imageTexture.source.data.height
		aspectRatio = width / height
	} else {
		aspectRatio = 1
	}

	const sizes = { ring_2: [0.75, 0.75], ring_3: [1 * 2, 1 * 2], ring_4: [1 * 5, 1 * 5], ring_5: [1 * 7.5, 1 * 7.5], ring_6: [1 * 15, 1 * 15], none: [0, 0] }
	// const sizes = { ring_2: [0.75, 0.75], ring_3: [1 * 2, 1 * 2], ring_4: [1 * 5, 1 * 5], ring_5: [1 * 7.5, 1 * 7.5], ring_6: [1 * 15, 1 * 15], none: [0, 0] }

	// console.log('image')
	// console.log(image)

	const { activeScale } = useSpring({
		// groupPosition: activeTile === id ? getActiveGroupPosition() : [0, 0, 0],
		activeScale: activeTile === id ? activeScales[currentRingName] : 1,
		config: config.gentle
	})

	return (
		// <animated.mesh scale={groupScale}>
		<animated.mesh scale={activeScale}>
			<group ref={groupRef}>
				{/* {otherImagesArray && otherImagesArray.length > 0 ? (
					<>
						<group visible={activeTile == id}>
							<OtherImages otherImagesArray={otherImagesArray} id={id} section={section} />
						</group>
					</>
				) : (
					<></>
				)} */}

				{activeTile == id ? (
					<>
						<group position-x={0.2}>
							<Html
								// style={{ opacity: activeTile == id ? 1 : 0, transform: `scale(${activeTile == id ? 1 : 0.25})`, pointerEvents: 'none' }}
								style={{ pointerEvents: 'none' }}
							>
								{qrPanel ? <></> : <GenerateContent currentRingName={currentRingName} otherImagesArray={otherImagesArray} />}
							</Html>
						</group>
					</>
				) : (
					<></>
				)}

				<mesh
					ref={meshRef}
					onClick={e => {
						// console.log('tileClick')
						if (activeTile == id) return null
						if (currentView != 'page') return null
						if (activeRing != currentRingName) return null
						if (videoUrl) setActiveVideo(videoUrl)
						setActiveTile(id)
						setActiveTileRef(meshRef)
						e.stopPropagation()
					}}
					// onPointerOver={() => {
					// 	document.body.style.cursor = 'pointer'
					// }}
					// onPointerOut={() => {
					// 	document.body.style.cursor = 'default'
					// }}
					// depthTest={false}
					// renderOrder={10}
					visible={!activeVideo}
					geometry={plane}
				>
					{/* <planeGeometry attach='geometry' args={[sizes[contentSection][0] * aspectRatio, sizes[contentSection][1]]} /> */}
					<a.meshBasicMaterial
						attach='material'
						map={imageTexture}
						// transparent
						// opacity={activeOpacity}
						// depthTest={depthTestBoolean}
						// depthWrite={false} polygonOffset={true} polygonOffsetFactor={activeRenderOrder}
					/>
				</mesh>

				{/* <Plane args={[0.1, 0.1]} position-x={shifterPlanePosition[activeRing]}>
						<meshStandardMaterial transparent opacity={0} alpha={true} depthTest={false} />
					</Plane> */}
			</group>
		</animated.mesh>
		// </animated.mesh>
	)
}

// function OtherImages(props) {
// 	const { otherImagesArray, id, section } = props
// 	const activeTile = appState(state => state.activeTile)
// 	return (
// 		<>
// 			{otherImagesArray.map((image, index) => {
// 				const imageTexture = useLoader(THREE.TextureLoader, `./images/${image}`)
// 				console.log(image)
// 				if (section != 'Source') return <></>
// 				return <SmallTilePlane section={section} imageTexture={imageTexture} />
// 			})}
// 		</>
// 	)
// }

function getDelayString(index) {
	switch (index) {
		case 0:
			return 'delay-0'
		case 1:
			return 'delay-100'
		case 2:
			return 'delay-200'
		case 3:
			return 'delay-300'
		case 4:
			return 'delay-500'
		default:
			return 'delay-0'
	}
}
function OtherImages(props) {
	const { otherImagesArray } = props
	const activeTile = appState(state => state.activeTile)
	return (
		<>
			<div className='pointer-events-auto flex overflow-x-scroll pt-6'>
				{otherImagesArray.map((image, index) => {
					return <img src={`./images/${image}`} className={`h-24  pr-1`} />
				})}
			</div>
		</>
	)
}

function GenerateContent(props) {
	const { otherImagesArray } = props
	const activeRing = appState(state => state.activeRing, shallow)
	const activeTile = appState(state => state.activeTile, shallow)
	const fetchData = appState(state => state.fetchData, shallow)
	const setActiveTile = appState(state => state.setActiveTile)
	const setActiveVideo = appState(state => state.setActiveVideo)
	const setQrPanel = appState(state => state.setQrPanel)

	// console.log(otherImagesArray)

	// const ringName = currentRingName
	const ringNames = appState(state => state.ringNames, shallow)
	const currentRingName = ringNames[activeRing]

	// console.log(currentRingName)
	// console.log('currentRingName')

	const currentSectionCopy = fetchData.filter(item => item.id == activeTile)[0]
	const otherSectionData = fetchData.filter(item => item.section == currentRingName)
	const activeSectionDataIndex = otherSectionData.findIndex(item => item.id == activeTile)

	function nextTile() {
		console.log('next tile')
		if (activeSectionDataIndex == otherSectionData.length - 1) {
			if (otherSectionData[0].video) {
				setActiveVideo(otherSectionData[0].image)
			}
			return setActiveTile(otherSectionData[0].id)
		}

		let nextSectionData = otherSectionData[activeSectionDataIndex + 1]
		setActiveTile(otherSectionData[activeSectionDataIndex + 1].id)
		if (nextSectionData.video) {
			setActiveVideo(nextSectionData.image)
		} else {
			setActiveVideo(null)
		}
	}

	let title, subTitle, description, cta, video, descriptionArr

	// console.log(currentSectionCopy)
	// if (activeTileContent) {
	if (!currentSectionCopy) return <></>
	title = currentSectionCopy.title || ''
	subTitle = currentSectionCopy.subTitle || ''
	description = currentSectionCopy.description || ''
	descriptionArr = currentSectionCopy.descriptionArr || ''
	video = currentSectionCopy.video || false
	cta = currentSectionCopy.cta || false

	// console.log(descriptionArr)

	function getHyperlink() {
		let ctaArr = []
		if (cta) {
			let hyperLinks = cta.content
			hyperLinks.forEach((item, index) => {
				if (item.nodeType != 'paragraph') return null
				let hyperLink = item.content.filter(item => item.nodeType == 'hyperlink')[0]

				if (!hyperLink) return null

				let ctaText = hyperLink.content[0].value
				let ctaLink = hyperLink.data.uri || null
				ctaArr.push([ctaText, ctaLink])
			})

			return ctaArr
		} else {
			return null
		}
	}

	let ctaArr = getHyperlink()

	return (
		<>
			<div className={`pointer-events-none relative -top-52 z-30 w-[40vw] transform-gpu bg-black bg-opacity-75 p-4 text-white `}>
				<h1 className={'text-[3em] font-[600] text-[#d19a41]'}>{title}</h1>
				<h2 className={'text-[2em]'}>{subTitle}</h2>
				{/* <p className={'font-body text-[1em] leading-tight'}>{description}</p> */}
				{descriptionArr.map(a => {
					let nodeType = a.nodeType

					// SWITCH STATEMENT FOR NODE TYPE
					switch (a.nodeType) {
						case 'paragraph':
							return a.content.map(b => {
								let bold = false

								if (b.marks.length > 0 && b.marks[0].type == 'bold') bold = true

								return <p className={`pt-2 text-[1em] leading-tight  ${bold ? 'pt-4 font-bold' : 'font-body'}`}>{b.value}</p>
							})
						case 'unordered-list':
							return (
								<>
									<ul className={'list-disc  pl-8'}>
										{a.content.map(b => {
											// console.log(b)
											return <li className={'pt-2 font-body text-[1em] leading-tight'}>{b.content[0].content[0].value}</li>
										})}
									</ul>
								</>
							)
					}
					// return <p className={'pt-1 font-body text-[1em] leading-tight'}>{str}</p>
				})}
				{otherImagesArray ? <OtherImages otherImagesArray={otherImagesArray} /> : <></>}
				{ctaArr ? (
					<>
						{ctaArr.map(item => {
							let ctaText = item[0]
							let ctaLink = item[1]
							return (
								<p className={'pointer-events-auto pt-6 text-[1.25em] font-bold text-[#d19a41] '} onClick={() => setQrPanel(ctaLink)}>
									{ctaText}
								</p>
							)
						})}
						{/* <p className={'pointer-events-auto pt-8 text-[1.25em] font-bold text-[#d19a41] '} onClick={() => setQrPanel(ctaLink)}>
							{ctaText}
						</p> */}
					</>
				) : (
					<></>
				)}
				{/* {ctaText && ctaLink ? (
					<>
						<p className={'pointer-events-auto pt-8 text-[1.25em] font-bold text-[#d19a41] '} onClick={() => setQrPanel(ctaLink)}>
							{ctaText}
						</p>
					</>
				) : (
					<></>
				)} */}
				<div className='findclass pointer-events-auto absolute -bottom-10 right-0 z-[60] pt-12 text-white' onClick={() => nextTile()}>
					Next
				</div>
			</div>
		</>
	)
}
