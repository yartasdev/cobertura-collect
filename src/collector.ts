import FastGlob from "fast-glob";
import { parser } from "./parser";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  Cobertura,
  Coverage,
  Package,
  Source,
} from "./interfaces/cobertura.interface";
import { builder } from "./builder";
import { green, red } from "colorette";

export class Collector {
  static async collect(print: boolean, output: string, target: string) {
    const files = await FastGlob(target);

    const coverages: Cobertura[] = [];

    for (const file of files) {
      coverages.push(Collector.parse(file));
    }

    const coverage = Collector.merge(coverages, files);

    Collector.write(coverage, output);

    if(print) {
      Collector.print(coverage);
    }

  }

  private static parse(file: string): Cobertura {
    try {
      return parser.parse(readFileSync(join(file), "utf-8")) as Cobertura;
    } catch (error) {
      console.error(error);
      console.error(`Unable to read file ${file}`);
      process.exit(1);
    }
  }

  private static merge(coverages: Cobertura[], files: string[]): Cobertura {
    const totalBranchesCovered = Collector.sum(coverages, "branches-covered");
    const totalBranchesValid = Collector.sum(coverages, "branches-valid");
    const totalLinesCovered = Collector.sum(coverages, "lines-covered");
    const totalLinesValid = Collector.sum(coverages, "lines-valid");
    const totalBranchesRate = Collector.divide(
      totalBranchesCovered,
      totalBranchesValid
    );
    const totalLinesRate = Collector.divide(totalLinesCovered, totalLinesValid);
    const totalComplexity = Collector.complexity(coverages);
    const version = Collector.version(coverages);
    const timestamp = Date.now().toString();
    const sources = Collector.sources(files);
    const packages = Collector.packages(coverages, files);
    return {
      coverage: {
        complexity: totalComplexity,
        version: version,
        timestamp: timestamp,
        "branch-rate": totalBranchesRate,
        "branches-valid": totalBranchesValid,
        "branches-covered": totalBranchesCovered,
        "line-rate": totalLinesRate,
        "lines-valid": totalLinesValid,
        "lines-covered": totalLinesCovered,
        sources: sources,
        packages: packages,
      },
    };
  }

  private static write(cobertura: Cobertura, output: string) {
    try {
      const xml = builder.build(cobertura);
      writeFileSync(output, `<?xml version="1.0" ?>\n${xml}`);
    } catch (error) {
      console.error(error);
      console.error('Unable to build cobertura.xml from paths, please check your target path or cobertura.xml files.');
      process.exit();
    }
  }

  private static print({coverage}: Cobertura) {

    const totalLineCoverage = parseFloat(coverage["line-rate"].toString()) * 100;
    const totalBranchCoverage = parseFloat(coverage["branch-rate"].toString()) * 100;
    const totalAverageCoverage = (totalLineCoverage + totalBranchCoverage) / 2;

    console.log(totalLineCoverage < 80 ? red(`Total Line Coverage: ${totalLineCoverage.toFixed(2)}%`) : green(`Total Line Coverage: ${totalLineCoverage.toFixed(2)}%`));
    console.log(totalBranchCoverage < 80 ? red(`Total Branch Coverage: ${totalBranchCoverage.toFixed(2)}%`) : green(`Total Branch Coverage: ${totalBranchCoverage.toFixed(2)}%`));
    console.log(totalAverageCoverage < 80 ? red(`Total Average Coverage: ${totalAverageCoverage.toFixed(2)}%`) : green(`Total Average Coverage: ${totalAverageCoverage.toFixed(2)}%`));

  }

  private static sum(
    coverages: Cobertura[],
    type: keyof Pick<
      Coverage,
      "lines-covered" | "lines-valid" | "branches-covered" | "branches-valid"
    >
  ) {
    return coverages.reduce(
      (count: number, { coverage }: Cobertura) =>
        count + parseInt(coverage[type].toString(), 10),
      0
    );
  }

  private static complexity(coverages: Cobertura[]): string {
    return Math.max(
      ...coverages.map(({ coverage }) => parseInt(coverage.complexity, 10))
    ).toString();
  }

  private static divide(d1: number, d2: number): string {
    return ((d1 / d2) || 0).toString();
  }

  private static version(coverages: Cobertura[]): string {
    return Math.max(
      ...coverages.map(({ coverage }) => parseInt(coverage.version, 10))
    ).toString();
  }

  private static sources(files: string[]): Source[] {
    return files.map((file) => ({ source: [{ $t: file }] }));
  }

  private static packages(coverages: Cobertura[], files: string[]): Package[] {
    const packages: Package[] = [];
    for (const { coverage } of coverages) {
      packages.push(...coverage.packages);
    }
    return packages;
  }
}
