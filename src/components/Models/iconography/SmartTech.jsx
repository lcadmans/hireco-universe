/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function SmartTechSection(props) {
	const group = useRef()
	const { nodes, materials, animations } = useGLTF('./models/iconography/INCONOGRAPHY_smartTech_v4.glb')
	const { actions } = useAnimations(animations, group)

	useEffect(() => {
		actions['codeCubeAction.001'].play()
		actions['wifiSpinAction'].play()
		actions['wifi_1_1Action'].play()
		actions['wifi_1_2Action'].play()
		actions['wifi_1_3Action'].play()
		actions['wifi_2_1Action'].play()
		actions['wifi_2_2Action'].play()
		actions['wifi_2_3Action'].play()
	}, [])

	return (
		<group ref={group} {...props} dispose={null}>
			<group name='Scene'>
				<group name='wifiSpin'>
					<mesh name='wifi_1' geometry={nodes.wifi_1.geometry} material={materials['Hireco - Wifi .005']} scale={0.75} />
					<mesh name='wifi_2' geometry={nodes.wifi_2.geometry} material={materials['Hireco - Wifi .004']} scale={0.78} />
					<mesh name='wifi_3' geometry={nodes.wifi_3.geometry} material={materials['Hireco - Wifi .006']} scale={0.74} />
					<mesh name='wifi_4' geometry={nodes.wifi_4.geometry} material={materials['Hireco - Wifi .003']} scale={0.78} />
					<mesh name='wifi_5' geometry={nodes.wifi_5.geometry} material={materials['Hireco - Wifi .002']} scale={0.75} />
					<mesh name='wifi_6' geometry={nodes.wifi_6.geometry} material={materials['Hireco - Wifi .001']} scale={0.74} />
				</group>
				<group name='codeCube' scale={0}>
					<mesh name='codeCube_1' geometry={nodes.codeCube_1.geometry} material={materials['Hireco - codeCube .001']} rotation={[Math.PI / 2, 0, 0]} scale={0.3} />
					<mesh name='codeCube_2' geometry={nodes.codeCube_2.geometry} material={materials['Hireco - codeCube .002']} rotation={[Math.PI / 2, 0, 0]} scale={0.29} />
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('./models/iconography/INCONOGRAPHY_smartTech_v4.glb')
