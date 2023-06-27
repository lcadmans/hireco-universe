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
	const setBrandVideo = appState(state => state.setBrandVideo)
	return (
		<div
			className='back pointer-events-auto relative z-[150] flex cursor-pointer items-center pb-6 pt-12 text-white'
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
					setBrandVideo(false)
				} else {
					setCurrentView('main')
					setActiveRing('none')
					setActiveTile(null)
					setFocusElementRef(null)
					setActiveVideo(null)
					setQrPanel(null)
					setBrandVideo(false)
				}
			}}
		>
			<svg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 47.334 27.934'>
				<g id='Group_9' data-name='Group 9' transform='translate(-109.319 -316.788)'>
					<g id='Group_8' data-name='Group 8' transform='translate(0 276.885)'>
						<path id='Icon_ionic-ios-arrow-back' data-name='Icon ionic-ios-arrow-back' d='M13.32,12.195l4.543-4.539a.858.858,0,0,0-1.215-1.212L11.5,11.587a.856.856,0,0,0-.025,1.183l5.168,5.179a.858.858,0,1,0,1.215-1.212Z' transform='translate(98.068 39.918)' fill='#fff' />
					</g>
					<g id='Group_7' data-name='Group 7' transform='translate(122.362 316.788)'>
						<g id='Group_6' data-name='Group 6' clip-path='url(#clip-path)'>
							<path
								id='Path_7'
								data-name='Path 7'
								d='M127.007,77.738l-.737-.189-.171-.61c1.01-1,.4-2.942-1.381-4.492a6.968,6.968,0,0,0-5.054-1.858h0a3.019,3.019,0,0,0-.308.06l-.021.005-.05.013-.046.014-.024.007q-.072.022-.141.048h0c-1.292.486-1.613,1.889-.563,3.52q.148.23.323.452l-.792-.378-.18.495q-.177-.235-.331-.478c-1.415-2.239-.754-4.1,1.268-4.5h0l.08-.015.022,0,.064-.01.04-.006.05-.007.054-.007h.012a8.786,8.786,0,0,1,6.15,2.312c2.226,1.928,3.014,4.368,1.734,5.628'
								transform='translate(-104.157 -62.231)'
								fill='#eb8913'
							/>
							<path
								id='Path_8'
								data-name='Path 8'
								d='M80.339,54.984c5.087,2.526,9.617,2.047,11.158-.544h0l.009-.015.041-.073.038-.068.029-.056c.015-.03.03-.06.045-.09l.015-.033c.018-.039.036-.078.053-.117l0-.005c1.167-2.753-.918-6.882-4.836-9.906-4.028-3.108-9.271-4.467-12.379-3.108l1.341.318.249.926c2.486-1.1,6.713-.017,9.98,2.521,2.912,2.262,4.5,5.227,4,7.376h0q-.029.123-.067.241L90,52.389c-.008.025-.017.05-.025.074s-.02.053-.03.079l-.012.032a2.988,2.988,0,0,1-.22.437h0c-1.257,2.055-4.9,2.39-8.929.382-4.593-2.289-7.355-6.427-6.518-9.187l-.714-1.051-1.278.059c-1.316,3.432,2.1,8.809,8.065,11.769'
								transform='translate(-64.215 -36.073)'
								fill='#eb8913'
							/>
							<path
								id='Path_9'
								data-name='Path 9'
								d='M8.764.012C2.448.257-1.207,4.284.362,10.33h0l.011.041c.017.065.035.129.053.194s.034.122.052.183.03.1.045.148c.024.079.049.158.075.237l.029.085c.034.1.069.2.106.307l0,.014c3.039,8.408,13.993,16.25,23.929,16.393,9.068.13,11.706-6.484,8.005-13.552L32.1,15.451l-1.964-1.365c2.619,5.563.117,10.4-6.978,10.092-6.887-.3-14.474-5.236-17.763-11.027h0q-.169-.3-.319-.593l-.048-.1c-.031-.062-.062-.124-.092-.186s-.063-.133-.093-.2L4.805,12a12.048,12.048,0,0,1-.45-1.143h0c-1.649-4.932.987-8.427,6.08-8.76,5.069-.332,11.658,2.6,15.988,6.9l1.933.865-.047-1.244C23.038,3.392,15.038-.232,8.764.012'
								transform='translate(0 0)'
								fill='#eb8913'
							/>
						</g>
					</g>
				</g>
			</svg>

			<span className='pl-4 pr-4 font-bold uppercase tracking-wider'>Back</span>
		</div>
	)
}
