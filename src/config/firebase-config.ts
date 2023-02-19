import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyABtshCP-Z86YgPa08LmPt7SRAYHzqbXZw',
	authDomain: 'candy-tiles.firebaseapp.com',
	projectId: 'candy-tiles',
	storageBucket: 'candy-tiles.appspot.com',
	messagingSenderId: '895399651860',
	appId: '1:895399651860:web:2fba76f1f40ecfc9ef9501',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
