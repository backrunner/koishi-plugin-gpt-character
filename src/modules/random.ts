import axios from 'axios';

let cache: number[] = [];

const cacheLimit = 1000;

const fetchRandomNumbers = async (num: number): Promise<void> => {
  try {
    const response = await axios.get(
      `https://www.random.org/integers/?num=${num}&min=1&max=100&col=1&base=10&format=plain&rnd=new`,
    );
    let numbers: number[] = response.data
      .split('\n')
      .filter((n: string) => n)
      .map((n: string) => parseInt(n, 10));
    cache.push(...numbers);
  } catch (error) {
    console.error(error);
  }
};

export const getRandomNumber = (): number => {
  if (cache.length <= cacheLimit * 0.1) {
    fetchRandomNumbers(cacheLimit);
  }

  return cache.length > 0 ? (cache.shift() as number) : Math.floor(Math.random() * 100) + 1;
};

fetchRandomNumbers(cacheLimit);
