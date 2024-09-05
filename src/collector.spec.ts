import { readFileSync, writeFileSync } from "fs";
import { Collector } from "./collector";
import FastGlob from "fast-glob";
import { cobertura } from "../mock/cobertura";

jest.mock("fs");
jest.mock("fast-glob");

describe(Collector.name, () => {

  it("should create cobertura-coverage.xml from targets", async () => {
    (writeFileSync as jest.Mock).mockImplementation(() => {});
    (readFileSync as jest.Mock).mockImplementation(() => cobertura);
    (FastGlob as unknown as jest.Mock).mockResolvedValue([`${process.cwd()}/mock/cobertura-coverage.xml`]);
    const print = true;
    const output = `${process.cwd()}/output/cobertura-coverage.xml`;
    const target = `${process.cwd()}/mock/**/cobertura-coverage.xml`;
    await Collector.collect(print, output, target);
    expect(writeFileSync).toHaveBeenCalled();
  });

});
