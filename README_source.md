uppercaseUtility.js would typically be considered a utility, not a filter. It's responsible for applying the uppercase transformation to the JSON representation of the Markdown content, but it doesn't modify the document's structure or content in the way that a filter does. It's more about processing and formatting the content, which aligns better with the concept of a utility.

Filters, on the other hand, are used to modify the structure or content of the document. They interact with the Pandoc AST and apply transformations to achieve specific effects on the document's layout, structure, or text.

To maintain clarity and follow standard practices, you could keep uppercaseUtility.js as a utility, while having separate filter files like remove-hr.js or renumber-lists.js in your filters/ directory to handle more complex document transformations. This separation allows you to keep your codebase organized and understandable.

This is a good alternative to regex.

The Pandoc Abstract Syntax Tree (AST) is a structured representation of a document's content that Pandoc uses internally to process and transform documents. The AST captures the hierarchical structure and elements of a document, such as headings, paragraphs, lists, images, code blocks, and more. It provides a way for Pandoc and related tools to manipulate and convert documents in a consistent and programmatic manner.

The actual structure of the Pandoc AST can be quite complex and extensive, depending on the complexity of the document being processed. The AST is usually represented as a nested data structure or object hierarchy.

Here's a simplified example of what the AST might look like for a basic Markdown document:

```json
{
  "blocks": [
    {
      "t": "Header",
      "c": [
        1,
        [],
        [
          {
            "t": "Str",
            "c": "Hello"
          }
        ]
      ]
    },
    {
      "t": "Para",
      "c": [
        {
          "t": "Str",
          "c": "This is a paragraph."
        }
      ]
    },
    {
      "t": "CodeBlock",
      "c": [[], "javascript", ["console.log('Hello, world!');"]]
    }
  ],
  "meta": {}
}
```

n this simplified example:

blocks is an array of block-level elements in the document, like headers, paragraphs, code blocks, etc.
Each block is represented as an object with a t (type) field and a c (content) field.
The Header type has an array that includes the header level, an empty list for attributes, and an array containing the text elements.
The Para type represents a paragraph, and its c field contains a list of inline text elements.
The CodeBlock type includes an empty list for attributes, the code block's language (in this case, "javascript"), and the code content.
Keep in mind that the actual AST can include more details and attributes for different elements, and this example provides just a simplified illustration.

To work with the Pandoc AST programmatically, you typically use libraries or tools that interact with it, like the Pandoc command-line tool itself, custom filters, or libraries like the pandoc-filter-node JavaScript library you mentioned earlier. These tools provide functions and APIs to traverse, manipulate, and transform the AST as needed for your tasks.

## submodule:

you can add it to your project as a submodule. Submodules allow you to include external repositories within your own repository while keeping them separate. Here's how you could do it:

git submodule add https://github.com/mvhenderson/pandoc-filter-node.git external/pandoc-filter-node

## Install

brew install pandoc

pandoc files/hello-world.md --to=json-ast -o ast.json

## JSON output

The output you're seeing is indeed the Pandoc JSON representation of the document, which is close to the Abstract Syntax Tree (AST) of the Markdown content. This JSON structure represents the hierarchical structure of your Markdown document, including elements like headers, paragraphs, and inline text.

While it's not exactly the same as a typical AST, this Pandoc JSON representation serves a similar purpose by encoding the structure and content of the Markdown document in a machine-readable format. It provides information about blocks, inlines, headers, paragraphs, and more.

If your goal is to perform custom transformations or filters on the Markdown document using Pandoc filters, you can use this JSON representation to process and modify the content as needed. Keep in mind that the Pandoc JSON output is a structured representation of the Markdown content, which you can then manipulate using your filters or utilities.

```txt
source format
↓
(pandoc)
↓
JSON-formatted AST
↓
(JSON filter)
↓
JSON-formatted AST
↓
(pandoc)
↓
target format
```

## Main.js

Yes, that's correct. The main.js script is responsible for a preliminary conversion step, where it takes Markdown files from a specified directory, converts them to JSON format, and writes the JSON content to separate files. This can be considered as a setup or initialization step before running individual tests with filters.

`node main.js`

## Test.js

Once the Markdown files are converted to JSON and stored in separate files, you can then proceed to create individual test scripts (like the test.js script you've been working on) that read these JSON files, apply filters, and compare the output with expected results. This separation allows you to establish a clear testing process: first, converting Markdown to JSON, and then applying filters and validating the output against expected results.

`node tests/uppercase-filter-test/test.js`

TODO:
Add validation of HTML as well.

https://pandoc.org/filters.html

Writing filter guides

## Issue test fails even though the JSON files match

## filter-combinations

In this structure, the "filter-combinations" directory is where you define and test different combinations of filters. The "filters" directory is where you can organize built-in and user-defined filters for individual testing and use within combinations.

For the folder that includes tests and the ability to combine filters, define output, test, and generate output:

## filter-validation

For the folder that is specifically about validating individual filters and their behavior:
