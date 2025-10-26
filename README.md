# ASCII CLI Reference

A lightweight command-line utility for quick ASCII table lookups.

## Features

-   **Quick Lookups** - Find characters by code or symbol in one command
-   **Multiple Formats** - Table, JSON, CSV, and Markdown output
-   **Filtering** - Filter by character type (printable, digits, uppercase, etc.)
-   **Multi-base Support** - Binary (0b), octal (0o), decimal, and hex (0x) inputs
-   **Export** - Save output to files

## Installation

```bash
npm install -g @alexlar/ascii
```

## Usage

Display full ASCII table

```bash
$ ascii
```

Show character range (supports numeric codes and characters)

```bash
$ ascii range 0 65

$ ascii range NUL A

$ ascii range 0 A

$ ascii range NUL 65
```

Lookup characters by symbol

```bash
$ ascii char A B C
```

Lookup by numeric code (supports binary, octal, decimal, hexadecimal)

```bash
$ ascii code 65 0x42 0o103 0b1000100
```

Search by description substring

```bash
$ ascii desc number
```

### Number Prefixes

-   Binary: `0b<number>` (e.g., `0b1100001`)
-   Octal: `0o<number>` (e.g., `0o141`)
-   Decimal: `<number>` (e.g., `97`)
-   Hexadecimal: `0x<number>` (e.g., `0x61`)

### Character Prefix

Use `c:`, `ch:`, or `char:` prefixes to interpret digits as characters in ranges:

```bash
# range from code 0 to character '0' (code 48)
$ ascii range 0 c:0
```

## Options

### Filters

> Root command only

-   `-E, --escape` - show escape characters
-   `-C, --control` - show control characters
-   `-P, --printable` - show printable characters
-   `-D, --digits` - show digits
-   `-U, --uppercase` - show uppercase letters
-   `-L, --lowercase` - show lowercase letters

### Output Formats

-   `-O, --output <file>` - Write to file
-   `-J, --json` - JSON format
-   `-S, --csv` - CSV format
-   `-M, --markdown` - Markdown table

### Display Options

-   `-N, --no-sort` - Disable sorting
-   `-R, --reverse` - Reverse order
-   `-F, --colorful` - Colorful output
-   `-X, --no-color` - No colors
-   `-B, --no-border` - No table borders

## Examples

```bash
# Basic usage
ascii
ascii range 32 126
ascii char A a @
ascii code 65 0x41 0o101
ascii desc uppercase

# Advanced usage
ascii --printable --json
ascii range c:0 c:9 --output digits.txt
ascii --digits --no-border --no-color
```
