import { render } from 'preact'
import { useSignal } from '@preact/signals'
import { css } from './styling';

const classes = css({
	headingExample: {
		fontFamily: 'Times New Roman',
		fontWeight: 'bold',
		color: 'rgb(212 102 255)',
	}
})

function App() {

	const count = useSignal(0);

	return (
		<main class="vh-100 vw-100 d-flex justify-content-center align-items-center flex-column">
			<h1 class={classes.headingExample}>Hello World</h1>
			<button class="btn btn-sm btn-primary" onClick={() => count.value++}>Count {count.value}</button>
		</main>
	)
}

render(<App />, document.body)