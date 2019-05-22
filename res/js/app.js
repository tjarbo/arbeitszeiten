import {SettingAdapter} from "./adapter/SettingAdapter.js"
import {TableAdapter} from "./adapter/TableAdapter.js"
import {FormAdapter} from "./adapter/FormAdapter.js"

class App {
    constructor() {
        console.info("[App] init")

        this.settingadapter = new SettingAdapter(this)
        this.tableadapter = new TableAdapter(this)
        this.formadapter = new FormAdapter(this)

        //this.generatedID = function() {return '_' + Math.random().toString(36).substr(2, 9);}
        this.items = []

        this.setupButtons()
    }

    setupButtons() {
        console.log("[App] setupButtons")

        // settings
        $("#app_settings_open_button").off().on("click", () => {this.settingadapter.load()})
        $("#app_settings_save_button").off().on("click", () => {this.settingadapter.save()})
        $("#app_settings_close_button").off().on("click",() => { this.settingadapter.load()})
        
        // form
        $("#app_item_abruf_yes_button").off().on("click", () => { this.formadapter.toggleAbruf()})
        $("#app_item_abruf_no_button" ).off().on("click", () => { this.formadapter.toggleAbruf()})
        $("#app_item_submit_button").off().on("click", () => { this.createNewItem(this.formadapter.catchItem())})

        // table
        $("#app_calendar_submit_button").off().on("click", () => { this.exportFile()})
    }

    createNewItem(item) {
        if (!item) {return}
        
        this.items.push(item)
        this.tableadapter.reload()
    }

    removeItem(item) {
        this.items = this.items.filter((it) => {return it != item})
        this.tableadapter.reload()
    }

    exportFile() {
        console.log("[App] exportFile")
        $("#app_calendar_submit_button").addClass("is-loading is-warning")

        var icsfile = ics();
        this.items.forEach(item => {
            item.title = this.settingadapter.current.app_settings_title || "Arbeiten"
            item.endTime = this.settingadapter.current.app_settings_endtime || "23:59"
            item.location = this.settingadapter.current.app_settings_location || ""
            item.description = this.settingadapter.current.app_settings_description || ""
 
            console.log("===> adding ", item)     
            icsfile.addEvent(item.title, item.description, item.location, item.date+"T"+item.time+":00", item.date+"T"+item.endTime+":00")
        });

        icsfile.download("arbeitszeiten_by_tjarbo")
        setTimeout(function() {
            $("#app_calendar_submit_button").removeClass("is-loading is-warning")
        }, 2000)
    }
}
const app = new App()
