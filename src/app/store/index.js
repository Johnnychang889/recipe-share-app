import { createStore } from 'vuex';
import login from './modules/login';
import dish from './modules/dish'; 

export default createStore({ 
	modules: {
		login,
		dish
	}
});
