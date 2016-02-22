
import m from 'mithril';
import list from 'polythene/list/list';
import listTile from 'polythene/list-tile/list-tile';

import btn from 'polythene/button/button';
import dialog from 'polythene/dialog/dialog';

import Book from './models/book'


import headerPanel from 'polythene/header-panel/header-panel';

const listGenerator = (book) => {
    return m.component(list, {
        header: {
            title: book.name()
        }
    })
}

const HomeComponent = {
    vm: {
        books: m.prop([])
    },
    controller: () => {
        m.request({
          method: "GET",
          url: "/books.json",
          type: Book
        }).then((got) =>
          HomeComponent.vm.books(got)
        )
        return HomeComponent
    },
    view: (ctrl) => {
        return [
            m.component(dialog),
            ctrl.vm.books().map((book) => { return listGenerator(book) }),
            m.component(btn, {
                label: 'Button',
                raised: true,
                events: {
                    onclick: () => {
                        const dialogOptions = {
                            body: 'カツオを追加しますか？',
                            footer: m.component(btn, {
                                label: '追加',
                                raised: true,
                                events: {
                                    onclick: () => {
                                        m.request({
                                            method: "POST",
                                            url: "/books.json",
                                            type: Book,
                                            data: {
                                                book: {
                                                    name: "カツオ",
                                                }
                                            }
                                        }).then((got) =>
                                            m.route("/")
                                        )
                                    }
                                }
                            }),
                            // modal: true,
                            // backdrop: true
                        };
                        dialog.show(dialogOptions)
                    }
                }
            })
        ]
    },
}


m.route(document.body, "/", {
    "/": HomeComponent,
});

