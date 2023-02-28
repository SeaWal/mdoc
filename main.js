const {app, BrowserWindow, Menu } = require("electron");
const  path  = require("path");


// create main window
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title : "mdoc",
        width : 500,
        height : 500
    });

    // override app menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadFile(path.join(__dirname, './render/index.html'));
}


// launch app when ready
app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        }
    });
});

// override window menu
const menuTemplate = [
    {
        label : 'File',
        submenu : [
            {
                label : "Quit",
                click : () => app.quit(),
                accelerator : "Cmd+Q"
            }
        ]
    }
]

// when closing
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
})