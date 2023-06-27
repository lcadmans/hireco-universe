/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function WelfareSection(props) {
	const group = useRef()
	const { nodes, materials, animations } = useGLTF('./models/iconography/INCONOGRAPHY_WELFARE_v2.glb')
	const { actions } = useAnimations(animations, group)

	useEffect(() => {
		actions['PAction.001'].play()
		actions['heartAction.002'].play()
		actions['knifeAndForkAction'].play()
	}, [])

	return (
		<group ref={group} {...props} dispose={null}>
			<group name='Scene'>
				<group name='knifeAndFork'>
					<mesh name='knifeAndFork_fork' geometry={nodes.knifeAndFork_fork.geometry} material={materials.knifeAndFork_1} position={[-0.163, -0.221, 0]} rotation={[Math.PI / 2, -Math.PI / 4, 0]} scale={[0.023, 0.023, 0.223]} />
					<mesh name='knifeAndFork_knife' geometry={nodes.knifeAndFork_knife.geometry} material={materials.knifeAndFork_2} position={[0.191, -0.315, -0.025]} rotation={[Math.PI / 2, Math.PI / 4, 0]} scale={0.032} />
				</group>
				<group name='P001' scale={0.001}>
					<mesh name='P' geometry={nodes.P.geometry} material={materials.P_1} position={[0.057, 0.019, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.553} />
				</group>
				<group name='heart' scale={0.001}>
					<mesh name='heart_1' geometry={nodes.heart_1.geometry} material={materials.heart_1} rotation={[Math.PI / 2, 0, 0]} scale={9.37} />
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('./models/iconography/INCONOGRAPHY_WELFARE_v2.glb')
