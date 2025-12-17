const BASE_URL = "https://agriturismosegarelli.it/wp-json/wp/v2";

export async function getPosts(lang, search = "") {
  // Costruisci i parametri della query
  const queryParams = new URLSearchParams({
    _embed: "true",
    per_page: "50",
  });

  if (search) {
    queryParams.append("search", search);
  }

  const postsRes = await fetch(`${BASE_URL}/posts?${queryParams.toString()}`, {
    cache: "force-cache",
    next: { revalidate: 900 },
  });

  const posts = await postsRes.json();

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
  const tagsRes = await fetch(BASE_URL + `/tags?per_page=50&page=1`, {
    cache: "force-cache",
    revalidate: 900,
  });
  pages = parseInt(tagsRes.headers.get("x-wp-totalpages"));
  const arr = await tagsRes.json();
  tags.push(...arr);

  if (pages > 1) {
    for (let i = 1; i < pages; i++) {
      const newFetch = await fetch(
        BASE_URL + `/tags?per_page=50&page=${i + 1}`,
        {
          cache: "force-cache",
          revalidate: 900,
        }
      );
      const parsedFetch = await newFetch.json();
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
  const mediaRes = await fetch(BASE_URL + "/media", {
    cache: "force-cache",
    revalidate: 900,
  });

  const media = await mediaRes.json();
  return media;
}

// /wp/v2/categories per le categorie
export async function getCategories(lang, onlyFull = true) {
  const categoriesRes = await fetch(BASE_URL + "/categories?per_page=100", {
    cache: "force-cache",
    revalidate: 900,
  });
  const categories = await categoriesRes.json();

  const filteredCategories = categories?.filter(
    (el) =>
      el?.description.includes(lang) && el?.description.includes("thalliondev")
  );

  const fullCategories = onlyFull
    ? filteredCategories?.filter((el) => el?.count > 0)
    : filteredCategories;

  return fullCategories;
}

export async function getSlugs(type) {
  let elements = [];
  elements = await getPosts();
  const myTag = await getTagId("thalliondev"); //prendo id del tag sideffect
  // const myTag = 133; //provvisorio da cambiare
  const elementsIds = elements
    .filter((el) => el?.tags?.includes(myTag)) //filtro solo quelli che contengono il mytag
    .map((element) => {
      return {
        params: {
          slug: element.slug,
        },
      };
    });
  return elementsIds;
}

export async function getUsers() {
  const userRes = await fetch(BASE_URL + "/users", {
    cache: "force-cache",
    revalidate: 900,
  });
  const users = await userRes.json();
  return users;
}

export async function getPostsByLanguageAndBlogOwner(
  blogOwner = "thalliondev"
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
  const commentsRes = await fetch(BASE_URL + `/comments/`, {
    cache: "no-store",
    // cache: "force-cache",
    // revalidate: 900,
  });
  if (!!postId) {
    const comments = await commentsRes.json();
    const filteredComments = comments?.filter(
      (el) => el?.post === parseInt(postId)
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
