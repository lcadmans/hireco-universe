import { useBounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import useRefs from 'react-use-refs'
import { shallow } from 'zustand/shallow'
import { ContentHolder, HirecoUniverse } from './components'
import { cameraPositionsStore } from './data'
import { appState } from './store'
import { asyncCall } from './functions'

export function Scene(props) {
	const { orbitControlsRef } = props
	const [floatGroup, hirecoUniverseRef] = useRefs()
	const currentView = appState(state => state.currentView, shallow)
	const activeRing = appState(state => state.activeRing, shallow)
	const focusElementRef = appState(state => state.focusElementRef, shallow)
	const ringNames = appState(state => state.ringNames)
	const setUpdateBounds = appState(state => state.setUpdateBounds)
	const setUpdateCamera = appState(state => state.setUpdateCamera)
	// const setMaxDistance = appState(state => state.setMaxDistance)
	// const maxDistance = appState(state => state.maxDistance, shallow)
	const started = appState(state => state.started)
	const setStarted = appState(state => state.setStarted)
	const sectionPositions = appState(state => state.sectionPositions)
	const flyThrough = appState(state => state.flyThrough)
	// console.log('getUniverseStores')
	// console.log(getUniverseStores())

	const [initialLoad, setInitialLoad] = useState(false)

	// useEffect(() => {
	// 	console.log('mockData')
	// 	console.log(mockData)
	// }, [mockData])

	const bounds = useBounds()

	function updateboundsFunction(props) {
		orbitControlsRef.current.enabled = false
		const { position, target } = props
		const { xPos, yPos, zPos } = position
		const { xTar, yTar, zTar } = target
		console.log('updateBoundsFunction')
		bounds.to({ position: [xPos, yPos, zPos], target: [xTar, yTar, zTar] })
		setTimeout(() => {
			orbitControlsRef.current.enabled = true
		}, 3500)
	}

	function retrunCamera() {
		let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.focus['none'].position.x, cameraPositionsStore.focus['none'].position.y, cameraPositionsStore.focus['none'].position.z]
		// let { x: endTargetX, y: endTargetY, z: endTargetZ } = sectionPositions.focus['none'].target
		let [endTargetX, endTargetY, endTargetZ] = [0, 0, 0]
		bounds.to({ position: [endPositionX, endPositionY, endPositionZ], target: [endTargetX, endTargetY, endTargetZ] })
	}

	function updateCameraFunction(props) {
		let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.focus[activeRing].position.x, cameraPositionsStore.focus[activeRing].position.y, cameraPositionsStore.focus[activeRing].position.z]
		let { x: endTargetX, y: endTargetY, z: endTargetZ } = sectionPositions[activeRing]
		let yTargetRingScalar = { ring_6: 20, ring_5: 10, ring_4: 1, ring_3: 2, ring_2: 2 }[activeRing]
		endTargetY = endTargetY + yTargetRingScalar
		bounds.to({ position: [endPositionX, endPositionY, endPositionZ], target: [endTargetX, endTargetY, endTargetZ] })
	}

	useEffect(() => {
		setUpdateBounds(updateboundsFunction)
		setUpdateCamera(updateCameraFunction)
	}, [currentView, activeRing])

	useFrame(state => {
		const { camera } = state
		// const t = state.clock.getElapsedTime()
		// if (currentView != 'page' && orbitControlsRef.current.maxDistance < 370) {
		// 	if (orbitControlsRef.current.maxDistance < 150) orbitControlsRef.current.maxDistance = 150
		// 	orbitControlsRef.current.maxDistance + 10
		// }
		if (currentView == 'page' && orbitControlsRef.current.maxDistance > 80) {
			orbitControlsRef.current.maxDistance = orbitControlsRef.current.maxDistance - 5
			// console.log(orbitControlsRef.current.maxDistance)
			// setMaxDistance(maxDistance - 5)
		} else if (currentView != 'page') {
			if (orbitControlsRef.current.maxDistance < 200) orbitControlsRef.current.maxDistance = 200
			if (orbitControlsRef.current.maxDistance < 365) orbitControlsRef.current.maxDistance = orbitControlsRef.current.maxDistance + 10
			// console.log(orbitControlsRef.current.maxDistance)
			// if (maxDistance < 200) setMaxDistance(150)
			// setMaxDistance(maxDistance + 50)
		}
		// if (!activeTile) {
		// 	floatGroup.current.rotation.set(Math.cos(t / 8) / 8, Math.sin(t / 8) / 16, -0.2 - Math.sin(t / 3) / 30)
		// 	floatGroup.current.rotation.z -= 0.02
		// }

		if (currentView == 'page' && camera.fov < 110) {
			camera.fov += 1.75
			camera.updateProjectionMatrix()
		} else if (currentView == 'main' && camera.fov > 60) {
			// console.log('return to base')
			camera.fov = camera.fov -= 3
			if (camera.fov < 60) camera.fov = 60

			camera.updateProjectionMatrix()
		}

		if (orbitControlsRef && flyThrough) {
			orbitControlsRef.current.autoRotate = true

			if (currentView == 'main') {
				orbitControlsRef.current.autoRotateSpeed = -2
			} else if (activeRing) {
				console.log(activeRing)
				switch (activeRing) {
					// case 'ring_6':
					// 	orbitControlsRef.current.autoRotateSpeed = 2
					// 	break
					case 'ring_2':
						orbitControlsRef.current.autoRotateSpeed = 2
						break
					case 'ring_3':
						orbitControlsRef.current.autoRotateSpeed = 2
						break
					// 		default:
					// 			orbitControlsRef.current.autoRotateSpeed = 2
				}
			}
		}
	})

	useEffect(() => {
		// Handle initial load
		if (!initialLoad) {
			const { x, y, z } = cameraPositionsStore['idle'].position
			const { x: xTar, y: yTar, z: zTar } = cameraPositionsStore['idle'].target
			// updateboundsFunction({ position: { xPos: x, yPos: y, zPos: z }, target: { xTar: 0, yTar: 0, zTar: 0 } })
			bounds.to({ position: [x, y, z], target: [xTar, yTar, zTar] })
			setInitialLoad(true)
		}
	}, [])

	const maxDistances = { ring_6: 90, ring_5: 80, ring_4: 80, ring_3: 30, ring_2: 10 }

	useEffect(() => {
		// console.log('return')

		if (currentView == 'main') {
			// setMaxDistance(375)
			retrunCamera()
			if (!started) {
				// setTimeout(() => {
				setStarted(true)
				// }, 500)
			}
		}
		if (currentView == 'idle') {
			// setMaxDistance(375)
			let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.idle.position.x, cameraPositionsStore.idle.position.y, cameraPositionsStore.idle.position.z]
			let [endTargetX, endTargetY, endTargetZ] = [cameraPositionsStore.idle.target.x, cameraPositionsStore.idle.target.y, cameraPositionsStore.idle.target.z]
			bounds.to({ position: [endPositionX, endPositionY, endPositionZ], target: [endTargetX, endTargetY, endTargetZ] })
		}
		if (currentView == 'page' && currentView != 'main') {
			setTimeout(() => {
				// setMaxDistance(maxDistances[activeRing])
			}, 2000)
		}
	}, [currentView])

	useEffect(() => {
		if (currentView == 'page') {
			orbitControlsRef.current.enabled = false
			setTimeout(() => {
				orbitControlsRef.current.enabled = true
			}, 1750)

			// console.log(activeRing)

			let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.focus[activeRing].position.x, cameraPositionsStore.focus[activeRing].position.y, cameraPositionsStore.focus[activeRing].position.z]
			let { x: endTargetX, y: endTargetY, z: endTargetZ } = sectionPositions[activeRing]
			let yTargetRingScalar = { ring_6: 20, ring_5: 10, ring_4: 5, ring_3: 4, ring_2: 3 }[activeRing]
			endTargetY = endTargetY + yTargetRingScalar
			bounds.to({ position: [endPositionX, endPositionY, endPositionZ], target: [endTargetX, endTargetY, endTargetZ] })
		}
	}, [activeRing])

	// useEffect(() => {
	// 	if (activeRing == 'ring_3' || activeRing == 'ring_3') {
	// 		setBoundsMargin(0)
	// 	}
	// }, [activeRing])

	useEffect(() => {
		if (!focusElementRef) return
		// if (currentView != 'page') return
		if (currentView == 'page') {
			// console.log('focusing on element')
			bounds.refresh(focusElementRef.current)
			// bounds.clip()
			bounds.fit()
		} else {
			bounds.refresh()
		}
	}, [focusElementRef])

	return (
		<group ref={floatGroup}>
			<ContentHolder sectionName={ringNames[activeRing]} />
			<group ref={hirecoUniverseRef}>
				<HirecoUniverse />
			</group>
		</group>
	)
}
