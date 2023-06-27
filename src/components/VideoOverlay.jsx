import { appState } from '../store'
import { shallow } from 'zustand/shallow'

import ReactPlayer from 'react-player'
import { BackButton } from './'
import { useRef, useState } from 'react'

export function VideoOverlay() {
	const setActiveTile = appState(state => state.setActiveTile)
	const setActiveVideo = appState(state => state.setActiveVideo)

	const activeVideo = appState(state => state.activeVideo)
	const setActiveRing = appState(state => state.setActiveRing)
	const activeRing = appState(state => state.activeRing)
	const setFocusElementRef = appState(state => state.setFocusElementRef)
	const updateCamera = appState(state => state.updateCamera, shallow)
	const setQrPanel = appState(state => state.setQrPanel)
	const brandVideo = appState(state => state.brandVideo, shallow)
	const setBrandVideo = appState(state => state.setBrandVideo)
	const playerRef = useRef()

	const [error, setError] = useState('')
	// useEffect(() => {
	// 	if (!playerRef.current) return
	// 	playerRef.current.playing = true
	// }, [])

	return (
		<>
			<div className=' absolute z-50  h-screen w-screen'>
				<div className={`flex ${!brandVideo ? 'justify-start pl-24' : 'items-center justify-center'} h-full w-full items-center `}>
					<BackButton />
					<ReactPlayer url={'./images/' + activeVideo} playing className='relative z-20 w-[50%]' width={'50%'} height={'auto'} controls={true} loop={true} ref={playerRef} />
					{error}
					{/* <video class='relative z-20 w-[70vw]' autoplay muted controls>
						<source src={'./images/' + activeVideo} type='video/mp4' />
						Your browser does not support the video tag.
					</video> */}
					<div
						className='backdrop absolute top-0 left-0 z-10 h-full w-full bg-black bg-opacity-50 '
						onClick={() => {
							console.log('activeVideoChange')
							setActiveVideo(null)
							setActiveTile(null)
							// setActiveRing(activeRing)
							setFocusElementRef(null)
							setQrPanel(null)
							setBrandVideo(false)
							updateCamera()
						}}
					></div>
				</div>
			</div>
		</>
	)
}
