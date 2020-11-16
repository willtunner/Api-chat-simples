// Importa o express
var express = require("express");
// Instancia o express na vareaver app
var app = express();
// Cria o protocolo http passando o app
var http = require("http").createServer(app);
// Express e socket io precisa está rodando no mesmo servidor http
var io = require("socket.io")(http);
// Diz que view engine vai ser o ejs

// Abre o evento de conexão
// socket == cliente
io.on("connection", (socket)=>{

    // Para quando desconectar
    socket.on("disconnect", () => {
        console.log("x desconectou: " + socket.id);
    });

    // Pega dado que vem do front end com a tag msg
    socket.on("msg", (data) =>{
        // Envia a mensagem para o frontend

        // emite somente para a pessoa que enviou msg
        //socket.emit("showmsg", data);

        // io: emite para todo meu servidor, assim quando entrar em outra aba outros veem a msg
        io.emit("showmsg", data);
        console.log(data);
    });
});





app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render("index");
});

// Como o express está usando o servidor nativo do node muda para http
http.listen(3000, ()=> {
    console.log("app rodando");
});