import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import * as THREE from 'three'

const ringNames = { ring_2: 'Experts', ring_3: 'Source', ring_4: 'Support', ring_5: 'Technology', ring_6: 'Welfare' }
const sectionRings = { Experts: 'ring_2', Source: 'ring_3', Support: 'ring_4', Technology: 'ring_5', Welfare: 'ring_6' }

let sectPositions = {
	ring_6: new THREE.Vector3(-163.04542541503906, 0, 80.35037231445312),
	ring_5: new THREE.Vector3(76.90646362304688, 0, -6.828255653381348),
	ring_4: new THREE.Vector3(-25.267168045043945, 0, -23.942188262939453),
	ring_2: new THREE.Vector3(4.948750019073486, 0, 1.3650130033493042),
	ring_3: new THREE.Vector3(-4.358933448791504, 0, 14.004501342773438)
}

export const appState = create(
	devtools(set => ({
		// States
		started: false,
		activeSlide: 0,
		// activeRing: 'pageSection',
		// activeRing: 'ring_2',
		activeRing: 'none',
		focusRing: 'none',
		numPages: 4,
		activePage: null,
		activePageNumber: null,
		// currentView: 'main',
		currentView: 'idle',
		// currentView: 'page',
		// isAnimating: false,
		universeStores: null,
		cameraRefInfo: null,
		activeCameraAnchor: null,
		cameraOrbitPoints: generateCirclePoints(1.1, 7, 0.6),
		returnCameraToOrigin: null,
		forcePageUpdate: false,
		cameraControlsMouseButtons: { left: 1, middle: 8, right: 2, wheel: 8 },
		dimensions: { width: window.innerWidth, height: window.innerHeight },
		scrollControlsInitiated: false,
		activeTile: null,
		activeTileInfo: null,
		cameraControlsref: null,
		activeTileRef: null,
		focusElementRef: null,
		updateBounds: null,
		// maxDistance: 700,
		// boundsMargin: 3,
		boundsMargin: 3,
		activeVideo: null,
		// activeVideo: 'Hireco - Brand Film & Tracking System Films Combined (H.264).mp4',
		loaded: false,
		qrPanel: null,
		boundsDamping: 3,
		updateCamera: null,
		textures: null,
		sectionPositions: sectPositions,
		idleMessage: false,
		brandVideo: false,
		flyThrough: true,

		// Set States
		setActiveSlide: index => set(state => ({ activeSlide: index })),
		setActiveRing: index => set(state => ({ activeRing: index })),
		setFocusRing: index => set(state => ({ focusRing: index })),
		setNumPages: index => set(state => ({ numPages: index })),
		setActivePage: index => set(state => ({ activePage: index })),
		setActivePageNumber: index => set(state => ({ activePageNumber: index })),
		setCurrentView: index => set(state => ({ currentView: index })),
		// setIsAnimating: input => set(state => ({ isAnimating: input })),
		setStarted: input => set(state => ({ started: input })),
		setUniverseStores: input => set(state => ({ universeStores: input })),
		setCameraRefInfo: input => set(state => ({ cameraRefInfo: input })),
		setActiveCameraAnchor: input => set(state => ({ activeCameraAnchor: input })),
		setCameraOrbitPoints: input => set(state => ({ cameraOrbitPoints: input })),
		setReturnCameraToOrigin: input => set(state => ({ returnCameraToOrigin: input })),
		setForcePageUpdate: input => set(state => ({ forcePageUpdate: input })),
		setCameraControlsMouseButtons: input => set(state => ({ cameraControlsMouseButtons: input })),
		setDimensions: input => set(state => ({ dimensions: input })),
		setScrollControlsInitiated: input => set(state => ({ scrollControlsInitiated: input })),
		setActiveTile: input => set(state => ({ activeTile: input })),
		setCameraControlsref: input => set(state => ({ cameraControlsref: input })),
		setActiveTileInfo: input => set(state => ({ activeTileInfo: input })),
		setActiveTileRef: input => set(state => ({ activeTileRef: input })),
		setFocusElementRef: input => set(state => ({ focusElementRef: input })),
		setUpdateBounds: input => set(state => ({ updateBounds: input })),
		// setMaxDistance: input => set(state => ({ maxDistance: input })),
		setBoundsMargin: input => set(state => ({ boundsMargin: input })),
		setActiveVideo: input => set(state => ({ activeVideo: input })),
		setLoaded: input => set(state => ({ loaded: input })),
		setQrPanel: input => set(state => ({ qrPanel: input })),
		setBoundsDamping: input => set(state => ({ boundsDamping: input })),
		setUpdateCamera: input => set(state => ({ updateCamera: input })),
		setTextures: input => set(state => ({ textures: input })),
		setIdleMessage: input => set(state => ({ idleMessage: input })),
		setBrandVideo: input => set(state => ({ brandVideo: input })),

		// Content
		ringNames: ringNames,
		ringNameFromSection: sectionRings,
		// fetchData: null,
		// fetchData: processData(cmsData),
		fetchData: null,
		mockData: null,
		setFetchData: input => set(state => ({ fetchData: input })),

		// functions
		generateCirclePoints: (radius, segments, yElevation) => generateCirclePoints(radius, segments, yElevation),
		getUniverseStores: () => getUniverseStores()
	}))
)

// const cameraPositionsStore = {}

function generateCirclePoints(radius, segments, yElevation = 0) {
	const points = []
	for (let i = 0; i < segments; i++) {
		const angle = (i / segments) * Math.PI * 2
		// let point = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
		let point = new THREE.Vector3(Math.cos(angle) * radius, yElevation, Math.sin(angle) * radius)
		points.push(point)
	}
	return points
}

// Unvierse Stores from Zustand State Management
const getUniverseStores = () => {
	let colorValues = []
	let baseValues = [0.831, 0.25, 0.007]
	for (let i = 0; i < 15; i++) {
		let row = []
		row.push(baseValues[0] * i)
		row.push(baseValues[1] * i)
		row.push(baseValues[2] * i)
		colorValues.push(row)
	}
	const universeMultipliers = {}

	// const fectchSectionPositions = () => {
	// 	const { nodes, materials } = useGLTF('./models/hireco_3DScene_sectLocation-v3.glb')
	// 	let sectPositions = {}

	// 	Object.keys(nodes).forEach(a => {
	// 		let b = nodes[a]
	// 		b.name = b.name.replace('_location', '')

	// 		if (b.type == 'Mesh') sectPositions[b.name] = b.position
	// 	})
	// 	return sectPositions
	// }
	// const fectchSectionPositions = () => {
	// 	let sectPositions = {
	// 		ring_6: {
	// 			x: -163.04542541503906,
	// 			y: 0,
	// 			z: 80.35037231445312
	// 		},
	// 		ring_5: {
	// 			x: 76.90646362304688,
	// 			y: 0,
	// 			z: -6.828255653381348
	// 		},
	// 		ring_4: {
	// 			x: -25.267168045043945,
	// 			y: 0,
	// 			z: -23.942188262939453
	// 		},
	// 		ring_2: {
	// 			x: 4.948750019073486,
	// 			y: 0,
	// 			z: 1.3650130033493042
	// 		},
	// 		ring_3: {
	// 			x: -4.358933448791504,
	// 			y: 0,
	// 			z: 14.004501342773438
	// 		}
	// 	}

	// 	return sectPositions
	// }
	// console.log(fectchSectionPositions())
	// const sectionPositions = fectchSectionPositions()
	// console.log(sectionPositions)
	const sectionPositions = sectPositions

	return { colorValues, universeMultipliers, sectionPositions }
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}
