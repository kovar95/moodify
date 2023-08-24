import { Track } from "@/types/Track";
import axios from "axios";
import useSwr from "swr";

const useTracks = (query: string) => {
  const fetcher = async (url: string) => await axios.get(url);

  const { data, error, isLoading } = useSwr(`api/search?q=${query}`, fetcher);

  return { data: data?.data?.tracks as Track[], error, isLoading };
};

export default useTracks;
