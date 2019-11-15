class Animal {
    name () {
        return 'Animal'
    }
    say () {
        return `I am ${this.name}`
    }
}

class Dog extends Animal {
    food = '123';
    name () {
        return 'Dog'
    }
}

console.log(new Dog() instanceof Animal)