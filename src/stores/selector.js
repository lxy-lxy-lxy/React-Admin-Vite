import {pick} from 'lodash-es';
import {useRef} from 'react';
import {shallow} from 'zustand/shallow';

export const useSelector = (paths) => {
        const prev = useRef({})
        return (state) => {
                if (state) {
                        const next = pick(state, paths);
                        return shallow(prev.current, next) ? prev.current : (prev.current = next);
                }
                return prev.current;
        };
}