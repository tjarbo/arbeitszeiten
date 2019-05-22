export class FormAdapter {
    constructor(socket) {
        console.info("[FormAdapter] init")
        this.socket = socket
        this.abruf = {
            yes: $("#app_item_abruf_yes_button"),
            no: $("#app_item_abruf_no_button")
        }
        this.input = {
            date: $("#app_item_date_input"),
            time: $("#app_item_time_input")
        }
    }

    toggleAbruf() {
        console.log("[FormAdapter] toggleAbruf()")
        if (this.abruf.yes.hasClass("is-danger")) {
            this.abruf.no.addClass("is-success")
            this.abruf.yes.removeClass("is-danger")
        } else {
            this.abruf.no.removeClass("is-success")
            this.abruf.yes.addClass("is-danger")
        }
    }

    catchItem() {
        return this.check() ? {
            date: this.input.date.val(),
            time: this.input.time.val(),
            abruf: this.abruf.yes.hasClass("is-danger")
        } : null
    }

    check() {
        this.input.date.val() != "" ? this.input.date.removeClass("is-danger") : this.input.date.addClass("is-danger")
        this.input.time.val() != "" ? this.input.time.removeClass("is-danger") : this.input.time.addClass("is-danger")

        return (this.input.date.val() != "" && this.input.time.val() != "")
    }
}