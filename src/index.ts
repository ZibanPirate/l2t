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
  itemIdFunc: ((item: ListItem) => string) | string,
  parentIdFunc: ((item: ListItem) => string | undefined) | string,
  childrenKey: keyof NodeItem,
  mapperFunc?: (item: ListItem) => any,
) => {
  const tree: NodeItem[] = [];
  // clone deeply the list and map its items into nodes
  const nodes: NodeItem[] = list.map((listItem) => {
    return mapperFunc
      ? { ...mapperFunc(listItem), [childrenKey]: [] }
      : { ...listItem, [childrenKey]: [] };
  });

  // Group all items based on both their IDs and their parentIDs
  nodes.forEach((node, index) => {
    const parentId = getId(parentIdFunc, list[index]); // get its parent's ID

    // try to find its parent if it does exist
    const parentItem = nodes.find(
      (parentItem, parentIndex) =>
        getId(itemIdFunc, list[parentIndex]) === parentId,
    );
    if (parentItem) {
      (parentItem as any)[childrenKey].push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
};

/**
 * Gets id based either on a string name or a getter function
 * @param idGetter name of the field or function to get it from the item
 * @param item to get the field value from
 */
function getId(idGetter: string | Function, item: any) {
  if (typeof idGetter === "string") {
    return item[idGetter] || null;
  }
  return idGetter(item);
}

export default listToTree;
