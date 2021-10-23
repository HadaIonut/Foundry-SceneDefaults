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
    },
    {
        key: 'saveSlots',
        data: {
            type: Object,
            scope: "world",
            config: false,
            restricted: true,
            default: {},
        }
    },
]

const registerSetting = (setting) => game?.settings?.register(moduleName, setting.key, setting.data);

const registerSettings = () => SETTINGS.forEach(registerSetting);

const getSetting = (settingKey) => game?.settings?.get(moduleName, settingKey);

const setSetting = async (dataToSave, dataKey) => await game?.settings?.set(moduleName, dataKey, dataToSave);

export {registerSettings, setSetting, getSetting};
