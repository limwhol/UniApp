import Vue from "vue"
import Vuex from "vuex"
import system from "./modules/system"
import cars from "./modules/cars"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
	getters,
	modules:{
		system,
		cars
	}
})

export default store