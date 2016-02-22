import m from 'mithril'

class Book {
    constructor(book) {
        this.id   = m.prop(book.id)
        this.name = m.prop( book.name )
    }
}
export default Book
