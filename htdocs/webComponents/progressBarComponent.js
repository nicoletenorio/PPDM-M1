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
            width: 300px;
            height: 20px;
            border-radius: 10px;
            background-color: #a1bebb;
        }
        
        .barra div{
            height: 100%;
            width: var(--porcentagem);
            border-radius: 10px;
            background-color: #20a5fb;
        }`;
        shadow.appendChild(style);
        shadow.appendChild(barra);
    }
    alteraProgresso(progresso){
        console.log("Deu boa");
    }
}

customElements.define('progress-bar', progressBar);



