import { appState } from '../store'
import { shallow } from 'zustand/shallow'
import { cameraPositionsStore } from '../data'

export function BackButton() {
	const setActiveRing = appState(state => state.setActiveRing)
	const setCurrentView = appState(state => state.setCurrentView)
	const setActiveTile = appState(state => state.setActiveTile)

	const activeRing = appState(state => state.activeRing, shallow)
	const activeTile = appState(state => state.activeTile, shallow)
	const updateBounds = appState(state => state.updateBounds, shallow)
	const setActiveVideo = appState(state => state.setActiveVideo, shallow)
	const setFocusElementRef = appState(state => state.setFocusElementRef)
	const setQrPanel = appState(state => state.setQrPanel)
	return (
		<div
			className='back pointer-events-auto relative z-[150] flex cursor-pointer pb-6 pt-12 text-white'
			onClick={() => {
				if (activeTile) {
					setActiveTile(null)
					setFocusElementRef(null)
					setActiveVideo(null)
					// setActiveRing(activeRing)
					setQrPanel(null)
					let [endPositionX, endPositionY, endPositionZ] = [cameraPositionsStore.focus[activeRing].position.x, cameraPositionsStore.focus[activeRing].position.y, cameraPositionsStore.focus[activeRing].position.z]
					let [endTargetX, endTargetY, endTargetZ] = [cameraPositionsStore.focus[activeRing].target.x, cameraPositionsStore.focus[activeRing].target.y, cameraPositionsStore.focus[activeRing].target.z]

					updateBounds({ position: { xPos: endPositionX, yPos: endPositionY, zPos: endPositionZ }, target: { xTar: endTargetX, yTar: endTargetY, zTar: endTargetZ } })
				} else {
					setCurrentView('main')
					setActiveRing('none')
					setActiveTile(null)
					setFocusElementRef(null)
					setActiveVideo(null)
					setQrPanel(null)
				}
			}}
		>
			<svg xmlns='http://www.w3.org/2000/svg' width='40.681' height='18' viewBox='0 0 40.681 18'>
				<g id='Group_1' data-name='Group 1' transform='translate(-109.319 -43.115)'>
					<g id='Icon_ionic-ios-planet' data-name='Icon ionic-ios-planet' transform='translate(117.378 34.115)'>
						<path
							id='Path_1'
							data-name='Path 1'
							d='M32.52,24.771a4.139,4.139,0,0,0-.8-1.287,26.5,26.5,0,0,0-3.853-3.319.341.341,0,0,0-.527.162l-.33.942a.34.34,0,0,0,.12.387,18.511,18.511,0,0,1,2.939,2.524.262.262,0,0,1-.274.408,30.239,30.239,0,0,1-3.108-.9c-.6-.218-1.245-.471-1.913-.745a8.375,8.375,0,0,0-.872-11.18,8.6,8.6,0,0,0-11-.717A8.458,8.458,0,0,0,10.048,14.7c-.584-.422-1.132-.837-1.631-1.238A17.582,17.582,0,0,1,5.7,11.025c-.155-.2.063-.471.309-.415A39.946,39.946,0,0,1,9.97,11.939a.309.309,0,0,0,.316-.056l.78-.71a.3.3,0,0,0-.091-.506A19.85,19.85,0,0,0,5.147,9a1.734,1.734,0,0,0-1.638.731c-.534.935.5,2.475,3.171,4.7a65.483,65.483,0,0,0,9.6,6.469c6.152,3.452,12.03,5.7,14.625,5.7a1.652,1.652,0,0,0,1.554-.64A1.367,1.367,0,0,0,32.52,24.771Z'
							fill='#fff'
						/>
						<path
							id='Path_2'
							data-name='Path 2'
							d='M21.938,24.891a69.329,69.329,0,0,1-6.511-3.15c-2.116-1.188-4.177-2.566-5.934-3.769a.421.421,0,0,0-.239-.077.433.433,0,0,0-.429.415c0,.084-.007.169-.007.246a8.332,8.332,0,0,0,2.5,5.97A8.589,8.589,0,0,0,22,25.629a.409.409,0,0,0,.19-.387A.4.4,0,0,0,21.938,24.891Z'
							fill='#fff'
						/>
					</g>
					<path id='Icon_ionic-ios-arrow-back' data-name='Icon ionic-ios-arrow-back' d='M13.32,12.195l4.543-4.539a.858.858,0,0,0-1.215-1.212L11.5,11.587a.856.856,0,0,0-.025,1.183l5.168,5.179a.858.858,0,1,0,1.215-1.212Z' transform='translate(98.068 39.918)' fill='#fff' />
				</g>
			</svg>

			<span className='pl-4 font-bold uppercase tracking-wider'>Back</span>
		</div>
	)
}
