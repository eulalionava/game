new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        mosterHealth:100,
        gameRunning:false,
        turns:[]
    },
    methods:{
        iniciarJuego: function(){
            this.gameRunning = true;
            this.playerHealth = 100;
            this.mosterHealth = 100;
        },
        //Realiza un ataque
        atake: function(){
            var danio = this.calcularAtaque(3,10);
            this.mosterHealth -= danio;
            //Lo agrega a la lista
            this.turns.unshift({
                isPlayer:true,
                text:'Jugador jolpea a moustro por ' + danio
            })

            if( this.checkWin() ){
                return;
            }
            //verifica si has ganado
            if(this.mosterHealth <= 0){
                alert("Has Ganado");
                this.gameRunning = false;
                return;
            }
            //Ataca el moustro
            this.monsterAtack();
        },
        //Ambos se realizan un ataque especial
        atakeSpecial: function(){
            this.mosterHealth -= this.calcularAtaque(10,20);
            //Verifica quien a ganado
            if(this.checkWin()){
                return;
            }
            //Realiza un ataque
            this.monsterAtack();
        },
        //Aunmenta el porcentaje de vida
        sanar: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.monsterAtack();
        },
        //Cancela el juego
        rendirse: function(){
            this.gameRunning = false;
        },
        //Funcion que calcular el ataque del moustro
        monsterAtack:function(){
            var danio = this.calcularAtaque(5,12);
            this.playerHealth -= danio;
            this.checkWin();

            this.turns.unshift({
                isPlayer:false,
                text:'Moustro jolpea a jugador por ' + danio
            });
        },
        //funcion que calcula el ataque
        calcularAtaque : function(Min,Max){
            return Math.max(Math.floor(Math.random() * Max) + 1 , Min);
        },
        //funcion que ontiene el ganador
        checkWin : function(){
            if(this.mosterHealth <= 0){
                if(confirm("Has Ganado ! Nuevo Juego")){
                    //Reinicia el juego
                    this.iniciarJuego();
                }else{
                    //Cancela el juego
                    this.gameRunning= false;
                }
                return true;
            }else if(this.playerHealth <= 0 ){
                if(confirm("Has Perdido ! Nuevo Juego")){
                    this.iniciarJuego();
                }else{
                    this.gameRunning= false;
                }
                return true;
            }
            return false;
        }
    }
});