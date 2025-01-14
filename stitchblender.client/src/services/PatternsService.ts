import { Pattern } from "../sbClient/models";
import { StitchBlenderClientFactory } from "./StitchBlenderClientFactory";

export class PatternsService {
  static async GetAllPatterns(): Promise<Pattern[]> {
    const client = StitchBlenderClientFactory.getClient();
    const response = await client.api.patterns.get();
    return response ?? [];
  }

  static async SavePattern(pattern: Pattern): Promise<void> {
    const client = StitchBlenderClientFactory.getClient();
    await client.api.patterns.put(pattern);
  }
}