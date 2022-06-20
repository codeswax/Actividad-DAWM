let loadData = () => {
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser()
            const xml = parser.parseFromString(data, "application/xml")
            let writers = xml.getElementsByTagName('escritor')
            for (let writer of writers) {
                let id = writer.querySelector('id').textContent
                let name = writer.querySelector('nombre').textContent
                let writerTemplate = `<option value="${id}">${name}</option>`
                document.querySelector('select').innerHTML += writerTemplate
            }
            let selectedWriter = document.querySelector('select')
            selectedWriter.addEventListener('change', event => {
                document.querySelector('#frases').innerHTML = ''
                fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
                    .then(response => response.json())
                    .then(data => {
                        for (let writer of writers) {
                            let name = writer.querySelector('nombre').textContent
                            let id = writer.querySelector('id').textContent
                            if (event.target.value == id) {
                                let phrases = data.frases
                                for (let phrase of phrases) {
                                    let writerId = phrase.id_autor
                                    if (writerId == event.target.value) {
                                        let phrasesTemplate = 
                                        `<div class="col-lg-3">
                                            <div class="test-inner ">
                                                <div class="test-author-thumb d-flex">
                                                    <div class="test-author-info">
                                                        <h4>${name}</h4>                                            
                                                    </div>
                                                </div>
                                                <span>${phrase.texto}</span>
                                                <i class="fa fa-quote-right"></i>
                                            </div>
                                        </div>`
                                        document.querySelector('#frases').innerHTML += phrasesTemplate
                                    }
                                }
                            }
                        }
                    })
            })
        })
        .catch(console.error)
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadData()
});