const doFilter = (item, filter) => {

  return filter.value === item.properties[ filter.property ];
}

const createFilter = (...filters) => {
  if (typeof filters[0] === 'string') {
    filters = [
      {
        property: filters[0],
        value: filters[1]
      }
    ];
  }

  return item => filters.every(filter => doFilter(item, filter));
};

export { createFilter };