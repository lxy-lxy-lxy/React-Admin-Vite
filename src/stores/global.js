import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createSelectors} from '@stores/createSelector';
import {devtools, persist, subscribeWithSelector} from 'zustand/middleware';
import {isMobile} from '@utils/utils';

const initThemeConfig = {
        mode: "light",
        collapsed: false,
        colorPrimary: "#1677ff",
        menuExtend: 0,
        tagStatus: 1,
        tagStyle: "card",
}

const createGlobalStore = immer(
        (set) => ({
                themeConfig: {...initThemeConfig},
                deviceInfo: {isPhone: isMobile()},
                userConfig: {},
                setThemeConfig: (color) => set((state) => {
                        state.themeConfig = {...state.themeConfig, ...color}
                }),
                clearThemeConfig:  () => set((state) => {
                        state.themeConfig = {...initThemeConfig}
                }),
                setDeviceInfo: (payload) => set((state) => {
                        state.deviceInfo = {
                                ...state.deviceInfo,
                                ...payload
                        }
                }),
                setUserConfig: (key, value) => set((state) => {
                        if (state.userConfig[key]) {
                                Object.keys(value).forEach(item => {
                                        state.userConfig[key][item] = value[item]
                                })
                        } else {
                                state.userConfig[key] = value
                        }
                })
        })
)

const useGlobalStore = createSelectors(
        create()(
                immer(
                        devtools(
                                subscribeWithSelector(
                                        persist(createGlobalStore, {
                                                name: 'globalStore'
                                        })
                                ),
                                {
                                        enabled: true,
                                        name: 'globalStore'
                                }
                        )
                )
        )
);

export default useGlobalStore