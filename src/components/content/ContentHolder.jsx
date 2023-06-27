import React, { useEffect, useMemo, useRef, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { TilePlane, SmallTilePlane } from './'
import * as THREE from 'three'
import { Text, Plane } from '@react-three/drei'
import { appState } from '../../store'
import { animated, a, update, useSpring, config } from '@react-spring/three'
import { useFrame, useLoader } from '@react-three/fiber'

import { Arrow } from '../Models'

import { cameraPositionsStore } from '../../data'

export const ContentHolder = props => {
	const group = useRef()
	const subGroup = useRef()

	const activeRing = appState(state => state.activeRing, shallow)
	const getUniverseStores = appState(state => state.getUniverseStores)
	const currentView = appState(state => state.currentView)
	const fetchData = appState(state => state.fetchData, shallow)
	const updateBounds = appState(state => state.updateBounds, shallow)
	const setActiveTile = appState(state => state.setActiveTile)
	const setCurrentView = appState(state => state.setCurrentView)
	const setActiveRing = appState(state => state.setActiveTile)
	const ringNameFromSection = appState(state => state.ringNameFromSection)
	const textures = appState(state => state.textures, shallow)
	const sectionPositions = appState(state => state.sectionPositions)

	const allContent = fetchData

	// const { sectionPositions } = getUniverseStores()

	useEffect(() => {
		// console.log('fetchData')
		// console.log(fetchData)
	}, [fetchData])

	const sections = ['Experts', 'Source', 'Support', 'Technology', 'Welfare']
	const sizes = { ring_2: [0.75, 0.75], ring_3: [1 * 2, 1 * 2], ring_4: [1 * 5, 1 * 5], ring_5: [1 * 7.5, 1 * 7.5], ring_6: [1 * 15, 1 * 15], none: [0, 0] }

	// const contentSection = ringNameFromSection[section]

	return (
		<>
			<animated.mesh ref={group}>
				{/* <Plane position={[0, 10, 0]}>
					<meshStandardMaterial color='hotpink' />
				</Plane> */}
				{sections.map((a, index) => {
					let ringIndex = index + 2
					let ringName = 'ring_' + ringIndex

					// const currentRingName =
					const currentRingName = ringNameFromSection[a]

					let plane
					plane = new THREE.PlaneGeometry(sizes[activeRing][0], sizes[activeRing][1])

					const position = sectionPositions[ringName]
					const content = allContent.filter(b => b['section'] == a)

					// console.log(randomAmount)

					const randomPositionArray = useMemo(() => {
						const array = []
						for (let i = 0; i < content.length; i++) {
							array.push({ x: randomIntFromInterval(ringName, 'x'), y: randomIntFromInterval(ringName, 'y'), z: randomIntFromInterval(ringName, 'z') })
						}
						return array
					}, [])

					return (
						<>
							<group
								position={position}
								scale={1.5}
								onClick={() => {
									if ((activeRing === currentRingName) == false) return null
									setActiveRing('none')
									setCurrentView('main')
									setActiveTile(null)
									// let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.focus['none'].position.x, cameraPositionsStore.focus['none'].position.y, cameraPositionsStore.focus['none'].position.z]
									let [endPositionX, endPositionY, endPositionZ] = [-75, 105, 324]
									updateBounds({ position: { xPos: endPositionX, yPos: endPositionY, zPos: endPositionZ }, target: { xTar: 0, yTar: 0, zTar: 0 } })
									// setScrollControlsInitiated(false)
								}}
							>
								{/* <Arrow /> */}
							</group>
							<group position={position} key={'sectionGroup' + index} visible={activeRing === currentRingName}>
								<group ref={subGroup} position={[0, { ring_2: 4, ring_3: 12, ring_3: 11, ring_4: 14, ring_5: 24, ring_6: 30 }[currentRingName], 0]}>
									<SectionTileHolder content={content} randomPositionArray={randomPositionArray} section={a} plane={plane} textures={textures} />
								</group>
							</group>
						</>
					)
				})}
			</animated.mesh>
		</>
	)
}

function getTextures(props) {
	// console.log(props)
	const { content } = props

	let imageTextures = []
	content.forEach(a => {
		// console.log(a)
		let image, imageString, imageSrc
		imageSrc = a.image

		// console.log(imageSrc)

		// imageString = `./images/hireco_dummy.jpeg`
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

		// image = useLoader(THREE.TextureLoader, adjustedPath)
		// imageTextures.push(image)
	})

	return imageTextures
}

function SectionTileHolder(props) {
	const { content, position, visible, randomPositionArray, section, plane, textures } = props
	const activeRing = appState(state => state.activeRing)
	const ringNames = appState(state => state.ringNames)
	const currentView = appState(state => state.currentView)
	const activeTile = appState(state => state.activeTile)

	const ringNameFromSection = appState(state => state.ringNameFromSection)

	const sectionTextures = textures
	// const sectionTextures = useMemo(() => getTextures({ content }), [content])
	// const [sectionTextures, setSectionTextures] = useState(getTextures({ content }), [content])

	return content.map((a, index) => {
		const { title, subtitle, description, image, id, section, otherImages } = a
		const currentRingName = ringNameFromSection[section]

		let CTA = ''
		const contentRef = useRef()

		const [groupPosition, setGroupPosition] = useState(randomPositionArray[index])

		// const linePoints = []
		// const [thisPosition, setThisPosition] = useState(new THREE.Vector3(randomPositionArray[index].x, randomPositionArray[index].y, randomPositionArray[index].z))
		// const [nextPosition, setNextPosition] = useState(randomPositionArray[index + 1] ? new THREE.Vector3(randomPositionArray[index + 1].x, randomPositionArray[index + 1].y, randomPositionArray[index + 1].z) : new THREE.Vector3(0, 0, 0))

		// linePoints.push(thisPosition)
		// linePoints.push(nextPosition)

		let otherImagesArray
		if (otherImages) otherImagesArray = otherImages.replace(/, /g, ',').split(',')

		// const masterGroup = useRef()

		useFrame(({ camera }) => {
			const lookAt = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
			contentRef.current.lookAt(lookAt)
		})

		// const contentPosition = [0, 0, 0]

		const { contentPosition } = useSpring({
			contentPosition: currentView == 'page' ? [groupPosition.x, groupPosition.y, groupPosition.z] : [0, 0, 0],
			config: config.gentle
		})

		// const baseHeights = { ring_2: 0.65 * 1, ring_3: 0.65 * 2, ring_4: 0.65 * 5, ring_5: 0.65 * 7.5, ring_6: 0.65 * 10 }
		// const shifterPlanePosition = { ring_2: 3, ring_3: 0.3 * 2, ring_4: 0.3 * 5, ring_5: 0.3 * 7.5, ring_6: 0.3 * 10 }
		const activeScales = { ring_2: 5, ring_3: 3, ring_4: 2.5, ring_5: 1.5, ring_6: 2 }

		const openingTextSizes = { ring_2: 0.1, ring_3: 0.3, ring_4: 0.7, ring_5: 0.9, ring_6: 2 }
		// const openingTextSizes = { ring_2: 0.05, ring_3: 3, ring_4: 2.5, ring_5: 1.5, ring_6: 2 }

		// const plane = new THREE.PlaneGeometry(sizes[contentSection][0] * aspectRatio, sizes[contentSection][1])

		return (
			<>
				{/* <Sphere args={[0.01, 10, 10]} key={'sphere - ' + index}>
					<meshNormalMaterial />
				</Sphere> */}
				{/* <group position={contentPosition}> */}
				{/* </group> */}
				<group>
					<animated.mesh visible={currentView == 'page'} key={'tile - ' + index} position={contentPosition}>
						<group position={[0, 2, 0]}>{/* <Line points={linePoints} color={'white'} lineWidth={1} dashed={false} /> */}</group>
						<group
							ref={contentRef}
							// position={[0, [2, 2, 2, 2, 0, 1, 1][index], 0]}
						>
							<TilePlane
								id={id}
								imageSrc={image}
								plane={plane}
								// linePoints={linePoints}
								section={section}
								otherImagesArray={otherImagesArray}
								// sizes={sizes}
								activeScales={activeScales}
								currentRingName={currentRingName}
								imageTexture={sectionTextures[index]}
							/>
							{/* <Plane args={[10, 3]} position={[5, 0, 0]} material-color='black'>
								<meshBasicMaterial attach='material' color={0x000000} transparent opacity={0.9} />
							</Plane> */}
							<Text
								font={'./fonts/Eveleth Clean Regular.otf'}
								anchorX='left'
								anchorY='top'
								position={[openingTextSizes[currentRingName] * 5, -Math.abs(openingTextSizes[currentRingName] * 2), 0.5]}
								fontSize={openingTextSizes[currentRingName]}
								// outlineOffsetX={0}
								// outlineOffsetY={0}
								// outlineBlur={0.2}
								// outlineBlur={openingTextSizes[currentRingName]}
								// outlineOpacity={openingTextSizes[currentRingName]}
								color={0xffffff}
								visible={!activeTile}
								// color={0xda841a}
							>
								{title}
							</Text>
						</group>
					</animated.mesh>
				</group>
			</>
		)
	})
}

const randomizeMatrix = (function () {
	const position = new THREE.Vector3()
	const rotation = new THREE.Euler()
	const quaternion = new THREE.Quaternion()
	const scale = new THREE.Vector3()

	return function (matrix) {
		position.x = Math.random() * 40 - 20
		position.y = Math.random() * 40 - 20
		position.z = Math.random() * 40 - 20

		rotation.x = Math.random() * 2 * Math.PI
		rotation.y = Math.random() * 2 * Math.PI
		rotation.z = Math.random() * 2 * Math.PI

		quaternion.setFromEuler(rotation)

		scale.x = scale.y = scale.z = Math.random() * 1

		matrix.compose(position, quaternion, scale)
	}
})()

export default ContentHolder

function randomIntFromInterval(ringName, axis) {
	// const { randomAmount, ringName } = props

	// console.log(randomAmount)
	// console.log(min)

	const randomAmounts = { ring_2: 2, ring_3: 4, ring_4: 10, ring_5: 13, ring_6: 25 }
	const randomAmount = randomAmounts[ringName]
	let min = -Math.abs(randomAmount)
	let max = randomAmount

	const minimumExpands = { ring_2: 1, ring_3: 5, ring_4: 7, ring_5: 7, ring_6: 12.5 }
	let minimumExpand = minimumExpands[ringName]

	const yElevations = { ring_2: 1, ring_3: 2, ring_4: 3, ring_5: 4, ring_6: 12 }
	let yElevation = yElevations[ringName]
	// console.log(minimumExpand)

	let random = Math.random() * (max - min) + min
	// console.log('before = ' + random)
	if (random < minimumExpand && random > -Math.abs(minimumExpand)) random = random * 1.5
	if (axis == 'y' && random < yElevation) random = random + randomAmount / 2
	// console.log('after = ' + random)
	return random
}
