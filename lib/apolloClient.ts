import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql', // 서버 URL (상대 주소가 아닌 절대 주소를 써야한다.)
            credentials: 'same-origin', // `credentials`나 `headers`같은 추가적 fetch() 옵션
        }),
        cache: new InMemoryCache(),
    })
}

export const getApolloClient = () => {
    return new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `http://localhost:3000/graphql`,
            fetch,
        }),
    });
};