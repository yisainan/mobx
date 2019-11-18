import { observable, computed, autorun, when, reaction, action, runInAction } from "mobx";

// 2-1代码

// class Animal {
//     name () {
//         return 'Animal'
//     }
//     say () {
//         return `I am ${this.name}`
//     }
// }

// class Dog extends Animal {
//     food = '123';
//     name () {
//         return 'Dog'
//     }
// }

// console.log(new Dog() instanceof Animal)


// 2-2代码
// function log(target) {
//     const desc = Object.getOwnPropertyDescriptors(target.prototype)

//     for (const key of Object.keys(desc)) {
//         if (key === 'constructor') {
//             continue
//         }
//         const func = desc[key].value;

//         if ('function' === typeof func) {
//             Object.defineProperty(target.prototype, key,{
//                 value(...args){
//                     console.log('before ' + key)
//                     const ret = func.apply(this, args);
//                     console.log('after ' + key)

//                     return ret
//                 }
//             })
//         }
//     }
// }

// function readonly(target, key, descriptor){
//     descriptor.writable = false
// }

// function validate(target, key, descriptor){
//     const func = descriptor.value;
//     descriptor.value = function (...args) {
//         for (let num of args) {
//             if ('number' != typeof num) {
//                 throw new Error(`${num} is not a number`)
//             }
//         }
//         return func.apply(this, args)
//     }
// }

// @log // 类修饰器 
// class Numberic {
//     @readonly PI = 3.1415926; // 类属性成员修饰器

//     @validate // 类方法成员修饰器
//     add(...nums) {
//         return nums.reduce((p, n) => (p + n), 0)
//     }
// }

// new Numberic().add(1, 2) // 正确打印
// // new Numberic().PI = 100 // 控制台报错 Uncaught TypeError: Cannot assign to read only property 'PI' of object '#<Numberic>'
// new Numberic().add(1, 'x') // 控制台报错 index.js:55 Uncaught Error: x is not a number

// 3-1代码
// import {observable, isArrayLike} from  'mobx'

// array

// const arr = observable(['a', 'b', 'c'])
// console.log(arr, Array.isArray(arr), isArrayLike(arr))
// console.log(arr.pop(), arr.push('d'))
// console.log(arr[4]) // 越界

// object

// const obj = observable({a: 1, b: 1})
// console.log(obj)
// console.log(obj.a, obj.b)

// map

// const map = observable(new Map())
// console.log(map)
// map.set('a', 1)
// console.log(map.has('a'))
// map.delete('a')
// console.log(map.has('a'))

// observable.box
// var num = observable.box(20);
// var str = observable.box('hello');
// var bool = observable.box(true);

// console.log(num, str, bool)
// console.log(num.get(), str.get(), bool.get()) // 返回原始值

// num.set(50)
// str.set('world')
// bool.set(false)

// console.log(num.get(), str.get(), bool.get())

// 3-2代码

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;

    @computed get mixed() {
        return store.string + '/' + store.number
    }

    @action bar(){
        this.string = 'world'
        this.number = 30
    }
}

// computed
var store = new Store()

// var foo = computed(
//     function(){
//         return store.string + '/' + store.number
//     }
// )
// console.log(foo)
// console.log(foo.get())

// foo.observe(function (change) {
//     console.log(change)
// })

// store.string = 'world'
// store.number = 30

// autorun

// autorun(()=>{
//     // console.log(store.string + '/' + store.number) 
//     console.log(store.mixed) 
// })

// store.string = 'world'
// store.number = 30

// when
// when(()=>store.bool, ()=> console.log('it is true'))

// store.bool = true

// reaction
reaction(()=>[store.string, store.number], arr=> console.log(arr.join('@')))
// store.string = 'world'
// store.number = 30

// 3-3代码

// store.bar()

// var bar = store.bar
// bar()

runInAction('modify',()=>{
    store.string = 'world'
    store.number = 30
})