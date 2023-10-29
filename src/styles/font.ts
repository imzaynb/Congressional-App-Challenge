import { Inter, Fira_Sans, Lato } from 'next/font/google'

const inter400 = Inter({weight: '400', subsets: ['cyrillic']});
const lato300 = Lato({weight:'300', subsets: ['latin']});
const lato400 = Lato({weight:'400', subsets: ['latin']});
const firaSans100 = Fira_Sans({weight: '100', subsets: ['cyrillic']});
const firaSans400 = Fira_Sans({ weight: '400', subsets: ['cyrillic']});
const firaSans600 = Fira_Sans({ weight:'600', subsets: ['cyrillic']});

export { inter400, lato300, lato400, firaSans100, firaSans400, firaSans600 };