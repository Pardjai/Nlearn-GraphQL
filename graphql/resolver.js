const Todo = require('../models/todo')

const users = [
    {name: 'Ilya', age: 19, email: 'IK@mail.com'},
    {name: 'Igor', age: 21, email: 'Igor@gmail.com'}
]

module.exports = {
    test(){
        return {
            count: Math.trunc(Math.random() * 10),
            users
        }
    },
    random({min, max, count}){
        const arr = []
        for (let i =  0; i < count; i++){
            const random = Math.random() * (max - min) + min
            arr.push(random)
        }
        return arr
    },
    addTestUser({name, email}){
        const age = Math.ceil(Math.random() * 30)
        const user = {
            name,
            email,
            age
        }
        users.push(user)
        return user
    },
    async getTodos(){
        try {
            return await Todo.findAll()
        } catch (e) {
            throw new Error("Failed Fetch")
        }
    },
    async addTodo({todo}){
        try {
            const newTodo = await Todo.create({
                title: todo.title,
                done: false,
            })
    
            return newTodo
        } catch (e) {
            throw e
        }
    },
    async completeTodo({id}){
        try {
            const todo = await Todo.findByPk(id)
            todo.done = true
            await todo.save()
            return todo
        } catch (e) {
            throw e
        }
    },
    async removeTodo({id}){
        try {
            const todos = await Todo.findAll({
                where: { id }
            }) // конструкция для отработки синтаксиса. "todos = findAll({ where: {} })" здесь можно заменить на "todo = findByPk()"
            const todo = todos[0] //нужно при findAll({...})
            await todo.destroy()
            return true
        } catch (e) {
            return false
        }
    }
}