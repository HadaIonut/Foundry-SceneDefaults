import {getSetting, setSetting} from "../Setting.js";

export default class SaveSlotAppManager extends FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "save-slot-manager-window",
            template: "modules/sceneDefaults/templates/saveSlotManagerApp.hbs",
            resizable: false,
            minimizable: false,
            submitOnClose: false,
            closeOnSubmit: true,
            title: "Saved Configs Manager",
        }
    }

    constructor(scene) {
        super();
        this.scene = scene
    }

    getData(options) {
        return {
            saveSlots: Object.keys(getSetting('saveSlots')),
        }
    }

    async _updateObject(event, formData) {
        const saveSlotData = getSetting('saveSlots')[formData.saves];
        if (event.submitter.id === 'apply') {
            this.scene.object.update(saveSlotData)
        } else if (event.submitter.id === 'setDefault') {
            await setSetting(saveSlotData, 'defaultSettings')
        }
    }

    activateListeners(html) {
        html.find('#saves').on('change', (...args) => {
            html.find('#saveSlotData')[0].innerHTML = JSON.stringify(getSetting('saveSlots')[$(args[0].target).val()], (key, value) => (value || ''), 4).replace(/"([^"]+)":/g, '$1:')
        })
        html.find('#deleteSlot').on('click', async (...args) => {
            const selectedElement = html.find('#saves :selected');
            if (selectedElement.val() === 'default') return;

            const {[selectedElement.text()]: removed, ...newSetting} = getSetting('saveSlots');
            selectedElement.remove();
            html.find('#saveSlotData')[0].innerHTML = ''
            await setSetting(newSetting, 'saveSlots')
        })
    }
}
