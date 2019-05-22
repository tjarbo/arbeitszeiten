export class TableAdapter {
    constructor(socket) {
        console.info("[TableAdapter] init")
        this.socket = socket
        this.table = {
            table: $('#app_table'),
            body: $('#app_table_body')
        }
        this.comment = $("#app_comment_no_item")
    }

    reload() {
        const items = this.socket.items

        if (items.length) {
            this.comment.addClass("is-hidden")
            this.table.table.removeClass("is-hidden")
        } else {
            this.comment.removeClass("is-hidden")
            this.table.table.addClass("is-hidden")
        }

        this.table.body.html("")
        items.forEach(item => {
            var tr = "<tr><td>" + item.date.split("-").reverse().join(".") + "</td><td>" + item.time + "</td>"
            tr += '<td><span class="tag is-danger ' + (item.abruf ? "" : "is-invisible") + '">Abruf</span></td>'
            tr += '<td><a class="delete"></a></td>'
            this.table.body.append(tr)
            $("td a").last().off().on("click", () => { this.socket.removeItem(item)})
        });
    }
}