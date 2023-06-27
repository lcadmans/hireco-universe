import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls, useGLTF, useAnimations, Sphere } from '@react-three/drei'
import { shallow } from 'zustand/shallow'
import { SourceSection, SupportSection, SmartTechSection, ExpertSection, WelfareSection } from './iconography'

import { useSpring, animated } from '@react-spring/three'

import * as THREE from 'three'
import { LoopOnce } from 'three'

import { appState } from '../../store'

function renderSwitch(nodeName, index) {
	// console.log(nodeName)
	switch (nodeName) {
		case 'ring_2':
			return (
				<>
					<ExpertSection index={index} />
				</>
			)
		case 'ring_3':
			return (
				<>
					<SourceSection index={index} />
				</>
			)
		case 'ring_4':
			return (
				<>
					<SupportSection index={index} />
				</>
			)
		case 'ring_5':
			return (
				<>
					<SmartTechSection index={index} />
				</>
			)
		case 'ring_6':
			return (
				<>
					<WelfareSection index={index} />
				</>
			)
		default:
			return (
				<>
					<ExpertSection index={index} />
				</>
			)
	}
}

export function SetsModel(props) {
	const { index, position, nodeName } = props

	const activeRing = appState(state => state.activeRing, shallow)
	const setActiveRing = appState(state => state.setActiveRing)
	const focusRing = appState(state => state.focusRing)
	const setFocusRing = appState(state => state.setFocusRing)

	const currentView = appState(state => state.currentView)

	const getUniverseStores = appState(state => state.getUniverseStores)

	const { colorValues } = getUniverseStores()

	let col = new THREE.Color(...colorValues[3])

	const [baseScale, setBaseScale] = useState(fetchScale(index))

	const [active, setActive] = useState(false)
	const { scale } = useSpring({ scale: active ? baseScale * 1.5 : baseScale })

	const group = useRef()

	useFrame(state => {
		group.current.rotation.y += 0.015
		// console.log(first)
		const t = state.clock.getElapsedTime()
		// console.log(1 + Math.sin(t))
		let equation = 1.5 + Math.sin(t * 2) / 10
		// console.log(equation)

		if (activeRing == nodeName) {
			group.current.scale.x = equation
			group.current.scale.y = equation
			group.current.scale.z = equation
		}
	})

	useEffect(() => {
		if (activeRing === nodeName) {
			// group.current.scale.set(0.1)
		}
	}, [activeRing])

	function handleMouseOver() {
		setActive(true)
		setFocusRing(nodeName)
	}

	function handleMouseOut() {
		setActive(false)
		setFocusRing('none')
	}

	return (
		<animated.mesh
		// scale={scale}
		// position={position}
		>
			<group
				onClick={e => {
					if (currentView != 'page') {
						setActiveRing(nodeName)
					}
				}}
				ref={group}
				visible={currentView != 'page' || (currentView == 'page' && activeRing != nodeName)}
				onPointerEnter={() => {}}
				position={[0, 0.75, 0]}
			>
				<Sphere scale={1}>
					<meshStandardMaterial color='black' transparent opacity={0} side={THREE.BackSide} alphaMap={false} depthTest={false} />
				</Sphere>
				{/* <Sphere scale={0.5}>
				<meshStandardMaterial color={col} wireframe transparent opacity={0.005} blending={THREE.NormalBlending} />
			</Sphere> */}
				{renderSwitch(nodeName, index)}
			</group>
		</animated.mesh>
	)
}

function fetchScale(index) {
	let scale = 0.4
	index = index + 1
	scale = scale / index

	return scale
}
