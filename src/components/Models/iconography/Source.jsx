import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function SourceSection(props) {
	const group = useRef()
	const { nodes, materials, animations } = useGLTF('./models/iconography/INCONOGRAPHY_Source_v5.glb')
	const { actions } = useAnimations(animations, group)

	useEffect(() => {
		actions['magnifyingGlass'].play()
		actions['reuseArrows'].play()
	}, [])

	return (
		<group ref={group} {...props} dispose={null}>
			<group name='Scene'>
				<group name='reuseArrows' rotation={[0, 0.001, 0]}>
					<mesh name='reuseArrows_1' geometry={nodes.reuseArrows_1.geometry} material={materials['Hireco-whiteMetal-arrows-1']} />
				</group>
				<group name='magnifyingGlass' rotation={[0, 0.001, 0]} scale={0.001}>
					<group name='magnifyingGlass_1001' rotation={[0, 0, 0.765]}>
						<mesh name='Cylinder001' geometry={nodes.Cylinder001.geometry} material={materials['Hireco-whiteMetal-magnifyingGlass-1']} />
						<mesh name='Cylinder001_1' geometry={nodes.Cylinder001_1.geometry} material={materials.tintedWindow} />
					</group>
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('./models/iconography/INCONOGRAPHY_Source_v5.glb')
