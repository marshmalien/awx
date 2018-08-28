const unique = arr => {
    let prev;
    return arr.sort().filter(e => e !== prev && (prev = e));
}

let listOfClasses = [].concat(...[...document.querySelectorAll('[class]')].map(el => [...el.classList]));

console.log(unique(listOfClasses));
