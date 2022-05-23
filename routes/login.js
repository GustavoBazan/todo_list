module.exports = (app)=>{
    //abrir a view login.ejs
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })

    //abrir a view atividades
    app.post('/login',(req,res)=>{
        res.render('atividades.ejs')
    })

    // abrir a view atividades
    app.post('/login',async(req,res)=>{
        // conectar comobanco de dados
        const conexao = require('../ config/database')()
        // importar a model usuários
        const usuarios = require('../models/usuarios')
        //procurar pelo endereço de email
        var procurar = await usuarios.findOne({email:body.email})
        if(!procurar){
            res.send('Email não cadastrado!!')
        }

        res.render('atividades.ejs')

})
}