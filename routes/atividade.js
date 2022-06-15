const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{

    app.get('/atividades',async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})

        //buscar todas as atividades desse usuário
        var abertas = await atividades.find({usuario:id, status:0}).sort({data:1})

        //buscar todas as atividades desse usuário
        var entregues = await atividades.find({usuario:id, status:1}).sort({data:1})

        //buscar todas as atividades desse usuário
        var excluidas = await atividades.find({usuario:id, status:2}).sort({data:1})
        
        //console.log(buscar)
        //res.render('atividades.ejs',{id:user._id,nome:user.nome,dados:abertas,dadose:entregues,dadosx:excluidas})
        res.render('atividades2.ejs',{id:user._id,nome:user.nome,dados:abertas,dadose:entregues,dadosx:excluidas})
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
        var excluir = await atividades.findOneAndUpdate({_id:id},{status:2})
        //redirecionar para a rota atividades
        res.redirect('/atividades?id=' + excluir.usuario)
    })

    //entrega atividades
    app.get("/entregue",async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var entregue = await atividades.findOneAndUpdate({_id:id},{status:1})
        //redirecionar para a rota atividades
        res.redirect('/atividades?id=' + entregue.usuario)
    })

    //desfazer ações
    app.get("/desfazer",async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var desfazer = await atividades.findOneAndUpdate({_id:id},{status:0})
        //redirecionar para a rota atividades
        res.redirect('/atividades?id=' + desfazer.usuario)
    })
}