/* This element type on the angle brackets is a generic, which means that the type can be anyhing we want, now the function
if we inspect the firstNum and the firstString call, it is replacing the element type with numbers and strings respectively */


function getFirstElement<ElementType>(array: ElementType[]) {
  return array[0]
}


const numbers = [1, 2, 3]
const firstNum = getFirstElement(numbers)


const strings = ['sadas', 'dsabda']
const firstString = getFirstElement(strings)


const input = document.querySelector('.input');


/* Here it is infering that the input type is whether Element | null, it does not know it is talking about an input element


So as we can see hovering up the querySelector, we can see that it is a generic, being querySelector<Element> so we can
pass the generic type to it, like this */


const input2 = document.querySelector<HTMLInputElement>('.input')


// and now it will now that we are talking about an input element and allow us to use the .value or any other property it has


const a = [1, 2, 3]


a.map(() => { return 'dsdsada' })


/* When we hover over map we can see tht it is a genering and already knows we are talking about a number array  and it also
infers the return, so we can see that it has a generic of string as a return */


const map = new Map<string, number>()
//This will infer that the map constructor is of type <string, number> bu in the other hand, we say like this
const map2 = new Map([['dsdasdas', 3]])
//It will also know and infer that type of the Mao is string, numbe


//If we want to have a map where the string is the value


//This shows that we can pass generics into generics as complicated as we want
const map3 = new Map<string, Map<string, number>>()

// ______________________________________________________________________________

type ApiResponse<Data> = {
  data: Data,
  isError: boolean
}

const response: ApiResponse<{name: string, age: number}> = {
  data: {
    name: 'Caio',
    age: 27
  },
  isError: false
}

// or

type UserResponse = ApiResponse<{name: string, age: number}>
/* This creates an alias for that ApiResponse type, where i'm determining the Data generic, it allows us to create another
type from it */
type BlogResponse = ApiResponse<{title: string}>


const userResponse: UserResponse = {
  data: {
    name: 'Kyle',
    age: 27
  },
  isError: false
}

const responseBlog: BlogResponse = {
  data: {
    title: 'babarabupi'
  },
  isError: false
}

// Or in another case it could be like this

type ApiResponse2<Data = {status: number}> = {
  data: Data,
  isError: boolean
}

// Or even combine with a default value
type ApiResponse3<Data extends object = { status: number }> = {
  data: Data,
  isError: boolean
}

//That way, we don't need to specify the generic, it is using the default Data type being an object with a status: number

const response2: ApiResponse2 = {
  data: {
    status: 10
  },
  isError: false
}

//Or we can override that default generic

const response3: ApiResponse2<{name: string}> = {
  data: {
    name: 'babarabupi'
  },
  isError: false
}

// Or we can just specify the type of the property like this, not being an object

const response4: ApiResponse2<string> = {
  data: 'test',
  isError: false
}


// third type example
const response5: ApiResponse3 = {
  data: {
    status: 200
  },
  isError: false
}