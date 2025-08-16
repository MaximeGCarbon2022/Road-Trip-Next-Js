import { fetchData } from "@/lib/fetch/fetchData";
import type { RoadTripWithOrder } from "../interfaces/interface";
import { addRoadTripCountry, deleteRoadTripCountry, getRoadTrip } from "./service";

jest.mock("@/lib/fetch/fetchData", () => ({
  fetchData: jest.fn(),
}));

describe("roadtrip service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the roadtrip", async () => {
    const mockResponse: RoadTripWithOrder = {
      countries: [{ cca3: "ESP", order: 1 }],
    };
    (fetchData as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getRoadTrip();

    expect(fetchData).toHaveBeenCalledWith("/roadtrip");
    expect(result).toEqual(mockResponse);
  });

  it("should add a country to the roadtrip", async () => {
    (fetchData as jest.Mock).mockResolvedValue(undefined);

    const code = "FRA";
    await addRoadTripCountry(code);

    expect(fetchData).toHaveBeenCalledWith("/roadtrip/countries", {
      method: "POST",
      body: JSON.stringify({ cca3: code }),
    });
  });

  it("should delete a country from the roadtrip", async () => {
    (fetchData as jest.Mock).mockResolvedValue(undefined);

    const code = "ITA";
    await deleteRoadTripCountry(code);

    expect(fetchData).toHaveBeenCalledWith(`/roadtrip/countries/${code}`, {
      method: "DELETE",
    });
  });
});
