import { fetchData } from "@/lib/fetch/fetchData";
import { RoadTripWithOrder } from "../interfaces/interface";

export const getRoadTrip = async () => fetchData<RoadTripWithOrder>("/roadtrip");

export const addRoadTripCountry = (code: string) =>
  fetchData<void>("/roadtrip/countries", {
    method: "POST",
    body: JSON.stringify({ cca3: code }),
  });

export const deleteRoadTripCountry = async (code: string) =>
  fetchData<void>(`/roadtrip/countries/${code}`, {
    method: "DELETE",
  });
