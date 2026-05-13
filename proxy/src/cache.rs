use worker::*;

const LASTFM_TTL: u32 = 10;
const GITLAB_TTL: u64 = 300;

pub async fn cached_short<F, Fut>(
    req: &Request,
    endpoint: &str,
    ttl: u32,
    fetch_fn: F,
) -> Result<Response>
where
    F: FnOnce() -> Fut,
    Fut: Future<Output = Result<Response>>,
{
    let cache = Cache::default();
    let key = format!("https://cache/{}", endpoint);

    if let Some(resp) = cache.get(&key, false).await? {
        return Ok(resp);
    }

    let mut resp = fetch_fn().await?;
    let body = resp.text().await?;

    let headers = Headers::new();
    headers.set("Content-Type", "application/json")?;
    headers.set("Cache-Control", &format!("max-age={}", ttl))?;
    headers.set("X-Cache", "miss")?;

    let mut response = Response::ok(body)?.with_headers(headers);
    cache.put(&key, response.cloned()?).await?;

    Ok(response)
}

pub async fn cached_kv<F, Fut>(
    endpoint: &str,
    kv: &kv::KvStore,
    ttl: u64,
    fetch_fn: F,
) -> Result<Response>
where
    F: FnOnce() -> Fut,
    Fut: Future<Output = Result<Response>>,
{
    let key = format!("cache:{}", endpoint);

    if let Some(body) = kv.get(&key).text().await? {
        let headers = Headers::new();
        headers.set("Content-Type", "application/json")?;
        headers.set("X-Cache", "hit")?;
        return Ok(Response::ok(body)?.with_headers(headers));
    }

    let mut resp = fetch_fn().await?;
    let body = resp.text().await?;

    kv.put(&key, &body)?.expiration_ttl(ttl).execute().await?;

    let headers = Headers::new();
    headers.set("Content-Type", "application/json")?;
    headers.set("X-Cache", "miss")?;
    Ok(Response::ok(body)?.with_headers(headers))
}

pub fn lastfm_ttl() -> u32 {
    LASTFM_TTL
}
pub fn gitlab_ttl() -> u64 {
    GITLAB_TTL
}
