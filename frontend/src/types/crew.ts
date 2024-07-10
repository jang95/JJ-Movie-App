interface DetailToCrew {
  adult: boolean;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ActorDetail extends DetailToCrew {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewDetail extends DetailToCrew {
  job: string;
  department: string;
}
