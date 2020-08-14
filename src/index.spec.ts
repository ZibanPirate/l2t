import { listToTree } from "./index";

export interface Article {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
}

export interface SidebarTreeItem {
  id: string;
  content: string;
  link?: string;
  children?: SidebarTreeItem[];
}

test("Articles List to SideBar Tree", () => {
  const articlesList: Article[] = [
    { slug: "First_Article", title: "First Article" },
    { slug: "First_Article/First_Sub-Article", title: "First Sub-Article" },
    { slug: "First_Article/Second_Sub-Article", title: "Second Sub-Article" },
    { slug: "Second_Article", title: "Second Article" },
    { slug: "Third_Article", title: "Third Article" },
  ];
  const { tree, ids } = listToTree<Article, SidebarTreeItem>(
    articlesList,
    (item) => item.slug,
    (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
    "children",
    (item) => {
      return {
        content: item.title,
        id: item.slug,
        link: "/Articles/" + item.slug,
      };
    },
  );

  expect(tree).toMatchObject([
    {
      content: "First Article",
      id: "First_Article",
      link: "/Articles/First_Article",
      children: [
        {
          content: "First Sub-Article",
          id: "First_Article/First_Sub-Article",
          link: "/Articles/First_Article/First_Sub-Article",
          children: [],
        },
        {
          content: "Second Sub-Article",
          id: "First_Article/Second_Sub-Article",
          link: "/Articles/First_Article/Second_Sub-Article",
          children: [],
        },
      ],
    },
    {
      content: "Second Article",
      id: "Second_Article",
      link: "/Articles/Second_Article",
      children: [],
    },
    {
      content: "Third Article",
      id: "Third_Article",
      link: "/Articles/Third_Article",
      children: [],
    },
  ]);

  expect(ids).toMatchObject([
    "First_Article",
    "First_Article/First_Sub-Article",
    "First_Article/Second_Sub-Article",
    "Second_Article",
    "Third_Article",
  ]);
});
