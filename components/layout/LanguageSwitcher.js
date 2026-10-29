import { useRouter } from "next/router";
import blogPostsIT from "../../public/locales/it/blogPosts.json";
import blogPostsEN from "../../public/locales/en/blogPosts.json";

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (nextLocale) => {
    if (router.pathname === "/blog/[slug]") {
      const currentPosts = router.locale === "en" ? blogPostsEN.posts : blogPostsIT.posts;
      const nextPosts = nextLocale === "en" ? blogPostsEN.posts : blogPostsIT.posts;
      const currentPost = currentPosts.find((post) => post.slug === router.query.slug);
      const alternate = currentPost?.translationId
        ? nextPosts.find((post) => post.translationId === currentPost.translationId)
        : null;

      if (alternate) {
        return router.push(
          { pathname: "/blog/[slug]", query: { slug: alternate.slug } },
          undefined,
          { locale: nextLocale },
        );
      }

      return router.push("/blog", undefined, { locale: nextLocale });
    }

    return router.push(
      { pathname: router.pathname, query: router.query },
      undefined,
      { locale: nextLocale },
    );
  };

  return (
    <div>
      <select
        value={router.locale || "it"}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="it">IT</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
