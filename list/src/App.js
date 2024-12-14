import styles from './app.module.css'
import { useState } from 'react'

function App() {
	const [value, setValue] = useState('')
	const [list, setList] = useState([])
	const [error, setError] = useState('')
	const isValueValid = value.length < 3 ? false : true
	const isListEmpty = list.length > 0 ? false : true

	function onInputButtonClick() {
		const promptValue = prompt('Введите значение')

		if(promptValue.length < 3) {
			setError('Значение не должно содержать менее 3 символов')
		} else {
			setValue(promptValue)
			setError('')
		}
	}

	function onAddButtonClick() {
		if(isValueValid) {
			const id = Date.now()
			const date = new Date(Date.now()).toLocaleString('RU')
			setList(list => [...list, {id, value, date}])
			setValue('')
			setError('')
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{(error !== '') && <div className={styles.error}>
				{error}
			</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
				<button className={styles.button} disabled={!isValueValid} onClick={onAddButtonClick}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{isListEmpty && <p className={styles['no-margin-text']}>Нет добавленных элементов</p>}
				{!isListEmpty && <ul className={styles.list}>
					{list.map(({id, value, date}) => <li className={styles['list-item']} key={id}>{value} {date}</li>)}
				</ul>}
			</div>
		</div>
	)
}

export default App
