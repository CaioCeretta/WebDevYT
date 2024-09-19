

import { PrismaClient } from '@prisma/client'

// We can use a log right here to understand what is actually happenning behind the scenes in prisma
// const prisma = new PrismaClient({ log: ["query"]})
const prisma = new PrismaClient()

async function main() {
  // await prisma.user.deleteMany()
  // const userC = await prisma.user.create({
  //   data: {
  //     name: 'Caio',
  //     email: 'caio@blub.com',
  //     age: 14,
  //     userPreference: {
  //       create: {
  //         emailUpdates: true
  //       }
  //     }
  //   },
  // })
  // include: {
  //   //   userPreference: true
  //   // },
  //   //In the this case, we can only use select or include, we cannot use both together
  //   select: {
  //     name: true,
  //     userPreference: {
  //       select: {
  //         id: true
  //       }
  //     }
  //   }

  // })

  // console.log(user)


  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Kyle',
  //       email: 'kyle@test.com',
  //       age: 32,

  //     },
  //     {
  //       name: 'Birb',
  //       email: 'birb@hurb.com',  // Add the email property here
  //       age: 27,
  //     },
  //   ],
  // });



  // Whenever we define an uniqueness constraint on a model, we can select it like this
  // const user = await prisma.user.findUnique( {
  //   where: {
  //     age_name: {
  //       age: 27,
  //       name: 'Caio'
  //     }
  //   }
  // })


  // console.log(user)
  //Self explanatory
  // const user = await prisma.user.findFirst({
  //   where: {
  //     name: 'Caio'
  //   }
  // })

  /*Here i'm saying that i want to get the name whenever the name is distinct, if we have two occasions of a name, it will
  return only instance of it */
  // const user = await prisma.user.findMany({
  //   where: {
  //     name: 'Caio'
  //   },
  //   distinct: ['name']
  // })

  /*It can also have multiple distinct values and other properties like skip, the value of skip is how many data it will
  skip, the take means that we are skipping the first and taking the next two*/

  // const user = await prisma.user.findMany({
  //   where: {
  //     name: 'Caio'
  //   },
  //   distinct: ['name', 'age'],
  //   orderBy: {
  //     age: 'asc'
  //   },
  //   skip: 1,
  //   take: 2
  // })

  /* Different types of where, we can say something like
  
  to find a user which not includes in the condition
  where: {
    name: {not: 'Caio'}
  }
  
  to find an array of the rows that the values that include in the condition
  
  where: {
    name: {in: ['Caio']}
  }
  
  the opposite
  
  where: {
    name: {notIn: ['Caio']}
  }
  
  size limiter
  where: {
    age: {lt: 13}
  }
  
  where: {
    age: {gt: 13}
  }
  
  where: {
    age: {gte: 13}
  }
  
  where: {
    age: {lte: 13}
  }
  
  Check whether the text contains in a piece of a value
  
    where: {
      email: { contains: '@blub' }
    }
  
  
  */

  // const user = await prisma.user.findMany({
  //   where: {
  //     email: { contains: '@blub' }
  //   }

  // })

  // const users = await prisma.user.findMany()

  /*This confition guarantees that the two conditions are going to be satisfied*

AND: [{ email: { startsWith: 'cai' } }, { name: 'Caio' }]
 
  One of the two satisfier
OR: [{ email: { startsWith: 'bliblub' } }, { name: 'Caio' }, {age: {gt: 12}}] 

Returns the ones that don't satisfy

      NOT: {
        name: { startsWith: 'Caio' }
      }
    }
*/

  /* Relationship queries
        where: {
        userPreference: {
          emailUpdates: true,
        }
      }
  
      where: {
        writtenPosts: {
          every: {
            createdAt: new Date()
          },
        }
      }
  
      If every single post that this person has written starts with test, if there is no posts linked to the users, it will
      return every user, because technically, all of their posts start with the title of test, because there isn't any
        where: {
        writtenPosts: {
          every: {
            title:  'test'
          },
        }
      }
    
        this would be for the case that no post match this title, and again it will return everything because there aren't
        any posts
        where: {
        writtenPosts: {
          none: {
            title:  'test'
          },
        }
      }

        This would return none because there aren't any posts that start with this title
        where: {
        writtenPosts: {
          some: {
            title:  'test'
          },
        }


        And the relationship filtering

        This returns all the posts which the author age is 27

         const user = await prisma.post.findMany({
          where: {
            author: {
              is: {
                age: 27
              }
            }
          }
        })

        isNot would also have a very predictable behavior


        /* Updating values 

        Updating one
        
        await prisma.user.update({
          where: {
            id: '658c2e63013bed8dcf0dc5dd'
          },
          data: {
            email: 'caio@blub3.com'
          }
        })    

        Updating Many

        await prisma.user.updateMany({
        where: {
          name: 'Caio'
        },
        data: {
          name: 'Jorge'
        }
})

      Updating value with additional information

      await prisma.user.update({
    where: {
      id: '658c2e63013bed8dcf0dc5dd'
    },
    data: {
      age: {
        decrement: 10
      }
    }

    Connect Existing relations


    We can use this connect inside the data to connect existing objects or we can use the disconnect to remove
    existing object
    await prisma.user.update({
    where: {
      id: '658c2e63013bed8dcf0dc5dd'
    },
    data: {
      userPreference: {
        connect: {
          id: '658d68f6546b93e10fb01865'
        }
      }
    }
    
    await prisma.user.update({
    where: {
      id: '658c2e63013bed8dcf0dc5dd'
    },
    data: {
      userPreference: {
        disconnect: true
      }
    }
    
    Delete operations:

    await prisma.user.delete({
    where: {
      id: '658c2eca224d8eb8eee5b987'
    }

    await prisma.user.deleteMany({
    where: {
      age: { gt: 12 }
    }
  })
  }

  */

  // const preference = await prisma.userPreference.create({
  //   data: {
  //     emailUpdates: true,

  //   }
  // })

  // console.log(preference)

  const user = await prisma.user.deleteMany({
    where: {
      age: { gt: 12 }
    }
  })


  console.log(user)

}

/* 
  This prisma client handles all our project database connections, so if we have 5 connections, this client would handle
  all of those actions for us, so it is really important that we use only one instance of this prisma client and not
  create a bunch of them, otherwise we can bug our database with too many connections
*/

main()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })