export function FirstWay() {
  return Array.from(arguments).reverse();
}

export function SecondWay() {
  return [].slice.call(arguments).reverse();
}
