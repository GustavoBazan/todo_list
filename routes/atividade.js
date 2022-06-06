const atividades = require('../models/atividades')

module.exports = (app)=>{
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

        //buscar todas as atividades desse usuário
        var buscar = await atividades.find({usuario:dados.id})
        console.log(buscar)
        res.render('atividades.ejs',{id:dados.id,nome:dados.nome,dados:buscar})
    })

    //excluir atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({_id:id})
        //voltar para a página atividades
        //res.render('atividades.ejs',{id:dados.id,nome:dados.nome,dados:buscar})
        res.send("Atividade Excluída!!")
    })
}