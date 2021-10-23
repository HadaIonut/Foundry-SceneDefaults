import {getSetting, setSetting} from "../Setting.js";

export default class SaveSlotApp extends FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "save-slot-window",
            template: "modules/sceneDefaults/templates/saveSlotApp.hbs",
            resizable: false,
            minimizable: false,
            submitOnClose: false,
            closeOnSubmit: false,
            title: "Saved Configs",
        }
    }

    constructor(CurrentData) {
        super();
        this.currentData = CurrentData
    }

    getData(options) {
        return {
            saveSlots: Object.keys(getSetting('saveSlots')),
            currentData: JSON.stringify(this.currentData, (key, value) => (value || ''), 4).replace(/"([^"]+)":/g, '$1:')
        }
    }

    async _updateObject(event, formData) {
        if (formData.saveSlotName === '') {
            ui.notifications.error('Save config name cannot be empty')
            return;
        } else if (formData.saveSlotName === 'default') {
            ui.notifications.error('Save config name cannot be "default"')
            return;
        }

        const updatedSaveSlots = {
            ...getSetting('saveSlots'),
            [formData.saveSlotName]: this.currentData
        }
        await setSetting(updatedSaveSlots, 'saveSlots');
        this.close();
    }

    activateListeners(html) {
        html.find('#saves').on('change', (...args) => {
            html.find('#saveSlotName').val($(args[0].target).val())
        })
    }
}
