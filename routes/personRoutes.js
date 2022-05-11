const router = require('express').Router()

const Person = require('../models/Person')

//  Create
router.post('/', async (req, res) => {
  //req.body
  //{name: 'Felipe', salary:20, approved: false}
  const { name, salary, approved } = req.body
  const person = {
    name,
    salary,
    approved
  }
  if (!name){
    res.status(422).json({error: 'Campo name obrigatório'})
    return
  }

  try {
    //Criando dados
    await Person.create(person)

    res.status(201).json({message: 'Pessoa inserida com sucesso'})
  } catch (error) {
    res.status(500).json({erro:error})
  }

})

// Read
router.get('/', async (req,res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

router.get('/:id', async (req,res) => {
  const id = req.params.id
  try {
    const person = await Person.findOne({_id: id})
    if(!person){
      res.status(422).json({message: 'Usuário não encontrado'})
      return
    }
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

router.get('/findByName/:name', async (req,res) =>{
  const name = req.params.name
  try {
    const person = await Person.findOne({name: name})
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

//Update
router.patch('/:id', async (req,res) => {
  const id = req.params.id
  const {name, salary, approved} = req.body

  const person = {
    name, salary, approved
  }

  try {
    const  updatedPerson = await Person.updateOne({_id: id}, person)

    if(updatedPerson.matchedCount === 0 ){
      res.status(422).json({message: 'Usuário não encontrado'})
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).jsonO({error: error})
    
  }
})

//Delete
router.delete('/:id', async (req,res) => {
  const id = req.params.id
  const person = await Person.findOne({_id: id})

  if (!person){
    res.status(422).json({message: ' Usuários não encontrado'})
    return
  }

  try {
    await Person.deleteOne({_id: id})
    res.status(200).json({message: 'usuario deletado com sucesso!'})
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router