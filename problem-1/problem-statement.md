### Introduction

We're going to write two programs, the first computing some statistical information and the second converting that information into
SQL statements.  Please read this document in its entirety before starting to write your code.

### First Program
Generate statistics from two CSV files which are included in this zip file and are named states.csv and population-by-zip-code.csv.

states.csv has four columns:
  Long:  The full name of a state, e.g. "Connecticut"
  Short:  The abbreviation used for that state ("CT")
  Zip Codes:  Some zip codes from that state in a double-quoted (according to RFC 4180) string
  Capital:  The capital of that state.

population-by-zip-code.csv has two columns:
  Zip Code:  A zip code
  Population:  The total population within the zip code

This program should take in total three named (note, not positional) arguments: --states, --population, and --help .
--states and --population are for states.csv and population-by-zip-code.csv, respectively.  The output of the program should be
written to STDOUT.  The result output will contain:
  1. The total population for each state, identifying each state by its name as given in the Long column of states.csv
  2. A single value that is the average population per zip code in the dataset.
  3. A single value that is the average population per state in the dataset.

This output should be in a JSON format of your choice.  Consider following this example:
```
{
  "pop_total_by_state": [
    {"massachusetts": 324},
    {"maine": 324},
    ...
  ],
  "average_pop_per_zip": 324,
  "average_pop_per_state": 324
}
```

### Second Program
This program will take the JSON output that the first program generated and convert only the "pop_total_by_state" section into a
series of SQL database statements.  This program will take no command line options (other than a helpful --help) but will instead
take its input from STDIN and write its output to STDOUT.  The resulting SQL should look something like:
```
CREATE TABLE # table name here ( # attributes here )
INSERT INTO ...
INSERT INTO ...
...
```
This output can be compatible with your choice of Postgres, MySQL, or SQLite.

### Other requirements
- Must target Linux x86_64, macOS x86_64, or WSL 2.
- Must be coded in any of the following languages:  JavaScript, TypeScript, Python, Rust, C or C++
- Programs must not assume that the input files or output files fit in memory!
- Document your command line options with a --help parameter.

### Some considerations
- Usability:  We'll execute your resulting program on CSVs following the same schema but with different numbers and want
to download and run it without reading the code first (although we will read the code).  The CSVs we have will not fit
in system memory.
- Comment your code in a helpful way that balances clarity over verbosity.
- Consider supplying a separate manifest for depedencies (e.g., if you write python, consider supplying a requirements file).  The
user should have minimum friction executing your code.
