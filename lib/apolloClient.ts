import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export function createApolloClient() {
    let gql_uri = "http://localhost:3000/graphql";
    if (process.env.NODE_ENV === "production") {
        if (typeof window !== 'undefined') {
            gql_uri = `https://${window.location.host}/graphql`;
        }
    }
    'https://josns.net/graphql'
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: gql_uri, // 서버 URL (상대 주소가 아닌 절대 주소를 써야한다.)
            fetch, // `credentials`나 `headers`같은 추가적 fetch() 옵션
        }),
        cache: new InMemoryCache()
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