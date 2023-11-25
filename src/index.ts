import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const busca_na_api = fetch('https://api.entrego.app/entregadores')
const dados = await busca_na_api
const EntregadoresData: any = await dados.json()

const Server = new ApolloServer({
	typeDefs: `type Entregador {
	_id: ID
	email: String
	nome: String
	cpf: String
	cnh: String
	telefone: String
	expires: String
	createdAt: String
	updatedAt: String
	active: Boolean
}

type Query {
	entregadores: [Entregador]
}`,
	resolvers: {
		Query: {
			entregadores(root, args, context, info) {
				return EntregadoresData
			},
		},
	},
})

const { url } = await startStandaloneServer(Server)

console.log('Server is ready in', url)
