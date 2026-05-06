const BASE_URL = "https://agriturismosegarelli.it/wp-json/wp/v2";

async function fetchJson(url, options = {}, fallbackValue = null) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "User-Agent": "SegarelliSite/1.0 (+https://agriturismosegarelli.it)",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const bodyPreview = (await res.text()).slice(0, 120);
      console.error(
        `WordPress request failed: ${res.status} ${url} | body: ${bodyPreview}`,
      );
      return fallbackValue;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      const bodyPreview = (await res.text()).slice(0, 120);
      console.error(
        `WordPress response is not JSON: ${url} | content-type: ${contentType} | body: ${bodyPreview}`,
      );
      return fallbackValue;
    }

    return await res.json();
  } catch (error) {
    console.error(`WordPress request error: ${url}`, error);
    return fallbackValue;
  }
}

async function fetchArray(url, options = {}) {
  try {
    const data = await fetchJson(url, options, []);

    if (!Array.isArray(data)) {
      console.error(`WordPress response is not an array: ${url}`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`WordPress request error: ${url}`, error);
    return [];
  }
}

export async function getPosts(lang, search = "") {
  // Costruisci i parametri della query
  const queryParams = new URLSearchParams({
    _embed: "true",
    per_page: "50",
    page: "1",
  });

  if (search) {
    queryParams.append("search", search);
  }

  let posts = [];
  let totalPages = 1;

  try {
    const firstPageRes = await fetch(`${BASE_URL}/posts?${queryParams.toString()}`, {
      cache: "force-cache",
      next: { revalidate: 900 },
      headers: {
        Accept: "application/json",
        "User-Agent": "SegarelliSite/1.0 (+https://agriturismosegarelli.it)",
      },
    });

    const contentType = firstPageRes.headers.get("content-type") || "";
    if (!firstPageRes.ok || !contentType.toLowerCase().includes("application/json")) {
      const bodyPreview = (await firstPageRes.text()).slice(0, 120);
      console.error(
        `WordPress posts request failed: ${firstPageRes.status} ${BASE_URL}/posts | body: ${bodyPreview}`,
      );
      return [];
    }

    totalPages = parseInt(firstPageRes.headers.get("x-wp-totalpages")) || 1;
    const firstPagePosts = await firstPageRes.json();
    posts = Array.isArray(firstPagePosts) ? firstPagePosts : [];
  } catch (error) {
    console.error("WordPress posts first page request error", error);
    return [];
  }

  // Recupera tutte le altre pagine oltre la prima
  if (totalPages > 1) {
    for (let page = 2; page <= totalPages; page++) {
      const nextParams = new URLSearchParams(queryParams);
      nextParams.set("page", String(page));
      const pagePosts = await fetchArray(`${BASE_URL}/posts?${nextParams.toString()}`, {
        cache: "force-cache",
        next: { revalidate: 900 },
      });
      posts.push(...pagePosts);
    }
  }

  // Filtra per tag lingua, se presente
  const lngPost = posts.filter((p) => {
    if (lang) {
      return p?.tags?.includes(lang);
    }
    return true; // nessun filtro se lang non è passato
  });

  // Mappa i campi rilevanti
  const mainKeys = lngPost.map((el) => ({
    categories: el?.categories,
    content: { rendered: el?.content?.rendered },
    date: el?.date,
    excerpt: { rendered: el?.excerpt?.rendered },
    featured_media: el?.featured_media,
    _embedded: el["_embedded"],
    slug: el?.slug,
    title: { rendered: el?.title?.rendered },
    tags: el?.tags,
    id: el?.id,
  }));

  return mainKeys;
}

// array di tutti i tags presenti
export async function getTags() {
  let pages = 1;
  let tags = [];
  try {
    const tagsRes = await fetch(BASE_URL + `/tags?per_page=50&page=1`, {
      cache: "force-cache",
      revalidate: 900,
      headers: {
        Accept: "application/json",
        "User-Agent": "SegarelliSite/1.0 (+https://agriturismosegarelli.it)",
      },
    });

    const contentType = tagsRes.headers.get("content-type") || "";
    if (!tagsRes.ok || !contentType.toLowerCase().includes("application/json")) {
      const bodyPreview = (await tagsRes.text()).slice(0, 120);
      console.error(
        `WordPress tags request failed: ${tagsRes.status} ${BASE_URL}/tags | body: ${bodyPreview}`,
      );
      return [];
    }

    pages = parseInt(tagsRes.headers.get("x-wp-totalpages")) || 1;
    const arr = await tagsRes.json();
    tags.push(...(Array.isArray(arr) ? arr : []));
  } catch (error) {
    console.error("WordPress tags request error", error);
    return [];
  }

  if (pages > 1) {
    for (let i = 1; i < pages; i++) {
      const parsedFetch = await fetchArray(
        BASE_URL + `/tags?per_page=50&page=${i + 1}`,
        {
          cache: "force-cache",
          revalidate: 900,
        },
      );
      tags.push(...parsedFetch);
    }
  }
  return tags;
}

// ricerca codice di un tag
export async function getTagId(tagName) {
  const tags = await getTags();
  const idLocale = (tags?.filter((el) => el?.name === tagName))[0]?.id; //prendo l'id che corrisponde ad it nel database di wp
  return idLocale;
}

// Restituisce un array con tutti i tags relativi ad un post
export async function getTagNameList(array) {
  const tags = await getTags();
  const objList = tags?.filter((el) => array?.includes(el?.id));
  const nameList = objList?.map((el) => el?.name);
  return nameList;
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}

export async function getMedia() {
  const media = await fetchArray(BASE_URL + "/media", {
    cache: "force-cache",
    revalidate: 900,
  });
  return media;
}

// /wp/v2/categories per le categorie
export async function getCategories(lang, onlyFull = true) {
  const categories = await fetchArray(BASE_URL + "/categories?per_page=100", {
    cache: "force-cache",
    revalidate: 900,
  });

  const filteredCategories = categories?.filter(
    (el) =>
      el?.description.includes(lang) && el?.description.includes("thalliondev"),
  );

  const fullCategories = onlyFull
    ? filteredCategories?.filter((el) => el?.count > 0)
    : filteredCategories;

  return fullCategories;
}

export async function getSlugs(type) {
  let elements = [];
  elements = await getPosts();
  // const myTag = 133; //provvisorio da cambiare
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}

export async function getUsers() {
  const users = await fetchArray(BASE_URL + "/users", {
    cache: "force-cache",
    revalidate: 900,
  });
  return users;
}

export async function getPostsByLanguageAndBlogOwner(
  blogOwner = "thalliondev",
) {
  const resObj = {};
  resObj.ownerId = await getTagId(blogOwner);
  resObj.it = await getTagId("it");
  resObj.en = await getTagId("en");
  const ownerPosts = await getPosts(resObj.ownerId); // tutti i posts in tutte lingue del blogOwser
  return {
    ...resObj,
    it: ownerPosts.filter((el) => el?.tags?.includes(resObj.it)),
    en: ownerPosts.filter((el) => el?.tags?.includes(resObj.en)),
  };
}

export async function getComments(postId) {
  const comments = await fetchArray(BASE_URL + `/comments/`, {
    cache: "no-store",
    // cache: "force-cache",
    // revalidate: 900,
  });
  if (!!postId) {
    const filteredComments = comments?.filter(
      (el) => el?.post === parseInt(postId),
    );
    return filteredComments;
  } else {
    return comments;
  }
}

export function listToTree(list) {
  const node = {};
  // creo i padri
  for (let i = 0; i < list.length; i++) {
    if (list[i].parent === 0) {
      node[list[i].id] = [];
    }
  }
  //aggiungo i figli ai padri
  for (let i = 0; i < list.length; i++) {
    if (list[i].parent !== 0) {
      const obj = list.filter((el) => el.id === list[i].id)[0]; // da sistemare con sistema più efficiente
      node[list[i].parent]?.push(obj);
    }
  }
  if (Object.keys(node).length !== 0) {
    return node;
  } else {
    return null;
  }
}

export async function getPagesByIds(ids = []) {
  if (!ids.length) return [];

  const pages = await fetchArray(`${BASE_URL}/pages?include=${ids.join(",")}&_embed`, {
    cache: "force-cache",
    next: { revalidate: 900 },
  });

  // Mappa ID -> immagine di fallback
  const fallbackImages = {
    2026: "/assets/borghi.jpg",
    1997: "/assets/natura.jpg",
  };

  return ids.map((id) => {
    const p = pages.find((el) => el.id === id);

    if (!p) return { id, title: "", image: null, alt: "" };

    const media = p._embedded?.["wp:featuredmedia"]?.[0];

    return {
      id,
      title: p.title?.rendered || "",
      image:
        media?.media_details?.sizes?.large?.source_url ||
        media?.source_url ||
        fallbackImages[id] || // fallback specifico per quell'ID
        null,
      alt: media?.alt_text || "",
      content: p.content.rendered,
      excerpt: p.excerpt.rendered,
      slug: p.slug,
    };
  });
}
