// let myName = 'Caio'

// function printName() {
//   console.log(myName)
// }

// myName = "Alex"

// printName()

// myName = "Jorge"

// printName()



/*
  The whole js file is a scope, and the function is another scope, and every scope has access  to everything outside of
  its scope, so our function has an outer scope of our entire file, so it has access to everything inside the outer file
  
  And if we do something like, after we create the function, alter the name, it will print out the new value, and so it
  is not just taking the myName variable when the function is defined, which in this case, was 'Caio', it is actually
  taking the current value of myName.

  If, after calling the function, we change the name to something else, it is constantly changing the value based on its
  current one at the time the function is called, so its going with the most recent value of the variable.

*/

function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer variable ' + outerVariable)
    console.log('Inner variable ' + innerVariable)
  }
}

// const newFunction = outerFunction('outside')
//                     newFunction('inside')


/* Here is a more common use case when we talk about closures, we have a function called outerFunction and inside of it
we have another function called innerFunction

So we are calling outerFunction which returns us a new function called inner function, whilst keeping track of the outer
function parameter.


But one thing to keep in mind is, when we call the outerFunction, it runs and the outerVariable, which is the argument
that it receives is only available inside of it, in the innerFunction, and even though the function is done executing, as
the example below, we can see that on the
const newFunction2 = outerFunction()

nothing will be logged, and that's because we call the outerFunction, it executes all the code and then it's done executing
and the outerVariable is no longer accessible, for example, we can't log out the outerVariable if we try to.

But the inner function still has access to the outerVariable, even after its done being executed, because the outerVatriable
has gone out of scope, and that is where closures come in

What happens is that the innerFunction, is essentially saying: "Ok, i'm inside this outer function, it has this outerVariable
and i'm going to save this outerVariable and even that the function that defined this variable, is no longer executed
anymore, it's ok, i'm going to still keep track of that outer variable"




*/

// const newFunction2 = outerFunction('outside')
//                       newFunction2('inner')

//In this case, newFunction2 is the innerFunction, which got returned by the outerFunction call, other example is

function outerFunction2(outerVariable) {
  const outer2 = 'Hi'
  return function innerFunction(innerVariable) {
    console.log('Outer variable ' + outerVariable)
    console.log('Inner variable ' + innerVariable)
    console.log('Outer 2 ' + outer2)
  }
}

const newFunction3 = outerFunction2('outside')
newFunction3('inner')

/*We can see that the outer2 inside the scope that's outside the innerFunction, is still available to the inner function
meaning that whatever is on the outerscope is still available to the inner one
*/

function outerFunction3(url) {
  fetch(url).then(() => {
    console.log(url)
    //Here, for example, we would have access to our outer variable
  })
}