import {getSetting} from "./Setting.js";

export default class SceneConfig extends FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            title: 'SceneDefaults',
            id: 'scene-default',
            template: 'templates/scene/config.html',
            width: 680,

            submitOnChange: true,
            closeOnSubmit: false,
            submitOnClose: false,
        };
    }

    getData () {
        return {
            entity: getSetting('defaultSettings')
        }
    }

    async _updateObject(changeEvent, newData) {
        console.log(changeEvent);
        console.log(newData)
    }
}