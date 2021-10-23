import {registerSettings, setSetting, getSetting} from "./Setting.js";
import SaveSlotApp from "./apps/saveSlotApp.js";
import SaveSlotAppManager from "./apps/saveSlotManager.js";

Hooks.on('init', () => registerSettings());
let currentSceneData;

const getSceneData = (entityData) => {
    const newEntityData = JSON.parse(JSON.stringify(entityData._getSubmitData()));
    delete newEntityData._id;
    delete newEntityData.name;
    delete newEntityData['initial.x'];
    delete newEntityData['initial.y'];
    delete newEntityData['initial.scale'];
    return newEntityData;
}

const saveSceneData = (entityData) => async () => {
    await setSetting(getSceneData(entityData), 'defaultSettings');
    ui.notifications.info('Default scene configurations saved');
}

const createNewButton = (sceneSave, html) => {
    let saveAsDefaultButton = $('<button type="button" name="submit2">Save as default</button>');
    saveAsDefaultButton.on('click', sceneSave)

    let saveToSaveSlot = $('<button type="button" name="submit3">Save Config</button>');
    saveToSaveSlot.on('click', () => {
        new SaveSlotApp(getSceneData(html)).render(true)
    });

    return [saveAsDefaultButton, saveToSaveSlot];
}

const remakeButtonsStructure = (sceneSave, html) => {
    let newButtonStructure = $('<div class="form-group"></div>');
    newButtonStructure.append($('button[name="submit"]'), ...createNewButton(sceneSave, html));

    return newButtonStructure;
}

const getButtonLocation = ($form) => $form.children('section').children();

const isADefaultSaved = () => !!getSetting('defaultSettings');

const updateSceneData = (sceneData) => {
    const savedData = {
        ...JSON.parse(JSON.stringify(sceneData.data)),
        ...getSetting('defaultSettings')
    };
    sceneData.update(savedData);
}

const createSaveSlotsManager = (html, $form) => {
    const saveSlotsManagerButton = $(`<a class="header-button">Saved Configs Manager</a>`);
    saveSlotsManagerButton.on('click', () => {
        new SaveSlotAppManager(html).render(true)
    })
    $form.find('.header-button.close').before(saveSlotsManagerButton)
}

Hooks.on('renderSceneConfig', async (html, $form) => {
    currentSceneData = getSceneData(html)
    const sceneSave = saveSceneData(html);
    const buttonStructure = remakeButtonsStructure(sceneSave, html);

    getButtonLocation($form).append(buttonStructure);
    createSaveSlotsManager(html, $form)
})

Hooks.on('createScene', (scenedata) => {
    if (isADefaultSaved()) updateSceneData(scenedata);
})
