export class SettingAdapter {
    constructor(socket) {
        console.info("[SettingAdapter] init")
        this.socket = socket
        this.modal_jq = $('.modal')
        this.current = JSON.parse(Cookies.get("settings") || "{}")
    }    

    save() {
        console.log("[SettingAdapter] save()")

        // load and save the current settingset
        var current = this.current
        $('[id^=app_settings]').each(function () {
            current[$(this).attr("id")] = $(this).val()
        })

        Cookies.set("settings", this.current)

        this.modal_jq.toggle();
    }

    load() {
        console.log("[SettingAdapter] load()")

        // reload the current settingset into modal
        for (const setting_item in this.current) {
            $(setting_item).val(this.current[setting_item])
        }

        this.modal_jq.toggle()
    }

}