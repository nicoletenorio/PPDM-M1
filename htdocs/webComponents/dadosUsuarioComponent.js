class dadosUsuario extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open'});
        const position = this.getAttribute('position');
        const size = this.getAttribute('size');

        let informacao = document.createElement('div');
        
        //Visualização usuário
        let usuario = document.createElement('p');
        usuario.innerText = "Olá " + window.localStorage.getItem('usuario');

        //Visualização quantidade total de agua
        let aguaTotal = document.createElement('p');
        let aguaTotalStorage = 'Seu consumo total de agua diário deve ser ' + window.localStorage.getItem('quantidadeTotalAgua') + ' ml';
        aguaTotal.innerText = aguaTotalStorage;

        //Visualização quantidade agua por vez
        let aguaPorVez = document.createElement('p');
        let aguaPorVezStorage = 'Você precisa beber por vez ' + window.localStorage.getItem('quantidadeAguaPorHora') + ' ml';
        aguaPorVez.innerText = aguaPorVezStorage;

        informacao.appendChild(usuario);
        informacao.appendChild(aguaTotal);
        informacao.appendChild(aguaPorVez);
        shadow.appendChild(informacao);
    }
}
customElements.define('dados-usuario', dadosUsuario);