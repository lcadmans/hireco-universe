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
	const sizes = { ring_2: [0.65, 0.65], ring_3: [1 * 3, 1 * 3], ring_4: [1 * 5, 1 * 5], ring_5: [1 * 7.5, 1 * 7.5], ring_6: [1 * 15, 1 * 15], none: [0, 0] }

	// const contentSection = ringNameFromSection[section]

	const fixedRingRandomPositionArray = {
		ring_2: [
			{
				x: 2.7054152147862114,
				y: 0.9421632868689489,
				z: 0.7432219397579811
			},
			{
				x: -2.8505716451185683,
				y: 0.9635753474361075,
				z: -1.160296347894592
			},
			{
				x: -2.7432337917757246,
				y: 0.13630915065819282,
				z: -1.8515943292752954
			},
			{
				x: -1.3474536882408472,
				y: 0.9979683372565389,
				z: -0.5213996008806303
			},
			{
				x: 0.7772765527163763,
				y: -1.4591955281848357,
				z: -1.0538907397195927
			},
			{
				x: 2.7373671415092433,
				y: -0.4691844837110293,
				z: 2.452825224744558
			},
			{
				x: -0.08494046839180425,
				y: 0.8401615285922146,
				z: 0.5460286849862521
			},
			{
				x: 0.19916625315307512,
				y: 0.8131890238195565,
				z: -1.986435379410148
			},
			{
				x: -0.6408678262493444,
				y: 0.6076525722298398,
				z: -2.446100314503717
			},
			{
				x: 2.7666731856743496,
				y: 2.41264774468626,
				z: 2.9828445457324353
			},
			{
				x: 0.2311470026049014,
				y: -0.6979777628473331,
				z: -2.4083899922983965
			}
		],
		ring_3: [
			{
				x: -5.338401579088266,
				y: -1.9534258124300443,
				z: 2.9034416947346102
			},
			{
				x: 5.6297756328855595,
				y: 6.929794339404239,
				z: -0.7523492490780441
			},
			{
				x: 1.7052329005669122,
				y: 3.9016696646066986,
				z: 5.613391103170439
			},
			{
				x: -4.2203404057585665,
				y: -1.9017368381931954,
				z: -5.474226741946934
			},
			{
				x: -3.0930535241792585,
				y: 2.015131668267077,
				z: -7.308283756149628
			}
		],
		ring_4: [
			{
				x: 4.757749598825542,
				y: 0.4530547865569119,
				z: -8.982786751700143
			},
			{
				x: -3.6129644589619945,
				y: 3.0590106303093583,
				z: -4.168453858968011
			},
			{
				x: 5.823725768338635,
				y: 8.471461252229687,
				z: 3.0971075481846606
			}
		],
		ring_5: [
			{
				x: -3.703375295075748,
				y: 10.492122149518458,
				z: -9.589739853482637
			},
			{
				x: 8.618509964777406,
				y: -5.066106579085771,
				z: -8.911678759578198
			},
			{
				x: -7.185805182762855,
				y: 0.9345264320602453,
				z: 10.27513816669024
			},
			{
				x: -9.474990852310409,
				y: 7.363024188632291,
				z: -0.9139343431228681
			}
		],
		ring_6: [
			{
				x: 6.075941620821396,
				y: 8.697753223513702,
				z: 14.13576723900227
			},
			{
				x: -13.339523301926315,
				y: -5.830366381029242,
				z: -11.546219623623628
			}
		]
	}

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

					let randomPositionArray

					if (fixedRingRandomPositionArray.hasOwnProperty(ringName)) {
						// console.log('gotfrom ring name')
						randomPositionArray = fixedRingRandomPositionArray[ringName]
					} else {
						randomPositionArray = useMemo(() => {
							const array = []
							for (let i = 0; i < content.length; i++) {
								array.push({ x: randomIntFromInterval(ringName, 'x'), y: randomIntFromInterval(ringName, 'y'), z: randomIntFromInterval(ringName, 'z') })
							}
							return array
						}, [])
					}

					// console.log(currentRingName)
					// console.log(randomPositionArray)

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
			// const lookAt = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
			contentRef.current.lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))
		})

		// const contentPosition = [0, 0, 0]

		const { contentPosition } = useSpring({
			contentPosition: currentView == 'page' ? [groupPosition.x, groupPosition.y, groupPosition.z] : [0, 0, 0],
			config: config.gentle
		})

		// const baseHeights = { ring_2: 0.65 * 1, ring_3: 0.65 * 2, ring_4: 0.65 * 5, ring_5: 0.65 * 7.5, ring_6: 0.65 * 10 }
		// const shifterPlanePosition = { ring_2: 3, ring_3: 0.3 * 2, ring_4: 0.3 * 5, ring_5: 0.3 * 7.5, ring_6: 0.3 * 10 }
		const activeScales = { ring_2: 5, ring_3: 3, ring_4: 2.5, ring_5: 1.5, ring_6: 2 }
		const openingTextSizes = { ring_2: 0.075, ring_3: 0.3, ring_4: 0.7, ring_5: 0.9, ring_6: 2 }
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

export default ContentHolder

function randomIntFromInterval(ringName, axis) {
	// const { randomAmount, ringName } = props

	// console.log(randomAmount)
	// console.log(min)

	const randomAmounts = { ring_2: 3, ring_3: 7, ring_4: 9, ring_5: 13, ring_6: 20 }
	const randomAmount = randomAmounts[ringName]
	let min = -Math.abs(randomAmount)
	let max = randomAmount

	const minimumExpands = { ring_2: 0.5, ring_3: 5, ring_4: 6, ring_5: 7, ring_6: 10 }
	let minimumExpand = minimumExpands[ringName]

	const yElevations = { ring_2: -0.5, ring_3: 1.5, ring_4: 3, ring_5: 4, ring_6: 6 }
	let yElevation = yElevations[ringName]
	// console.log(minimumExpand)

	let random = Math.random() * (max - min) + min
	// console.log('before = ' + random)
	if (random < minimumExpand && random > -Math.abs(minimumExpand)) random = random * 1.5
	if (axis == 'y' && random < yElevation) random = random + randomAmount / 2
	// console.log('after = ' + random)
	return random
}
