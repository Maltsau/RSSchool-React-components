interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

interface IDataBase {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

type ItemsPerPageType = 5 | 10;

export type { IDataBase, ICharacter, ItemsPerPageType };
