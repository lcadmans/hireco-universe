import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function SupportSection(props) {
	const group = useRef()
	const { nodes, materials, animations } = useGLTF('./models/iconography/INCONOGRAPHY_support_v8.glb')
	const { actions } = useAnimations(animations, group)

	// console.log(actions)

	useEffect(() => {
		actions['Action.001'].play()
		actions['Action.002'].play()
		actions['hourGlass.Action'].play()
		actions['hourglass.Action'].play()
		actions['hourglass_4_1Action'].play()
		actions['hourglass_4_1Action.001'].play()
		actions['hourglass_4_2Action'].play()
		actions['hourglass_4_2Action.001'].play()
		actions['hourglass_4_3Action'].play()
		actions['hourglass_4_3Action.001'].play()
		actions['hourglass_4_4Action'].play()
		actions['hourglass_4_4Action.001'].play()
		actions['hourglass_4_5Action'].play()
		actions['hourglass_4_5Action.001'].play()
		actions['spannerAction'].play()
	}, [])

	return (
		<group ref={group} {...props} dispose={null}>
			<group name='Scene'>
				<group name='hourGlass'>
					<group name='hourglass_null_1' rotation={[0, 0.001, 0.122]} scale={0.001}>
						<mesh name='hourglass_1' geometry={nodes.hourglass_1.geometry} material={materials['HOUR GLASS - GLASS - 1']} />
						<mesh name='hourglass_2' geometry={nodes.hourglass_2.geometry} material={materials.hourglass_2} scale={[1, 0.982, 1]} />
						<mesh name='hourglass_4_1' geometry={nodes.hourglass_4_1.geometry} material={materials.hourglass_4_1} position={[0, 0.404, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_1001' geometry={nodes.hourglass_4_1001.geometry} material={materials.hourglass_4_1} position={[0, -0.404, 0]} rotation={[Math.PI, 0, 0]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_2' geometry={nodes.hourglass_4_2.geometry} material={materials.hourglass_4_2} position={[0, 0.307, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_2001' geometry={nodes.hourglass_4_2001.geometry} material={materials.hourglass_4_2} position={[0, -0.307, 0]} rotation={[Math.PI, 0, 0]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_3' geometry={nodes.hourglass_4_3.geometry} material={materials.hourglass_4_3} position={[0, 0.196, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_3001' geometry={nodes.hourglass_4_3001.geometry} material={materials.hourglass_4_3} position={[0, -0.196, 0]} rotation={[Math.PI, 0, 0]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_4' geometry={nodes.hourglass_4_4.geometry} material={materials.hourglass_4_4} position={[0, 0.086, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_4001' geometry={nodes.hourglass_4_4001.geometry} material={materials.hourglass_4_4} position={[0, -0.086, 0]} rotation={[Math.PI, 0, 0]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_5' geometry={nodes.hourglass_4_5.geometry} material={materials.hourglass_4_5} position={[0, 0.02, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.287, -0.445, -0.287]} />
						<mesh name='hourglass_4_5001' geometry={nodes.hourglass_4_5001.geometry} material={materials.hourglass_4_5} position={[0, -0.02, 0]} rotation={[Math.PI, 0, 0]} scale={[-0.287, -0.445, -0.287]} />
					</group>
				</group>
				<group name='spanner'>
					<mesh name='spanner_1' geometry={nodes.spanner_1.geometry} material={materials.spanner_1} position={[0, 0.002, 0]} />
					<mesh name='spanner_2' geometry={nodes.spanner_2.geometry} material={materials.spanner_2} position={[0, -0.004, 0]}>
						<mesh name='spanner_3' geometry={nodes.spanner_3.geometry} material={materials.spanner_3} />
					</mesh>
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('./models/iconography/INCONOGRAPHY_support_v8.glb')
