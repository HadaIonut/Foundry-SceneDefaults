import SceneConfig from "./SceneConfig.js";

const moduleName = 'sceneDefaults'

const SETTINGS = [
    {
        key: 'defaultSettings',
        data: {
            type: Object,
            scope: "world",
            config: false,
            restricted: true,
            default: {},
        }
    }
]

const registerSetting = (setting) => game?.settings?.register(moduleName, setting.key, setting.data);

const registerSettings = () => {
    SETTINGS.forEach(registerSetting);
    registerSceneDefaults();
}

const registerMenu = (key, data) => game?.settings?.registerMenu(moduleName, key, data);

const registerSceneDefaults = () => {
    registerMenu(moduleName, {
        name: 'Scene default',
        label: 'Scene default',
        icon: 'fas fa-edit',
        type: SceneConfig,
        restricted: true,
    })
}

const getSetting = (settingKey) => game?.settings?.get(moduleName, settingKey);

const setSetting = async (dataToSave, dataKey) => await game?.settings?.set(moduleName, dataKey, dataToSave);

export {registerSettings, setSetting, getSetting, registerSceneDefaults};