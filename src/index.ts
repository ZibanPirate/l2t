/**
 * Convert a list into Tree, based on defined parent ID field
 * @param list the list to be converted
 * @param itemIdFunc a function that returns current item ID
 * @param parentIdFunc a function that returns parent ID
 * @param childrenKey the key to use for storing children of a parent node
 * @param mapperFunc a mapper function to map you list items to new objects
 */
export const listToTree = <ListItem, NodeItem>(
  list: ListItem[],
  itemIdFunc: (item: ListItem) => string,
  parentIdFunc: (item: ListItem) => string | undefined,
  childrenKey: string,
  mapperFunc: (item: ListItem) => any,
) => {
  const tree: NodeItem[] = [];
  // clone deeply the list and map its items into nodes
  const nodes: NodeItem[] = list.map((listItem) => {
    return { ...mapperFunc(listItem), [childrenKey]: [] };
  });

  // Group all items based on both their IDs and their parentIDs
  nodes.forEach((node, index) => {
    const parentId = parentIdFunc(list[index]); // get its parent's ID

    // try to find its parent if it does exist
    const parentItem = nodes.find(
      (parentItem, parentIndex) => itemIdFunc(list[parentIndex]) === parentId,
    );
    if (parentItem) {
      (parentItem as any)[childrenKey].push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
};

export default listToTree;
