export const apiService = {
    get,
    post,
    del,
    put
};

async function serverRequest(request)
{
    let response = await fetch(request);
    if( response.ok )
        return await response.json();

    throw(`API-Request Failed : ${response.status} ${response.statusText}`);
}

async function get(path, querystring)
{
    return serverRequest(
        new Request(`http://localhost:3000/api/v1/${path}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    );
}

async function post(path, data)
{
    return serverRequest(
        new Request(`http://localhost:3000/api/v1/${path}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    );
}

async function del(path)
{

}

async function put(path, data)
{

}