/**
 * @description 工厂方法模式
 */

class Animal {
  createAnimal() {
    console.log("This is an animal.");
  }
}

class Dog extends Animal {
  createAnimal() {
    console.log("I am a dog.");
  }
}

class Cat extends Animal {
  createAnimal() {
    console.log("I am a cat.");
  }
}

class AnimalFactory {
  createAnimal(type) {
    switch (type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      default:
        throw new Error("Invalid animal type.");
    }
  }
}

const animalFactory = new AnimalFactory();
const dog = animalFactory.createAnimal("dog");
dog.createAnimal(); // 打印 "I am a dog."

const cat = animalFactory.createAnimal("cat");
cat.createAnimal(); // 打印 "I am a cat."
