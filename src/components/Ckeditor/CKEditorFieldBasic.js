import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "ckeditor5-custom-build/build/ckeditor";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import "./ckeditor.scss";

const CKEditorFieldBasic = ({
  value,
  onChange,
  isError,
  errorText,
  minWidth,
  title,
}) => {
  const defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",

        "fontSize",
        "fontFamily",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "alignment",
        "|",
        "insertTable",
        "link",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "outdent",
        "indent",
        "|",
        "todoList",

        "blockQuote",
        "codeBlock",

        "|",
        "removeFormat",
        "undo",
        "redo",
        "|",
        "code",
        "findAndReplace",
        "highlight",
        "horizontalLine",
        // "htmlEmbed",
        "pageBreak",
        "specialCharacters",
        "restrictedEditingException",
        "subscript",
        "superscript",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "vi",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
        "toggleTableCaption",
      ],
    },
    mention: {
      feeds: [
        {
          marker: "@",
          feed: [
            "@apple",
            "@bears",
            "@brownie",
            "@cake",
            "@cake",
            "@candy",
            "@canes",
            "@chocolate",
            "@cookie",
            "@cotton",
            "@cream",
            "@cupcake",
            "@danish",
            "@donut",
            "@dragée",
            "@fruitcake",
            "@gingerbread",
            "@gummi",
            "@ice",
            "@jelly-o",
            "@liquorice",
            "@macaroon",
            "@marzipan",
            "@oat",
            "@pie",
            "@plum",
            "@pudding",
            "@sesame",
            "@snaps",
            "@soufflé",
            "@sugar",
            "@sweet",
            "@topping",
            "@wafer",
          ],
          minimumCharacters: 1,
        },
      ],
    },
    fontSize: {
      options: [9, 11, 13, "default", 17, 19, 21],
      supportAllValues: true,
    },
    fontColor: {
      // Display 6 columns in the color grid.
      columns: 6,

      // And 12 document colors (2 rows of them).
      documentColors: 12,

      // ...
    },
    htmlEmbed: {
      showPreviews: true,
    },
    fontBackgroundColor: {
      // Remove the "Document colors" section.
      documentColors: 0,

      // ...
    },
    updateSourceElementOnDestroy: true,
    allowedContent: true,
    // extraPlugins: [uploadPlugin],
  };
  const API_URl = "https://noteyard-backend.herokuapp.com";
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${API_URl}/${res.url}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  // } );
  return (
    <FormControl
      error={isError}
      sx={{ minWidth: minWidth ? minWidth : "100%" }}
    >
      <div
        className={`ckeditor-basic ${isError ? "ckeditor-basic--error" : ""}`}
      >
        <span> {title}</span>

        <CKEditor
          onReady={(editor) => {
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          editor={Editor}
          data={value}
          config={defaultConfig}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          //   onBlur={(event, editor) => {
          //     console.log("Blur.", editor);
          //   }}
          //   onFocus={(event, editor) => {
          //     console.log("Focus.", editor);
          //   }}
        />
      </div>
      {isError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
export default CKEditorFieldBasic;
