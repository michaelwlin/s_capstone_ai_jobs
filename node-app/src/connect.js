import { MongoClient, ServerApiVersion } from 'mongodb'

export async function connectToDB(uri) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()

    console.log('Connected successfully to MongoDB server')
    
    return client;

  } catch (error) {
    console.log('Connection to MongoDB atlas failed', error)
    process.close()
  }
}
