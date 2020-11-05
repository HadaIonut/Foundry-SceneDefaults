import {registerSettings, setSetting} from "./Setting.js";

Hooks.on('init', () => {
    registerSettings();

})

const saveSceneData = (entityData) => async () => {
    delete entityData._id;
    delete entityData.name;
    await setSetting(entityData, 'defaultSettings');
}

const createNewButton = (sceneSave) => {
    let button = $('<button>Save as default</button>');
    button.on('click', sceneSave)
    return button;
}

const remakeButtonsStructure = (sceneSave) => {
    let newButtonStructure = $('<div class="form-group"></div>');
    newButtonStructure.append($('button[name ="submit"]'), createNewButton(sceneSave));

    return newButtonStructure;
}

const getButtonLocation = ($form) => $form.children('section').children()

Hooks.on('renderSceneConfig', async (html, $form, formData) => {
    const sceneSave = saveSceneData(formData.entity);
    const buttonStructure = remakeButtonsStructure(sceneSave);

    getButtonLocation($form).append(buttonStructure);
    console.log(html, $form);
})
