#!/usr/bin/env node

import { Command } from "commander";
import { Collector } from "./collector";

const program = new Command("cobertura-collect")
  .description("Collect cobertura coverages from specific directories and create a summary file")
  .version("1.0.0")
  .option(
    "-p --print",
    "Prints a summary of the code coverage to the standard output",
    true
  )
  .option(
    "-o --output <value>",
    "Specifiy a directory for the output file. E.g. /cobertura.xml",
    `${process.cwd()}/cobertura.xml`
  )
  .option(
    "-t --target <value>",
    "Specifiy a directory for the target files. E.g. /coverage/**/cobertura-coverage.xml",
    `${process.cwd()}/coverage/**/cobertura-coverage.xml`
  );

program.parse();

Collector.collect(program.opts().print, program.opts().output, program.opts().target);