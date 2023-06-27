import React, { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { appState } from '../store'

export function ConsoleLogger() {
	const activeRing = appState(state => state.activeRing)
	const currentView = appState(state => state.currentView)
	const activePage = appState(state => state.activePage)
	const activeTile = appState(state => state.activeTile, shallow)
	// const scrollControlsInitiated = appState(state => state.scrollControlsInitiated, shallow)
	const activeVideo = appState(state => state.activeVideo, shallow)
	const qrPanel = appState(state => state.qrPanel, shallow)

	let table = {}

	table.activeRing = activeRing
	table.currentView = currentView
	table.activePage = activePage
	table.activeTile = activeTile
	table.activeVideo = activeVideo
	table.qrPanel = qrPanel
	// table.scrollControlsInitiated = scrollControlsInitiated

	useEffect(() => {
		console.table(table)
	}, [table])
	return <></>
}
