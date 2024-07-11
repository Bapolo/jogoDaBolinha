window.onload = () =>
{
    const canvas = document.querySelector("#canvas")
    const contexto = canvas.getContext("2d") 

    const larguraDoCanvas = canvas.width
    const alturaDoCanvas = canvas.height
    const xStart = 0
    const yStart = 0
    const bolinhas = []
    let tempoDeFabricacaoDeBolinhas = 1000
    let numeroDeBolinhasRemovidas = 0

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('load', checkOrientation);

    function checkOrientation() {
        const message = document.getElementById('rotate-message');
        
        if (window.innerWidth > window.innerHeight) {
            // Modo paisagem
            message.style.display = 'none';
            canvas.style.display = 'block';
        } else {
            // Modo retrato
            message.style.display = 'block';
            canvas.style.display = 'none';
        }
    }
 

    class Bolinha 
    {
        constructor()
        {
            this.raioDoCirculo = 20
            this.corDePreenchimento = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
            this.corDaBorda = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
            this.posicaoXDoCirculo = Math.round(Math.random() * 560 + this.raioDoCirculo)
            this.posicaoYDoCirculo = Math.round(Math.random() * 360 + this.raioDoCirculo)
        }    
        
        getRaioDoCirculo()
        {
            return this.raioDoCirculo
        }
        
        getCorDePreenchimento()
        {
            return this.corDePreenchimento
        }

        getCorDaBorda()
        {
            return this.corDaBorda
        }

        getPosicaoXDoCirculo()
        {
            return this.posicaoXDoCirculo 
        }

        getPosicaoYDoCirculo()
        {
            return this.posicaoYDoCirculo 
        }

    }   

    const desenhar = () =>
    {
       bolinhas.forEach((bolinha) => 
        {
            contexto.beginPath()
            contexto.fillStyle = bolinha.corDePreenchimento
            contexto.strokeStyle = bolinha.corDaBorda 
            contexto.arc(bolinha.posicaoXDoCirculo, bolinha.posicaoYDoCirculo, bolinha.raioDoCirculo, 0, 2 * Math.PI)
            contexto.fill()
            contexto.stroke()
        })  
    }

    setInterval(() =>
    {
        fabricarBolinhas()
        console.log(bolinhas.length)
        desenhar()
    }, tempoDeFabricacaoDeBolinhas)
       
    canvas.addEventListener("click", (event) =>
    {
        main()   
    }) 

    canvas.addEventListener("touchstart", (event) =>
    {
        main()
    })

    function main()
    {
        bolinhas.forEach((bolinha, indice) => 
            {
                const retangulo = canvas.getBoundingClientRect()
                const posicaoXDoMouse = event.clientX - retangulo.left
                const posicaoYDoMouse = event.clientY - retangulo.top
    
                const distanciaX = posicaoXDoMouse - bolinha.getPosicaoXDoCirculo()
                const distanciaY = posicaoYDoMouse - bolinha.getPosicaoYDoCirculo()
                const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY)
    
                if (distancia <= bolinha.getRaioDoCirculo())
                {
                    console.log("Clique dentro do circulo " + indice)
                    removerBolinha(indice)
                    numeroDeBolinhasRemovidas++
                    console.log(bolinhas.length)
                    apagarBolinha()
                    desenhar(bolinhas)
                }
            })
    
            if (numeroDeBolinhasRemovidas % 10 === 0)
            {
                tempoDeFabricacaoDeBolinhas *= 0.8
            } 
    }

    function fabricarBolinhas()
    {
        bolinhas.push(new Bolinha())
    }

    function removerBolinha(indice)
    {
        return (
            bolinhas.splice(indice, 1)
        )
    }

    function apagarBolinha()
    {
        return contexto.clearRect(xStart, yStart, canvas.width, canvas.height)
    }



}