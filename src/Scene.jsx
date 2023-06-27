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
	const getUniverseStores = appState(state => state.getUniverseStores)
	const setMaxDistance = appState(state => state.setMaxDistance)
	const maxDistance = appState(state => state.maxDistance, shallow)
	const started = appState(state => state.started)
	const setStarted = appState(state => state.setStarted)
	const sectionPositions = appState(state => state.sectionPositions)
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
		const t = state.clock.getElapsedTime()
		if (currentView == 'page' && maxDistance > 80) {
			setMaxDistance(maxDistance - 5)
		} else if (currentView == 'main' && maxDistance < 375) {
			// if (maxDistance < 200) setMaxDistance(150)
			// setMaxDistance(maxDistance + 50)
		}
		// if (!activeTile) {
		// 	floatGroup.current.rotation.set(Math.cos(t / 8) / 8, Math.sin(t / 8) / 16, -0.2 - Math.sin(t / 3) / 30)
		// 	floatGroup.current.rotation.z -= 0.02
		// }

		if (currentView == 'page' && camera.fov < 100) {
			camera.fov += 1.4
			camera.updateProjectionMatrix()
		} else if (currentView == 'main' && camera.fov > 60) {
			// console.log('return to base')
			camera.fov = camera.fov -= 2
			if (camera.fov < 60) camera.fov = 60

			camera.updateProjectionMatrix()
		}

		if (orbitControlsRef) {
			orbitControlsRef.current.autoRotate = true
			orbitControlsRef.current.autoRotateSpeed = -2
			console.log(orbitControlsRef)
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
			setMaxDistance(375)
			retrunCamera()
			if (!started) {
				// setTimeout(() => {
				setStarted(true)
				// }, 500)
			}
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
			let yTargetRingScalar = { ring_6: 20, ring_5: 1, ring_4: 1, ring_3: 2, ring_2: 2 }[activeRing]
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
