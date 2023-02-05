const person = {
    name: 'John',
    surname: 'Doe',
    age: 40,
    isAdult: true,
  };
  
  class Person {
    constructor(name, surname, age, isAdult) {
      this.name = name;
      this.surname = surname;
      this.age = age;
      this.isAdult = isAdult;
    }
  
    fullName() {
      return `my full name is ${this.name} ${this.surname}`;
    }
  
    surnameLength() {
      return this.surname.length;
    }
  }
  
  const firstPerson = new Person('John', 'Crosssfadfdgdgad', 40, true);
  
  console.log(firstPerson.surnameLength());
  
  class PersonWithJob extends Person {
    constructor(name, surname, age, isAdult, job) {
      super(name, surname, age, isAdult);
      this.job = job;
    }
  }
  
  const secondPerson = new PersonWithJob('Carlo', 'Smith', 30, true, 'Student');
  
  console.log(secondPerson)