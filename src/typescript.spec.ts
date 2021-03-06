import { listToTree } from "./index";
import l2t from "./index";

interface SimpleItem {
  id: string;
  label: string;
  parentId?: string;
}
interface SimpleNode {
  index: string;
  label: string;
  children: SimpleNode[];
}
const simpleList: SimpleItem[] = [
  { id: "1", label: "1" },
  { id: "2", label: "2", parentId: "1" },
  { id: "3", label: "3", parentId: "1" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6", parentId: "5" },
];
const simpleTree: SimpleNode[] = [
  {
    label: "item-number-1",
    index: "1",
    children: [
      { label: "item-number-2", index: "2", children: [] },
      { label: "item-number-3", index: "3", children: [] },
    ],
  },
  { label: "item-number-4", index: "4", children: [] },
  {
    label: "item-number-5",
    index: "5",
    children: [{ label: "item-number-6", index: "6", children: [] }],
  },
];

const simpleTreeNotMapped = [
  {
    id: "1",
    label: "1",
    children: [
      { id: "2", label: "2", parentId: "1", children: [] },
      { id: "3", label: "3", parentId: "1", children: [] },
    ],
  },
  {
    id: "4",
    label: "4",
    children: [],
  },
  {
    id: "5",
    label: "5",
    children: [{ id: "6", label: "6", parentId: "5", children: [] }],
  },
];

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
const articlesList: Article[] = [
  { slug: "First_Article", title: "First Article" },
  { slug: "First_Article/First_Sub-Article", title: "First Sub-Article" },
  { slug: "First_Article/Second_Sub-Article", title: "Second Sub-Article" },
  { slug: "Second_Article", title: "Second Article" },
  { slug: "Third_Article", title: "Third Article" },
];
const articlesTree: SidebarTreeItem[] = [
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
];
const treeIds = [
  "First_Article",
  "First_Article/First_Sub-Article",
  "First_Article/Second_Sub-Article",
  "Second_Article",
  "Third_Article",
];

describe("Test Typescript support", () => {
  test("Simple List to Tree case", () => {
    const tree = listToTree<SimpleItem, SimpleNode>(
      simpleList,
      (item) => item.id,
      (item) => item.parentId,
      "children",
      (item) => {
        return {
          label: `item-number-${item.label}`,
          index: item.id,
        };
      },
    );

    expect(tree).toMatchObject(simpleTree);
  });

  test("Simple List to Tree case using string parameters", () => {
    const tree = listToTree<SimpleItem, SimpleNode>(
      simpleList,
      "id",
      "parentId",
      "children",
      (item) => {
        return {
          label: `item-number-${item.label}`,
          index: item.id,
        };
      },
    );

    expect(tree).toMatchObject(simpleTree);
  });

  test("Articles List to SideBar Tree", () => {
    const tree = listToTree<Article, SidebarTreeItem>(
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

    expect(tree).toMatchObject(articlesTree);
  });

  test("Articles List to SideBar Tree using string parameters", () => {
    const tree = listToTree<Article, SidebarTreeItem>(
      articlesList,
      "slug",
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

    expect(tree).toMatchObject(articlesTree);
  });

  test("Articles List to SideBar Tree with IDs", () => {
    const ids: string[] = [];
    const tree = listToTree<Article, SidebarTreeItem>(
      articlesList,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    expect(tree).toMatchObject(articlesTree);

    expect(ids).toMatchObject(treeIds);
  });

  test("Articles List to SideBar Tree with IDs using string parameters", () => {
    const ids: string[] = [];
    const tree = listToTree<Article, SidebarTreeItem>(
      articlesList,
      "slug",
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    expect(tree).toMatchObject(articlesTree);

    expect(ids).toMatchObject(treeIds);
  });

  test("Articles List to SideBar Tree", () => {
    const tree = l2t<Article, SidebarTreeItem>(
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

    expect(tree).toMatchObject(articlesTree);
  });

  test("Articles List to SideBar Tree using string parameters", () => {
    const tree = l2t<Article, SidebarTreeItem>(
      articlesList,
      "slug",
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

    expect(tree).toMatchObject(articlesTree);
  });

  test("Articles List to SideBar Tree with IDs", () => {
    const ids: string[] = [];
    const tree = l2t<Article, SidebarTreeItem>(
      articlesList,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    expect(tree).toMatchObject(articlesTree);

    expect(ids).toMatchObject(treeIds);
  });

  test("Articles List to SideBar Tree with IDs using string parameters", () => {
    const ids: string[] = [];
    const tree = l2t<Article, SidebarTreeItem>(
      articlesList,
      "slug",
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    expect(tree).toMatchObject(articlesTree);

    expect(ids).toMatchObject(treeIds);
  });

  test("Simple Tree without Mapper function", () => {
    const tree = listToTree(
      simpleList,
      (item) => item.id,
      (item) => item.parentId,
      "children",
    );
    expect(tree).toMatchObject(simpleTreeNotMapped);
  });

  test("Simple Tree without Mapper function using string parameters", () => {
    const tree = listToTree(simpleList, "id", "parentId", "children");
    expect(tree).toMatchObject(simpleTreeNotMapped);
  });
});
