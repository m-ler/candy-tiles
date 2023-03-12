export const getStorageValue = <T>(key: string, defaultValue: T) => {
	const savedValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
	return {
		savedValue,
		defaultValue,
		key,
	};
};

export const saveRecoilStateToStorage = <T>(
	savedValue: T,
	storageKey: string,
	setSelf: (param: T) => void,
	onSet: (param: (newValue: T) => void) => void,
) => {
	savedValue && setSelf(savedValue);
	onSet((newValue) => {
		localStorage.setItem(storageKey, JSON.stringify(newValue));
	});
};
