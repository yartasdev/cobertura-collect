export interface Cobertura {
  coverage: Coverage;
}

export interface Coverage {
  'line-rate': string | number;
  'branch-rate': string | number;
  'lines-covered': string | number;
  'lines-valid': string | number;
  'branches-covered': string | number;
  'branches-valid': string | number;
  complexity: string;
  version: string;
  timestamp: string;
  sources?: Source[];
  packages: Package[];
}

export interface Source {
  source: Array<{
    $t: string;
  }>;
}

export interface Package {
  package: Array<{
    name: string;
    'line-rate': string;
    'branch-rate': string;
    complexity?: string;
    classes?: Class[];
  }>;
}

export interface Class {
  class: Array<{
    name: string;
    filename: string;
    'line-rate': string;
    'branch-rate': string;
    complexity?: string;
    methods: Method[];
    lines: Line[];
  }>;
}

export interface Text {
  $t: string;
}

interface Method {
  method: Array<{
    name: string;
    signature: string;
    'line-rate': string;
    'branch-rate': string;
    complexity?: string;
  }>;
}

interface Line {
  line: Array<{
    hits: string;
    number: string;
    branch?: boolean;
    'condition-coverage'?: string;
    conditions?: Condition[];
  }>;
}

interface Condition {
  condition: Array<{
    number: string;
    type: string;
    coverage: string;
  }>;
}
