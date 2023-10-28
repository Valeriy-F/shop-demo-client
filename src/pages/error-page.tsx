import Error, { TErrorProps } from 'components/error';
import Layout from 'components/layout';

type TErrorPageProps = TErrorProps

const ErrorPage = (props: TErrorPageProps) => {
    return (
        <Layout>
            <Error {...props} />
        </Layout>
    )
}

export default ErrorPage
