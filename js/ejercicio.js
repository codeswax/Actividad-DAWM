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
                const writerTemplate = `<option value="${id}">${name}</option>`
                document.querySelector('select').innerHTML += writerTemplate
            }
            phrasesUpdate(writers)
        })
        .catch(console.error)
}

let phrasesUpdate = (writers) => {
    let selectedWriter = document.querySelector('select')
    selectedWriter.addEventListener('change', event => {
        document.querySelector('#frases').innerHTML = null
        fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
            .then(response => response.json())
            .then(data => {
                Array.from(writers)
                    .filter(writer => event.target.value == writer.querySelector('id').textContent)
                    .forEach(writer => {
                        let name = writer.querySelector('nombre').textContent;
                        data.frases
                            .filter(phrase => phrase.id_autor == event.target.value)
                            .forEach(phrase => {
                                const phrasesTemplate =
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
                            })
                    })
                })
            })
        }


window.addEventListener('DOMContentLoaded', (event) => {
    loadData()
});