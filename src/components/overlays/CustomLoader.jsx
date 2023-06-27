import { useProgress } from '@react-three/drei'
import { appState } from '../../store'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import Lottie from 'lottie-react'
import animation from '../../assets/HirecoLoadingScreen_v2.json'
// HirecoLoadingScreen_v2

export function CustomLoader() {
	const { progress } = useProgress()

	const started = appState(state => state.started, shallow)
	const setStarted = appState(state => state.setStarted)
	// const [started, setStarted] = useState(false)
	const [unmount, setUnmount] = useState(false)

	// useEffect(() => {
	// 	console.log('started')
	// 	console.log(started)
	// 	// setUnmount(true)
	// 	if (started == true) {
	// 		// setTimeout(() => {
	// 		// 	console.log('unmount')
	// 		// }, 2500)
	// 	}
	// }, [started])

	useEffect(() => {
		if (progress == 100) {
			setTimeout(() => {
				// console.log('unmount')
				setUnmount(true)
			}, 2500)
		}
	}, [progress])

	return (
		<>
			{/* {unmount ? (
				<></>
			) : ( */}
			<>
				<>
					{/* <div className={`custom-loader absolute z-[60] flex h-full w-full items-center justify-center transition-opacity delay-[1400ms] duration-[1200ms] ease-in-out ${!started ? 'opacity-100' : 'opacity-0 '}`}></div> */}
					<div className={`custom-loader pointer-events-none absolute  z-[60]  flex h-full w-full items-center justify-center bg-black transition-all delay-[200ms] duration-[800ms] ease-in-out ${!unmount ? 'opacity-100' : ' opacity-0 '}`}>
						{/* <p className={`cursor-pointer text-slate-100 ${progress == 100 ? 'opacity-70' : 'opacity-20'} ${!started ? '' : 'opacity-0 '}  font-light transition-all hover:text-lg hover:opacity-80`} onClick={() => setStarted(true)}>
								Explore
							</p> */}
						<div className='w-32'>
							<Lottie animationData={animation} loop={true} />
						</div>
					</div>
				</>
			</>
			{/* )} */}
		</>
	)
}
