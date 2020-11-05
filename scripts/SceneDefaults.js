import {registerSettings, setSetting} from "./Setting.js";

Hooks.on('init', () => {
    registerSettings();

})

Hooks.on('ready', async ()=>{
    const defaultData = await SocketInterface.dispatch("modifyDocument", {
        type: "Scene",
        action: "create",
        data: [{folder: undefined, name: "ceapa", type: "base"}],
        options: {temporary: true, renderSheet: false}
    });
    await setSetting(defaultData.result[0],'defaultSettings');
})
