import React, { useRef, useEffect, useState } from "react"
import "./MainPageView.scss"

const selectRandomLetters = (): string[] => {
	const listLetters: string = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y"
	const listArrLetters: string[] = listLetters.split(",")
	const listArrLettersRandom: string[] = []
	listArrLetters.forEach((el, i) => {
		if (i < 11) {
			let randomIdx = Math.floor(Math.random() * listArrLetters.length)
			listArrLettersRandom.push(listArrLetters[randomIdx])
		}
	})
	//console.log("listArrLettersRandom", listArrLettersRandom)
	return listArrLettersRandom
}

export default function MainPageView(): JSX.Element {
	const inputEl = useRef<HTMLInputElement>(null)
	const [inputLetter, onInputLetter] = useState("")
	const [inputListLetters, onInputListLetters] = useState([] as string[])
	const [restLetters, onRestLetters] = useState([] as string[])
	const [score, onScore] = useState(0)
	const [listRandomLetters, upLisyLetters] = useState([...selectRandomLetters()] as string[])
	const [animationCount, onAnimationCount] = useState(0)
	const [animationTimes, onAnimationTimes] = useState(0)

	useEffect(() => {
		inputEl?.current?.focus()
	})
	const repeatAnimation = () => {
		onAnimationTimes(() => animationTimes + 1)
		if (animationTimes % 11 === 0 && restLetters.length < 20) {
			let listArrLettersRandom = [...selectRandomLetters()]
			upLisyLetters(() => [...listArrLettersRandom])
			//run animtion
			onAnimationCount(() => animationCount + 1)
			//rest letetrs
			if (animationTimes !== 0) {
				findRestLetters()
			}
			//cleaning list of input letters
			onInputListLetters(() => [])
		} else if (restLetters.length >= 20) {
			onAnimationCount(() => 0)
		}
	}
	const findRestLetters = () => {
		const isRestLetters = listRandomLetters.filter((el) => !inputListLetters.includes(el))

		onRestLetters(() => [...restLetters, ...isRestLetters])
	}

	const onCountScore = (event: any) => {
		event.persist()
		const { value } = event.target
		console.log("event", event.target.value)
		let selectLetter: string = value[value.length - 1]
		onInputLetter(() => selectLetter.toUpperCase())
		onInputListLetters(() => [...inputListLetters, selectLetter.toUpperCase()])
		//seach letter on list of letters
		countScore(selectLetter, listRandomLetters)
	}

	const countScore = (letter: string, listLetrres: string[]) => {
		const findLetters = listLetrres.filter((el) => el === letter.toUpperCase())
		console.log("findLetters", findLetters)
		if (findLetters.length) {
			onScore(() => score + findLetters.length)
		}
	}

	return (
		<div className='main-page' onClick={() => inputEl?.current?.focus()}>
			<div className='letters'>
				{listRandomLetters.map((el) => {
					return (
						<div
							onAnimationEnd={() => repeatAnimation()}
							className='letter'
							style={{
								animationIterationCount: `${animationCount}`,
								fontSize: `${Math.floor(Math.random() * 60) + 20}px`,
								color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
							}}
						>
							{inputListLetters.includes(el) ? "" : el}
						</div>
					)
				})}
			</div>
			<div className='score'>
				<p className='title'>Score:</p>
				<p className='number'>{score}</p>
			</div>
			<div className='footer'>
				Remaining letters ({restLetters.length}):
				{restLetters.map((el) => {
					return <div className='footer-div'>{el}</div>
				})}
			</div>
			<div className='inpt-none'>
				<input ref={inputEl} type='text' onChange={onCountScore} value={inputLetter}></input>
			</div>
		</div>
	)
}
