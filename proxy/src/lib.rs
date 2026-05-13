use worker::*;
mod cache;
use cache::{cached_kv, cached_short, gitlab_ttl, lastfm_ttl};

#[event(fetch)]
async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let path = req.path();
    let kv = env.kv("CACHE")?;

    match path.as_str() {
        "/api/projects" => cached_kv("projects", &kv, gitlab_ttl(), || handle_gitlab()).await,
        "/api/tracks" => cached_short(&req, "tracks", lastfm_ttl(), || handle_lastfm(&env)).await,
        _ => Response::error("Not Found", 404),
    }
}

async fn handle_gitlab() -> Result<Response> {
    let mut upstream = Fetch::Url(Url::parse(
        "https://gitlab.com/api/v4/users/25309988/projects",
    )?)
    .send()
    .await?;
    let status = upstream.status_code();
    let body = upstream.bytes().await?;
    let headers = Headers::new();
    headers.set("Content-Type", "application/json")?;
    Ok(Response::from_bytes(body)?
        .with_status(status)
        .with_headers(headers))
}

async fn handle_lastfm(env: &Env) -> Result<Response> {
    let token = env.secret("LFM_ACCESS_TOKEN")?.to_string();
    let username = env.var("LFM_USERNAME")?.to_string();
    let url = format!(
        "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user={}&api_key={}&limit=15&format=json",
        username, token
    );
    let mut upstream = Fetch::Url(Url::parse(&url)?).send().await?;
    let status = upstream.status_code();
    let body = upstream.bytes().await?;
    let headers = Headers::new();
    headers.set("Content-Type", "application/json")?;
    Ok(Response::from_bytes(body)?
        .with_status(status)
        .with_headers(headers))
}
