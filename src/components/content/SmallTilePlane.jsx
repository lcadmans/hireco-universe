import * as THREE from 'three'
import { Object3D } from 'three'
import { shallow } from 'zustand/shallow'
import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { shaderMaterial, Plane, Html, Line } from '@react-three/drei'
import { animated, a, update, useSpring, config } from '@react-spring/three'

import { appState } from '../../store'

export const SmallTilePlane = props => {
	const { imageTexture, section } = props

	const ringNameFromSection = appState(state => state.ringNameFromSection)

	const sizes = { ring_2: [0.65, 0.65], ring_3: [0.65 * 2, 0.65 * 2], ring_4: [0.65 * 5, 0.65 * 5], ring_5: [0.65 * 7.5, 0.65 * 7.5], ring_6: [0.65 * 10, 0.65 * 10] }

	const contentSection = ringNameFromSection[section]

	let aspectRatio = 1

	if (imageTexture && imageTexture.source) {
		const width = imageTexture.source.data.width
		const height = imageTexture.source.data.height
		aspectRatio = width / height
	}

	return (
		<group>
			<mesh depthTest={false}>
				<planeGeometry attach='geometry' args={[sizes[contentSection][0] * aspectRatio, sizes[contentSection][1]]} />
				<a.meshBasicMaterial
					attach='material'
					map={imageTexture}
					transparent
					opacity={1}
					// depthTest={depthTestBoolean}
					// depthWrite={false} polygonOffset={true} polygonOffsetFactor={activeRenderOrder}
				/>
			</mesh>
		</group>
	)
}
