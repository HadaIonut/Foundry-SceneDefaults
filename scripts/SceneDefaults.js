import {registerSettings, setSetting, getSetting} from "./Setting.js";

Hooks.on('init', () => registerSettings());

const getSceneData = (entityData) => {
    const newEntityData = JSON.parse(JSON.stringify(entityData._getSubmitData()));
    delete newEntityData._id;
    delete newEntityData.name;
    delete newEntityData['initial.x'];
    delete newEntityData['initial.y'];
    delete newEntityData['initial.scale'];
    return newEntityData;
}

const saveSceneData = (entityData) => async () => await setSetting(getSceneData (entityData), 'defaultSettings');

const createNewButton = (sceneSave) => {
    let button = $('<button  type="button" name="submit2">Save as default</button>');
    button.on('click', sceneSave)
    return button;
}

const remakeButtonsStructure = (sceneSave) => {
    let newButtonStructure = $('<div class="form-group"></div>');
    newButtonStructure.append($('button[name="submit"]'), createNewButton(sceneSave));

    return newButtonStructure;
}

const getButtonLocation = ($form) => $form.children('section').children();

const isADefaultSaved = () => !!getSetting('defaultSettings');

const updateSceneData = (sceneData) => {
    const savedSettings = getSetting('defaultSettings');
    Object.keys(savedSettings).forEach((savedDataKey)=> sceneData[savedDataKey] = savedSettings[savedDataKey])
}

Hooks.on('renderSceneConfig', async (html, $form) => {
    console.log()
    const sceneSave = saveSceneData(html);
    const buttonStructure = remakeButtonsStructure(sceneSave);

    getButtonLocation($form).append(buttonStructure);
})

Hooks.on('preCreateScene', (scenedata) => {
    if (isADefaultSaved()) updateSceneData(scenedata);
})
