const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{

    app.get('/atividades',async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})

        //buscar todas as atividades desse usuário
        var buscar = await atividades.find({usuario:id})
        //console.log(buscar)
        res.render('atividades.ejs',{id:user._id,nome:user.nome,dados:buscar})
    })

    app.post('/atividades',async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //exibindo no terminal
        //console.log(dados)
        //conectar com o database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            disciplina:dados.disciplina,
            usuario:dados.id 
        }).save()
        //redirecionar para a rota atividades
        res.redirect('/atividades?id=' + dados.id)
    })

    //excluir atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({_id:id})
        //voltar para a página atividades
        //redirecionar para a rota atividades
        res.redirect('/atividades?id=' + excluir.usuario)
    })
}