const apiUrl = 'http://localhost:3000/'

new Vue({
	el: '#app',
	data: {
		vueHello: 'Vue.js Ready',
		nodeHello: ''
	},
	mounted() {
		axios(apiUrl + 'greetings')
			.then(({ data }) => (this.nodeHello = data.message))
			.catch((err) => console.log(err))
	}
})
