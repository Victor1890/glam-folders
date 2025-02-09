# Glam-Folders

## Description

Managing files in a cluttered directory can be challenging. **Glam-Folders** simplifies the process by organizing files into categorized subfolders. With this tool, you can easily group files by extensions, names, or creation dates, ensuring your directories remain clean and structured.

## Summary

- **Organize by extensions**: Group files based on their extensions.
- **Organize by names**: Group files by their starting names.
- **Organize by dates**: Group files by their creation dates.
- **Conflict resolution**: Handles file naming conflicts automatically.
- **Cross-platform**: Compatible with Windows, macOS, and Linux.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Victor1890/glam-folders
    cd glam-folders
    ```

2. Install dependencies using `pnpm`:
    ```sh
    pnpm install
    ```

    If you don't have `pnpm` installed, you can install it using `npm`:
    ```sh
    npm install -g pnpm
    ```

## Usage

You can use the tool with the following commands:

### Organize by File Extensions

To organize files by their extensions, run:
```sh
pnpm run glam /path/to/directory --ext
```

### Group Files by Starting Names

To group files by their starting names, run:
```sh
pnpm run glam /path/to/directory --name
```

### Organize by Creation Dates

To organize files by their creation dates, run:
```sh
pnpm run glam /path/to/directory --date
```

### Ignore Dotfiles

To ignore dotfiles when organizing, add the `--ignore-dotfiles` option:
```sh
pnpm run glam /path/to/directory --ignore-dotfiles
```

## Configuration

You can configure the application by setting environment variables as needed.

## License

This project is licensed under the ISC License.