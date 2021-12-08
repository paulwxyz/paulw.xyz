import Layout from "../components/layout";

function NotFoundPage() {

    return (
        <Layout name="... ??? / 404: Not Found">
            <div className="block">
                <h1>Error 404: Not Found</h1>
                <p>
                    <strong>Uh oh! The page you are looking for does not exist...</strong><br />
                    <strong><a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes">[Wikipedia] Learn more about HTTP status codes.</a></strong>
                </p>
            </div>
        </Layout>
    );
}

export default NotFoundPage;