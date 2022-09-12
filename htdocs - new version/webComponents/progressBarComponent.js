class progressBar extends HTMLElement {
    constructor() {
        
        super();
        const shadow = this.attachShadow({ mode: 'open'});
        const position = this.getAttribute('position');
        const size = this.getAttribute('size');
        let barra = document.createElement('div');
        let barraInterna = document.createElement('div');
        barra.setAttribute("class","barra");
        barra.appendChild(barraInterna);

        // Create some CSS to apply to the shadow DOM
        let style = document.createElement('style');
        barra.setAttribute('style', 'width='+size);
        style.textContent = `
        .barra{
            width: 900px;
            height: 30px;
            border-radius: 10px;
            background-color: #DCDCDC;
            margin-bottom: 30px;
        }
        
        .barra div{
            height: 100%;
            width: var(--porcentagem);
            border-radius: 10px;
            background-color: #00BFFF;
        }`;
        shadow.appendChild(style);
        shadow.appendChild(barra);
    }
    alteraProgresso(progresso){
        console.log("Deu boa");
    }
}

customElements.define('progress-bar', progressBar);



