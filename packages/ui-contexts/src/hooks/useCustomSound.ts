import { useContext } from 'react';

import type { CustomSoundContextValue } from '../CustomSoundContext';
import { CustomSoundContext } from '../CustomSoundContext';

export const useCustomSound = (): CustomSoundContextValue => {
	const result = useContext(CustomSoundContext);
	if (result === undefined) {
		throw new Error('useCustomSound must be used within a CustomSoundContext');
	}
	return result;
};
